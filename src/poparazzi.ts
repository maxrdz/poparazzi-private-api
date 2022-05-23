/*
    poparazzi-private-api  Copyright (C) 2022  Max Rodriguez
    This program comes with ABSOLUTELY NO WARRANTY;
    This is free software, and you are welcome to
    redistribute it under certain conditions;
*/
import * as Errors from './api-errors';
import * as Responses from './api-responses';
import { Headers } from 'node-fetch';
import fetch from 'node-fetch';

enum HTTP { GET = "GET", POST = "POST", PATCH = "PATCH"}

export class PoparazziClient {
    private readonly poparazzi_ver: string;
    private readonly cfnetwork_ver: string;
    private readonly darwin_ver: string;
    private readonly phone_number: string;
    private readonly request_headers: Headers;

    constructor(args: { phone_number: string, language?: string }) {
        this.phone_number = args.phone_number;
        this.poparazzi_ver = "3.1.23#839";
        this.cfnetwork_ver = "1331.0.7";
        this.darwin_ver = "21.4.0";

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
    }

    public async create_session() {
        const payload = { "data": {} };
        const empty_session = new Responses.Session({ new_session: true });
        payload.data = JSON.stringify(empty_session);

        const response = await PoparazziClient.api_call({
            endpoint: "sessions", headers: this.request_headers,
            method: HTTP.POST, payload: JSON.stringify(payload)
        });
        const data = await response.json();
        if (typeof data !== typeof {}) process.exit(1); // Data returned is not an object

        const new_session = new Responses.Session({});
        Object.assign(new_session, data); // cast response data to new Session object

        // Add session ID to `Authorization` request header
        this.request_headers.set('Authorization', `Bearer ${new_session.id}`);
        return new_session;
    }

    public static api_call(args: {
        endpoint: string, headers: Headers, path?: string, method?: HTTP, payload?: string
    }) {
        let request_url = `https://poparazzi.com/api/${args.endpoint}`;

        // If extended path given, add to url
        if (args.path) request_url.concat(`/${args.path}`);

        // POST / PATCH methods
        if (args.method && args.method !== HTTP.GET) {
            return fetch(request_url, { method: args.method, body: args.payload });
        }
        return fetch(request_url, { headers: args.headers });
    }
}