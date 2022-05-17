/*
    Released under the MIT license.
    View 'LICENSE' for the full license.

    Copyright (c) 2022 Max Rodriguez
*/
import * as api_responses from './api-responses';

export class PoparazziClient {
    account: {
        phone_number: string | null;
        verification_code: string | null;
    }

    constructor(args: { phone_number: string }) {
        this.account = {
            phone_number: args.phone_number,
            verification_code: null
        };
    }
}