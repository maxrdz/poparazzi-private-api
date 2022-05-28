/*
    Copyright 2022 Max Rodriguez Coppola

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
import * as Responses from './api-responses';
import fetch, {Headers, Response} from "node-fetch";
import readline from "node:readline";

export enum HTTP_METHOD { GET = "GET", POST = "POST", PATCH = "PATCH"}
export enum LOGIN_STATUS { OK = 0, INVALID = 1, SESSION_ERROR = 2, EXISTS = 3 }
export enum CREDENTIAL_TYPE { PHONE = 0, VERIFY_CODE = 1 }
export enum CREDENTIAL_STATUS { MISSING_SESSION = 0, INVALID = 1, VALID = 2 }
export enum DEVICE_TOKEN_ACTION { NEW_TOKEN = 0, END_SESSION = 1 }

export interface CLIENT_EVENTS {
    login_success?: Function,
    login_failure?: Function
    logout?: Function
}

export class Client {
    private phone_number: string;
    private readonly poparazzi_ver: string;
    private readonly cfnetwork_ver: string;
    private readonly darwin_ver: string;
    private readonly request_headers: Headers;
    private readonly event_callbacks: CLIENT_EVENTS;
    private readonly generate_random_hex: Function;
    private session: Responses.Session | null;
    private device_token: Responses.AppleDeviceToken | null;

    constructor(args: { phone_number?: string, language?: string, interactive_login?: boolean }) {

        if (args.phone_number) this.phone_number = args.phone_number;
        else this.phone_number = "";
        this.poparazzi_ver = "3.1.23#839";
        this.cfnetwork_ver = "1331.0.7";
        this.darwin_ver = "21.4.0";
        this.session = null;
        this.device_token = null;
        this.event_callbacks = {
            login_success: async () => {},
            login_failure: async () => {},
            logout: async () => {}
        };
        this.generate_random_hex = (size: number): string => {
            const result = [];
            const hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
            for (let n = 0; n < size; n++) result.push(hexRef[ Math.floor(Math.random() * 16) ]);
            return result.join("");
        }

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
            })();
        }
    }

    public static api_call(args: {
        endpoint: string, headers: Headers, path?: string,
        method?: HTTP_METHOD, payload?: object }): Promise<Response> {

        let request_url = `https://poparazzi.com/api/${args.endpoint}`;
        // Stringify payload object as JSON
        const payload = JSON.stringify(args.payload, null, 2);

        // If extended path given, add to url
        if (args.path) request_url = request_url.concat(`/${args.path}`);

        // POST / PATCH methods
        if (args.method && args.method !== HTTP_METHOD.GET) {
            return fetch(request_url, { method: args.method, body: payload, headers: args.headers });
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
                method: HTTP_METHOD.POST, payload: payload
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

    private async send_device_token(arg: DEVICE_TOKEN_ACTION): Promise<Responses.AppleDeviceToken | null> {

        return new Promise(async (resolve, reject) => {
            let device_token_id = "";
            let device_token: Responses.AppleDeviceToken;

            // To silence 'possibly null' error, assigning placeholder token first.
            device_token = new Responses.AppleDeviceToken("");

            switch (arg) {
                case DEVICE_TOKEN_ACTION.NEW_TOKEN:
                    // Avoid creating a duplicate device token; override with `reset_device_token()`
                    if (this.device_token !== null) reject();
                    // Check if the client doesn't have authorization
                    if (!this.request_headers.has('Authorization')) reject();

                    device_token_id = this.generate_random_hex(64); // 64 characters long
                    device_token = new Responses.AppleDeviceToken(device_token_id);

                    const match_build = new RegExp('#.*', '');
                    const match_version = new RegExp('.*#', '');

                    device_token.set_attributes({
                        is_invalidated: false,
                        bundle_version: this.poparazzi_ver.replace(match_build, ""),
                        build_number: this.poparazzi_ver.replace(match_version, ""),
                        is_production: true,
                        bundle_id: "TTYL.Inc.Poparazzi",
                        is_voip: false
                    });
                    break;

                case DEVICE_TOKEN_ACTION.END_SESSION:
                    // Check if no session or token exists; nothing to do.
                    if (this.session === null || this.device_token === null) reject();

                    // Remove client authorization to terminate session
                    this.request_headers.delete("Authorization");
                    this.session = null;
                    // @ts-ignore
                    device_token = this.device_token; // type checked above
                    break;
            }
            // Assign chosen device token to client attribute
            this.device_token = device_token;

            const payload = {"data": {}};
            payload.data = Object.assign({}, this.device_token); // cast device token to payload

            // Set `connection: close` request header for this API request
            const headers_copy = new Headers(this.request_headers);
            headers_copy.set("Connection", "close");

            const response = await Client.api_call({
                endpoint: "apple_device_tokens", headers: headers_copy,
                method: HTTP_METHOD.PATCH, payload: payload,
                path: `${this.device_token.id}` // add token to URL path (required)
            });

            const data = await response.json();
            if (typeof data !== typeof {}) reject(); // safety check

            if (arg === DEVICE_TOKEN_ACTION.END_SESSION) {
                this.device_token = null;
                await this.trigger_event("logout"); // call logout event
            } else {
                Object.assign(this.device_token, data.data); // cast new response data to token
            }
            resolve(this.device_token);
        });
    }
    public async generate_device_token(): Promise<Responses.AppleDeviceToken | null> {
        return this.send_device_token(DEVICE_TOKEN_ACTION.NEW_TOKEN);
    }
    public async end_session(): Promise<Responses.AppleDeviceToken | null> {
        return this.send_device_token(DEVICE_TOKEN_ACTION.END_SESSION);
    }

    private async submit_credential(data: string, type: CREDENTIAL_TYPE): Promise<CREDENTIAL_STATUS> {
        return new Promise(async (resolve, reject) => {

            // Check if the client doesn't have authorization
            if (!this.request_headers.has('Authorization')) {
                await this.trigger_event("login_failure");
                reject(CREDENTIAL_STATUS.MISSING_SESSION);
            }

            const session_copy = new Responses.Session({});
            session_copy.id = this.session?.id; // set session ID to payload

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

            // Add `Device-Check` request header to API request
            const headers_copy = new Headers(this.request_headers);
            headers_copy.set("Device-Check", this.generate_random_hex(256)); // it doesn't even verify it

            const response = await Client.api_call({
                endpoint: "sessions", headers: headers_copy,
                method: HTTP_METHOD.PATCH, payload: payload, path: `${session_copy.id}`
            });
            const res_data = await response.json();
            if (typeof res_data !== typeof {}) reject(); // data not valid (just in case)

            if (res_data.hasOwnProperty("error")) { // server returned error
                await this.trigger_event("login_failure");
                reject(CREDENTIAL_STATUS.INVALID);
            }

            const new_session = new Responses.Session({});
            Object.assign(new_session, res_data.data); // cast response data to new Session object

            if (type === CREDENTIAL_TYPE.VERIFY_CODE) {
                this.session = new_session;
                await this.trigger_event("login_success"); // verification code validated
            }
            resolve(CREDENTIAL_STATUS.VALID);
        });
    }

    public async submit_phone_number(number?: string): Promise<CREDENTIAL_STATUS> {
        let phone: string;
        if (number) phone = number; else phone = this.phone_number;
        return this.submit_credential(phone, CREDENTIAL_TYPE.PHONE);
    }

    public async submit_verification_code(code: string): Promise<CREDENTIAL_STATUS> {
        return this.submit_credential(code, CREDENTIAL_TYPE.VERIFY_CODE);
    }

    public async interactive_login_prompt(): Promise<LOGIN_STATUS> {
        return new Promise(async (resolve, reject) => {
            if (this.session !== null) reject(LOGIN_STATUS.EXISTS);
            console.log("Log in to your Poparazzi account.");

            // Create a new Poparazzi session
            const session = await this.create_session();

            // Generate an Apple device token
            this.device_token = await this.generate_device_token();

            // Callback function to prompt input for verification code (after phone number)
            const verify_prompt = () => {
                console.log("\nPlease enter the verification code you received via SMS.");
                const prompt = readline.createInterface({input: process.stdin, output: process.stdout});

                prompt.question("(Enter a 6-digit code): ", (input: string) => {
                    prompt.close();
                    ;(async () => {
                        const status = await this.submit_verification_code(input);

                        switch (status) {
                            case CREDENTIAL_STATUS.VALID:
                                resolve(LOGIN_STATUS.OK);
                                break;
                            case CREDENTIAL_STATUS.INVALID:
                                resolve(LOGIN_STATUS.INVALID);
                                break;
                            case CREDENTIAL_STATUS.MISSING_SESSION:
                                resolve(LOGIN_STATUS.SESSION_ERROR);
                                break;
                        }
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

    private async trigger_event(event_key: string, args?: any) {
        // @ts-ignore  (claims key / callback may be invalid or undefined, but they can't)
        if (args) await this.event_callbacks[event_key](args);
        // @ts-ignore
        else await this.event_callbacks[event_key]();
    }

    public get_phone_number(): string { return this.phone_number; }
    public set_phone_number(phone: string) { this.phone_number = phone; }
    public get_request_headers(): Headers { return this.request_headers; }
    public get_session(): Responses.Session | null { return this.session; }
    public get_device_token(): Responses.AppleDeviceToken | null { return this.device_token; }
    public reset_device_token() { this.device_token = null; }
    public set_language(language: string) { this.request_headers.set('Accept-Language', language); }
}