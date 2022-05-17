/*
    Released under the MIT license.
    View 'LICENSE' for the full license.

    Copyright (c) 2022 Max Rodriguez
*/
// Defines Poparazzi API endpoint responses.

class ApiResponseBase {
    type: string;
    id?: string;

    constructor(type: string, id?: string) {
        this.type = type;
        if (id) this.id = id;
    }
}
// poparazzi.com/api/sessions/
export class Session extends ApiResponseBase {
    attributes: {
        created_at: string;
        updated_at: string;
    }
    relationships: {
        user: {
            data: object | null;
        }
    }
    constructor(session_id: string, created_at: string) {
        super("sessions", session_id);
        this.attributes = {
            created_at: created_at,
            updated_at: created_at
        };
        this.relationships = {
            user: { data: null }
        };
    }
}
// poparazzi.com/api/configs/
export class Config extends ApiResponseBase {
    attributes: {
        is_app_update_required: boolean;
        is_live: boolean;
        is_uploads_enabled: boolean;
        app_share_url: string;
        multi_invite_text: string;
        invite_text_body: string;
        invite_share_view_description: string;
        minimum_posts_hide_invite_share: number;
        minimum_posted_hide_invite_share: number;
        minimum_feed_hide_invite_share: number;
        snap_username: string;
        ig_username: string;
        twitter_username: string;
        default_reaction_emojis: Array<string> | [
            "❤", "", "", "", "", "", ""
        ];
        delete_account_available: boolean | false;
        in_app_post_message: string | null;
        onboarding_invite_user_filter: boolean | true;
        is_auto_follow_on: boolean | false;
        max_name_length: number | 30;
    }

    constructor(bundle_version: string, args: {}) {
        super("configs", bundle_version);
        // @ts-ignore
        this.attributes = {};
    }
}
// poparazzi.com/api/apple_device_tokens/
export class AppleDeviceToken extends ApiResponseBase {
    attributes: {
        is_voip: boolean | false;
        bundle_version: string | "3.1.20";
        build_number: string | "826";
        is_production: boolean | true;
        bundle_id: string | "TTYL.Inc.Poparazzi";
        is_invalidated: boolean | false;
    }
    constructor(device_token: string) {
        super("apple_device_tokens", device_token);
        // @ts-ignore
        this.attributes = {};
    }
}
// poparazzi.com/api/users/
export class User extends ApiResponseBase {
    attributes: object;

    constructor(user_id: string) {
        super("users", user_id);
        // @ts-ignore
        this.attributes = {};
    }
}