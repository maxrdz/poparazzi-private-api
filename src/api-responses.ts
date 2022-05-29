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

export class ApiResponseBase {
    type: string | null;
    id?: string | null;
    attributes?: object;

    constructor(args: {type: string, id?: string}) {
        this.type = args.type;
        if (args.id) this.id = args.id;
    }
    public set_attributes(obj: object) {
        this.attributes = obj;
    }
}
// poparazzi.com/api/sessions/
export class Session extends ApiResponseBase {
    attributes: {
        created_at?: string;
        updated_at?: string;
        is_cookie_based?: boolean;
        phone_number?: string;
        verification_code?: string;
    }
    relationships?: {
        user: { data: User | null; }
    }
    constructor(args: { new_session?: boolean }) {
        super({ type: "sessions" });

        if (args.new_session) {
            this.attributes = { is_cookie_based: false };
            return;
        }
        this.attributes = {};
    }
    public set_verify_code(code: string) {
        this.attributes.verification_code = code;
    }
    public set_phone_number(phone: string) {
        this.attributes.phone_number = phone;
    }
}
// poparazzi.com/api/configs/
export class Config extends ApiResponseBase {
    attributes: {
        is_app_update_required: boolean | null;
        is_live: boolean | null;
        is_uploads_enabled: boolean | null;
        app_share_url: string | null;
        multi_invite_text: string | null;
        invite_text_body: string | null;
        invite_share_view_description: string | null;
        minimum_posts_hide_invite_share: number | null;
        minimum_posted_hide_invite_share: number | null;
        minimum_feed_hide_invite_share: number | null;
        snap_username: string | null;
        ig_username: string | null;
        twitter_username: string | null;
        default_reaction_emojis: Array<string> | null;
        delete_account_available: boolean | null;
        in_app_post_message: string | null;
        onboarding_invite_user_filter: boolean | null;
        is_auto_follow_on: boolean | null;
        max_name_length: number | null;
    }
    constructor(bundle_version: string, args: {}) {
        super({ type: "configs", id: bundle_version });
        // @ts-ignore
        this.attributes = {};
    }
}
// poparazzi.com/api/apple_device_tokens/
export class AppleDeviceToken extends ApiResponseBase {
    attributes: {
        is_invalidated: boolean | null;
        bundle_version: string | null;
        build_number: string | null;
        is_production: boolean | null;
        bundle_id: string | null;
        is_voip: boolean | null;
        created_at?: string | null;
        updated_at?: string | null;
    }
    relationships?: {
        session: {
            data: object | null;
        }
        user: {
            data: object | null;
        }
    }
    constructor(device_token: string) {
        super({ type: "apple_device_tokens", id: device_token });
        // @ts-ignore
        this.attributes = {};
    }
}
/*
 Object not associated with an endpoint (as far as I know)
 probably gotta get more info about this object
*/
class NotificationSettings extends ApiResponseBase {
    constructor(id: string) {
        super({ type: "notification_settings", id: id });
    }
}
// poparazzi.com/api/users/
export class User extends ApiResponseBase {
    attributes?: {
        badges: Array<any> | null; // Empty array observed, item data type unknown.
        reactions_count: number | null;
        posts_count: number | null;
        posted_count: number | null;
        views_count: number | null;
        profile_photo_url: string | null;
        first_name: string | null;
        last_name: string | null;
        username: string | null;
        is_ghost: boolean | null;
        is_banned: boolean | null; // 'null' observed; real data type unknown. (most likely `bool`)
        is_private: boolean | null;
        pop_score: number | null;
        is_online: boolean | null;
        created_at: string | null;
        updated_at: string | null;
        followers_count: number | null;
        following_count: number | null;
        default_create_content_permission: string | null;
        unread_group_counts: number | null;
        age: number | null;
        badge_count: number | null;
        latitude: string | null; // 'null' observed; real data type unknown. (assuming `string`)
        longitude: string | null; // 'null' observed; real data type unknown. (assuming `string`)
        phone_number: string | null;
        email: string | null;
        email_verified: boolean | null;
        invites_sent: number | null;
        invalidated_fields: Array<any> | null; // Empty array observed, item data type unknown.
        ban_reason_text: string | null; // 'null' observed; real data type unknown. (assuming `string`)
        profile_photo_upload_url: string | null;
    }
    relationships?: {
        notification_settings: { data: NotificationSettings; }
        school_tag: {
            data: object | null; // 'null' observed; real data type unknown. (most likely `Object`)
        }
        top_poparazzi: { data: Array<User>; }
    }
    constructor(args: { user_id: string }) {
        super({ type: "users", id: args.user_id });
    }
}
// poparazzi.com/api/contents/
export class Contents { // Doesn't have type, doesn't inherit usual base.
    links?: {
        next: string | null;
    }
    data?: Array<Content>;

    constructor(args: { response_json: string }) {
        // TODO: Parse JSON into object attributes. (very lost rn)
    }
}
// 'Content' object; type "contents", part of /api/contents/ response.
export class Content extends ApiResponseBase {
    attributes?: {
        reactions: Array<string> | null;
        last_reacted_at: string | null;
        visibility: string | null; // maybe create enum?
        suggested_reactions: Array<string> | null;
        remote_media_urls: Array<string> | null;
        reaction_counts: Array<string> | null;
        comments_count: number | null;
        views_count: number | null;
        is_camera_roll: boolean | null;
        updated_at: string | null;
        created_at: string | null;
        uploaded_at: string | null;
        feed_item_id: string | null;
        is_quote: boolean | null;
        remote_video_url: string | null; // 'null' observed; true data type unknown. (assuming `string`)
        media_type: string | null; // maybe create enum?
    }
    relationships?: {
        user: { data: User; }
        tagged_users: { data: Array<User>; }
        pending_tagged_users: { data: Array<User>; }
        content_states: {
            links: {
                next: string;
            }
            data: Array<any>; // TODO: Define "content_states" API object.
        }
    }
    constructor(args: { id: string }) {
        super({ type: "contents", id: args.id });
    }
}

// ----- Websocket Streaming API Responses ----- //

export class StreamResponseBase {
    payload: object
    constructor() {
        this.payload = {};
    }
}

export class StreamAuthorization extends StreamResponseBase {
    payload: {
        authorization: string
    }
    constructor(authorization: string) {
        super();
        this.payload = {
            authorization: ""
        }
        this.payload.authorization = authorization;
    }
}

export class StreamState extends StreamResponseBase {
    payload: {
        state: {
            active_group_id: string | null
            is_typing: boolean | null
        }
    }
    constructor() {
        super();
        this.payload = {
            state: {
                active_group_id: null,
                is_typing: null
            }
        }
    }
    public set_active_group_id(id: string | null) {
        this.payload.state.active_group_id = id;
    }
    public set_typing_status(status: boolean | null) {
        this.payload.state.is_typing = status;
    }
}

export class ViewCounts extends StreamResponseBase {
    payload: {
        view_counts: object
    }
    constructor(args?: { view_counts: object }) {
        super();
        this.payload = {
            view_counts: {}
        }
        if (args && args.view_counts) {
            this.payload.view_counts = args.view_counts;
        }
    }
    public new_view_count(pop_id: string, views: number) {

        let view_count = `{ "${pop_id}": ${views} }`;
        view_count = JSON.parse(view_count);

        Object.assign(this.payload.view_counts, view_count);
    }
}