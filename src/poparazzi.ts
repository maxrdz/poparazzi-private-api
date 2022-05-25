/*
    poparazzi-private-api  Copyright (C) 2022  Max Rodriguez
    This program comes with ABSOLUTELY NO WARRANTY;
    This is free software, and you are welcome to
    redistribute it under certain conditions;
*/
import * as Responses from './api-responses';
import fetch, {Headers} from "node-fetch";
import readline from "node:readline";

export enum HTTP { GET = "GET", POST = "POST", PATCH = "PATCH"}
export enum LOGIN_STATUS { OK = 0, INVALID = 1, SESSION_ERROR = 2, EXISTS = 3 }
export enum CREDENTIAL_TYPE { PHONE = 0, VERIFY_CODE = 1 }
export enum CREDENTIALS_STATUS { MISSING_SESSION = 0, INVALID = 1 }

export interface CLIENT_EVENTS {
    login_success?: Function,
    login_failure?: Function
}

export class Client {
    private phone_number: string;
    private readonly poparazzi_ver: string;
    private readonly cfnetwork_ver: string;
    private readonly darwin_ver: string;
    private readonly request_headers: Headers;
    private readonly event_callbacks: CLIENT_EVENTS;
    private session: Responses.Session | null;

    constructor(args: { phone_number?: string, language?: string, interactive_login?: boolean }) {

        if (args.phone_number) this.phone_number = args.phone_number;
        else this.phone_number = "";
        this.poparazzi_ver = "3.1.23#839";
        this.cfnetwork_ver = "1331.0.7";
        this.darwin_ver = "21.4.0";
        this.session = null;
        this.event_callbacks = {
            login_success: () => {},
            login_failure: () => {}
        };

        this.request_headers = new Headers({
            'Host': 'poparazzi.com',
            'Accept': 'application/vnd.api+json, application/json',
            'Content-Type': 'application/vnd.api+json',
            'User-Agent': `Poparazzi/${this.poparazzi_ver} CFNetwork/${this.cfnetwork_ver} Darwin/${this.darwin_ver}`,
            'Version': this.poparazzi_ver,
            'Accept-Language': "en-US,en;q=0.9",
            'Accept-Encoding': 'gzip, deflate'
        });
        if (args.language) this.request_headers.set('Accept-Language', args.language);

        if (args.interactive_login === true) {
            ;(async () => {
                const login_status = await this.interactive_login_prompt();

                switch (login_status) {
                    case LOGIN_STATUS.OK:
                        console.log("Poparazzi account login success!");
                        this.callback_event("login_success");
                        break;
                    case LOGIN_STATUS.INVALID:
                        console.log("The credentials given were found invalid; try again.");
                        this.callback_event("login_failure");
                        break;
                    case LOGIN_STATUS.SESSION_ERROR:
                        console.log("There was an issue while creating a new session.");
                        this.callback_event("login_failure");
                        break;
                    case LOGIN_STATUS.EXISTS:
                        console.log("An existing session already exists!");
                        this.callback_event("login_failure");
                        break;
                }
            })();
        }
    }

    public static api_call(args: {
        endpoint: string, headers: Headers, path?: string, method?: HTTP, payload?: string
    }) {
        let request_url = `https://poparazzi.com/api/${args.endpoint}`;

        // If extended path given, add to url
        if (args.path) request_url.concat(`/${args.path}`);

        // POST / PATCH methods
        if (args.method && args.method !== HTTP.GET) {
            return fetch(request_url, { method: args.method, body: args.payload, headers: args.headers });
        }
        return fetch(request_url, { headers: args.headers });
    }

    public async create_session(): Promise<Responses.Session> {
        return new Promise(async (resolve, reject) => {

            const payload = {"data": {}};
            const empty_session = new Responses.Session({ new_session: true });
            payload.data = Object.assign({}, empty_session); // cast instance to object

            const response = await Client.api_call({
                endpoint: "sessions", headers: this.request_headers,
                method: HTTP.POST, payload: JSON.stringify(payload)
            });
            const data = await response.json();
            if (typeof data !== typeof {}) reject(); // Data isn't an object, exit.

            const new_session = new Responses.Session({});
            Object.assign(new_session, data.data); // cast response data to new Session object

            // Add session ID to `Authorization` request header
            this.request_headers.set('Authorization', `Bearer ${new_session.id}`);
            this.session = new_session;
            resolve(new_session);
        });
    }

