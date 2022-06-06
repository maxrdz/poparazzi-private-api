# Class: `Config` extends `ApiResponseBase`

#### Represents the response given from the Configs API endpoint.

## Class Properties

- #### Public Properties
    - `attributes`: _[object]()_
      - `is_app_update_required`: _[boolean]()_ | _null_
      - `is_live`: _[boolean]()_ | _null_
      - `is_uploads_enabled`: _[boolean]()_ | _null_
      - `app_share_url`: _[string]()_ | _null_
      - `multi_invite_text`: _[string]()_ | _null_
      - `invite_text_body`: _[string]()_ | _null_
      - `invite_share_view_description`: _[string]()_ | _null_
      - `minimum_posts_hide_invite_share`: _[number]()_ | _null_
      - `minimum_posted_hide_invite_share`: _[number]()_ | _null_
      - `minimum_feed_hide_invite_share`: _[number]()_ | _null_
      - `snap_username`: _[string]()_ | _null_
      - `ig_username`: _[string]()_ | _null_
      - `twitter_username`: _[string]()_ | _null_
      - `default_reaction_emojis`: [Array]()<_[string]()_> | _null_
      - `delete_account_available`: _[boolean]()_ | _null_
      - `in_app_post_message`: _[string]()_ | _null_
      - `onboarding_invite_user_filter`: _[boolean]()_ | _null_
      - `is_auto_follow_on`: _[boolean]()_ | _null_
      - `max_name_length`: _[number]()_ | _null_

# Public Methods

## constructor()

- #### constructor(bundle_version: _[string]()_, args: {})

- Sets the bundle version on a new Config object. Still a WIP.
