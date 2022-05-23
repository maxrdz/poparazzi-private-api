/*
    poparazzi-private-api  Copyright (C) 2022  Max Rodriguez
    This program comes with ABSOLUTELY NO WARRANTY;
    This is free software, and you are welcome to
    redistribute it under certain conditions;
*/

class ApiErrorBase {
    // @ts-ignore
    id: string | null;
    status?: string | null;
    code?: string | null;
    title?: string | null;
    detail?: string | null;

    constructor(args: { id: string }) {
        this.id = args.id;
    }
}
export class NotAuthorized extends ApiErrorBase {
    constructor(args: { id: string }) {

        super({ id: args.id });
        this.status = "401";
        this.code = "NOT_AUTHORIZED";
        this.title = "You are not authorized.";
        this.detail = "You are not authorized.";
    }
}