    private async submit_credential(data: string, type: CREDENTIAL_TYPE): Promise<Responses.Session> {
        return new Promise(async (resolve, reject) => {
            // Check if the client doesn't have authorization
            if (!this.request_headers.has('Authorization')) reject(CREDENTIALS_STATUS.MISSING_SESSION);

            // TODO: Learn how to replicate 'Device-Check' request header to send credentials.
            // TODO: and also learn to replicate apple_device_tokens for that

            const session_copy = new Responses.Session({});
            Object.assign(session_copy, this.session); // cast session to copy for the payload

            switch (type) {
                case CREDENTIAL_TYPE.PHONE:
                    session_copy.set_phone_number(data);
                    break;
                case CREDENTIAL_TYPE.VERIFY_CODE:
                    session_copy.set_verify_code(data);
                    break;
            }
            const payload = {"data": {}};
            payload.data = Object.assign({}, session_copy); // cast session data to payload

            const response = await Client.api_call({
                endpoint: "sessions", headers: this.request_headers,
                method: HTTP.POST, payload: JSON.stringify(payload)
            });
            const res_data = await response.json();
            if (typeof res_data !== typeof {}) reject(); // data not valid (just in case)

            const new_session = new Responses.Session({});
            Object.assign(new_session, res_data.data); // cast response data to new Session object

            resolve(new_session); // return response
        });
    }

    public submit_phone_number(): Promise<Responses.Session> {
        return this.submit_credential(this.phone_number, CREDENTIAL_TYPE.PHONE);
    }

    public submit_verification_code(code: string): Promise<Responses.Session> {
        return this.submit_credential(code, CREDENTIAL_TYPE.VERIFY_CODE);
    }

    public async interactive_login_prompt(): Promise<LOGIN_STATUS> {
        return new Promise(async (resolve, reject) => {
            if (this.session !== null) reject(LOGIN_STATUS.EXISTS);

            // Create a new Poparazzi session
            const session = await this.create_session();
            if (session === undefined) return reject(LOGIN_STATUS.SESSION_ERROR); // session error
            console.log("Log in to your Poparazzi account.");

            // Callback function to prompt input for verification code (after phone number)
            const verify_prompt = () => {
                console.log("\nPlease enter the verification code you received via SMS.");
                const prompt = readline.createInterface({input: process.stdin, output: process.stdout});

                prompt.question("(Enter a 6-digit code): ", (input: string) => {
                    prompt.close();
                    // TODO: Check if the credentials were validated and handle error.
                    ;(async () => {
                        this.session = await this.submit_verification_code(input);
                        resolve(LOGIN_STATUS.OK);
                    })();
                });
            }

            if (this.phone_number === "") {
                console.log("\nPlease enter your phone number.");
                const prompt = readline.createInterface({input: process.stdin, output: process.stdout});

                prompt.question("(Example: +12124797990): ", (input: string) => {
                    prompt.close();
                    this.phone_number = input;
                    ;(async () => {
                        const session_response = await this.submit_phone_number();
                        verify_prompt();
                    })();
                });
            } else verify_prompt();
        });
    }

    public set_event(callbacks: CLIENT_EVENTS) {
        // Assign event callbacks; checks if an event is invalid, if so skips it
        for (const [key, value] of Object.entries(callbacks)) {
            if ((!(key in this.event_callbacks)) || (!(value instanceof Function)) ) {
                console.log(`WARN: "${key}" is not a valid client event.`);
                continue;
            }
            // @ts-ignore  (claims key/value may be invalid, but their types are valid)
            this.event_callbacks[key] = value;
        }
    }

    private callback_event(event_key: string) {
        // @ts-ignore  (claims key / callback may be invalid or undefined, but they can't)
        this.event_callbacks[event_key]();
    }

    public get_phone_number(): string { return this.phone_number; }
    public set_phone_number(phone: string) { this.phone_number = phone; }
    public get_request_headers(): Headers { return this.request_headers; }
    public get_session(): Responses.Session | null { return this.session; }
}