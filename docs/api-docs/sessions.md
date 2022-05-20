# https://poparazzi.com/api/sessions/
## HTTP Methods - `GET`, `POST`, `PATCH`
## Payload / Response Type - [`Session`]()

--------------------------------------------

### Description
Used by the client to create new sessions and update session info.

After the client sends a phone number and a valid verification code, the server responds with the session object along with a relationship to the corresponding user ID. (Every unique user is matched with a mobile phone number.)

When the client logs off, it sends an unauthorized `PATCH` using [apple_device_tokens](apple_device_tokens.md).

### `GET` Response Example
```json
{
  "data": {
    "type": "sessions",
    "id": "9c567d50-a2fd-4f26-a221-d71f4102136b",
    "attributes": {
      "updated_at": "2022-05-20T21:49:24.233Z",
      "created_at": "2022-05-20T21:49:02.481Z"
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

### `POST` Payload Example - [Auth not required]
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

NOTE: Every PATCH made to a session ID includes the request header: `Device-Check`. It is a really long hash / token, which I think represents the device ID? ⚠
```json
{
  "data": {
    "type": "sessions",
    "id": "9c567d50-a2fd-4f26-a221-d71f4102136b",
    "attributes": {
      // Usually sent separately as the user enters input.
      "phone_number": "+10000000000",
      "verification_code": "123456"
    }
  }
}
```
Below is an example of the automated text message sent to verify your phone number.
```
Your Poparazzi verification code is: xxxxxx.
Don't share this code with anyone; our employees will never ask for the code.
```
