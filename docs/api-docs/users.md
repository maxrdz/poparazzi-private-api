# https://poparazzi.com/api/users/
## HTTP Methods - `GET`
## Payload / Response Type - [`User`]()

--------------------------------------------

### Description
Used by the client to get User objects and make user queries.

### `GET` Response Example
When a specific user ID is queried. Example: `/api/users/<user_id>`

```json
{
  "data": {
    "type": "users",
    "id": "9368435d-e97e-4ef1-9cba-1de7ee8b2ccd",
    "attributes": {
      "badges": [
        "verified"
      ],
      "reactions_count": 263,
      "posts_count": 50,
      "posted_count": 36,
      "views_count": 11067,
      "profile_photo_url": "<image_cdn_url>",
      "first_name": "Thomas",
      "last_name": "Barboa",
      "username": "thomasbarboa",
      "is_ghost": false,
      "is_banned": null,
      "is_private": false,
      "pop_score": 11,
      "is_online": false,
      "created_at": "2021-06-06T02:15:09.416Z",
      "updated_at": "2022-03-12T05:51:56.911Z",
      "followers_count": 19,
      "following_count": 22,
      "content_notifications": "OFF",
      "is_following": true,
      "is_followed_by": true,
      "is_blocking": false,
      "is_blocked_by": false,
      "create_content_permission": "APPROVED"
    },
    "relationships": {
      "mutual_users": {
        "data": [ <User> array ]
      },
      "top_poparazzi": {
        "data": [ <User> array ]
      }
    }
  }
}
```

### Query Options

- `?filter[ <key> ]= <value>` - Returns an array of users matching the key/value pair.
    - ```json
      {
        "links": {
        },
        "data": [ <User> array ]
      }
      ```