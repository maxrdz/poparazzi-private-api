/*
    poparazzi-private-api  Copyright (C) 2022  Max Rodriguez
    This program comes with ABSOLUTELY NO WARRANTY;
    This is free software, and you are welcome to
    redistribute it under certain conditions;
*/

class ApiErrorBase {
    // @ts-ignore
    id: string | null;
    status: string | null;

    constructor(err_status: string, id?: string) {
        if (id) this.id = id;
        this.status = err_status;
    }
}