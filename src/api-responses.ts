/*
    Released under the MIT license.
    View 'LICENSE' for the full license.

    Copyright (c) 2022 Max Rodriguez

    Defines Poparazzi API endpoint responses.
    Each response object defines the data that
    is placed inside the 'data' object of an API response.
*/

class ApiResponseBase {
    type: string | null;
    id: string | null;

    constructor(args: {type: string, id: string | null}) {
        this.type = args.type;
        this.id = args.id;
    }
}
// poparazzi.com/api/sessions/
export class Session extends ApiResponseBase {
    attributes: {
        created_at: string | null;
        updated_at: string | null;
    }
    relationships: {
        user: { data: User | null; }
    }
    constructor(session_id: string, created_at: string) {
        super({ type: "sessions", id: session_id });
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
        is_voip: boolean | null;
        bundle_version: string | null;
        build_number: string | null;
        is_production: boolean | null;
        bundle_id: string | null;
        is_invalidated: boolean | null;
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