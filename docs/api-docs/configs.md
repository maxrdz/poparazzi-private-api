# https://poparazzi.com/api/configs/
## HTTP Methods - `GET`
## Response Type - [`Config`]()

--------------------------------------------

### Description
Returns the latest app configurations. (message strings, official social medias, etc.)

Only `GET` method is allowed; uses extended URL. Example: `/api/configs/3.1.23`

### `GET` Response Example
```json
{
  "data": {
    "type": "configs",
    "id": "3.1.23",
    "attributes": {
      "is_app_update_required": false,
      "is_live": false,
      "is_uploads_enabled": true,
      "app_share_url": "https://apps.apple.com/...",
      "multi_invite_text": "<string>",
      "invite_text_body": "<string>",
      "invite_share_view_description": "<string>",
      "minimum_posts_hide_invite_share": 1,
      "minimum_posted_hide_invite_share": 1,
      "minimum_feed_hide_invite_share": 9,
      "snap_username": "poparazziapp",
      "ig_username": "poparazziapp",
      "twitter_username": "poparazzidotcom",
      "default_reaction_emojis": [
        "❤", "", "", "", "", "", ""
      ],
      "delete_account_available": false,
      "in_app_post_message": null,
      "onboarding_invite_user_filter": true,
      "is_auto_follow_on": false,
      "max_name_length": 30
    }
  }
}
```