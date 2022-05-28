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
export class Unknown extends ApiErrorBase {
    constructor(args: { id: string }) {

        super({ id: args.id });
        this.status = "400";
        this.code = "UNKNOWN";
    }
}