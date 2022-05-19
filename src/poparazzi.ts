/*
    poparazzi-private-api  Copyright (C) 2022  Max Rodriguez
    This program comes with ABSOLUTELY NO WARRANTY;
    This is free software, and you are welcome to
    redistribute it under certain conditions;
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