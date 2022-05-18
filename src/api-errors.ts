/*
    Released under the MIT license.
    View 'LICENSE' for the full license.

    Copyright (c) 2022 Max Rodriguez
*/
// Defines all API error response objects

class ApiErrorBase {
    // @ts-ignore
    id: string | null;
    status: string | null;

    constructor(err_status: string, id?: string) {
        if (id) this.id = id;
        this.status = err_status;
    }
}