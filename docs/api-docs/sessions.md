# https://poparazzi.com/api/sessions/
## HTTP Methods - `GET`, `POST`, `PATCH`
## Payload / Response Type - [`Session`]()

--------------------------------------------

### Description
Used by the client to create new sessions and update session info.

After the client sends a phone number and a valid verification code, the server responds with the session object along with a relationship to the corresponding user ID.

(Every unique user is matched with a mobile phone number.)

### `GET` Response Example
```json
{
  "data": {
    "type": "sessions",
    "id": "<session_id>",
    "attributes": {
      "updated_at": "<utc_timestamp>",
      "created_at": "<utc_timestamp>"
    },
    "relationships": {
      "user": {
        "data": { <User> object }
      }
    }
  },
  "included": [ <User> array ]
}
```

### `POST` Payload Example
Used when the client requests a new session ID.
```json
{
  "data": {
    "type": "sessions",
    "attributes": {
      "is_cookie_based": false
    }
  }
}
```

### `PATCH` Payload Example
Update session info, such as when logging in. (Send phone # and verification code)

Requires session id. Example: `/api/sessions/<session_id>`
```json
{
  "data": {
    "type": "sessions",
    "id": "<session_id>",
    "attributes": {
      // Usually sent separately as the user logs in.
      "phone_number": "+10000000000",
      "verification_code": "000000"
    }
  }
}
```
