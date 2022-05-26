# https://poparazzi.com/api/apple_device_tokens/
## HTTP Methods - `PATCH`
## Payload / Response Type - [`AppleDeviceToken`]()

--------------------------------------------

### Description
Used to send client device information to the server using a unique assigned device token.

A different API may be used for different mobile devices. (I own an Apple iPhone)

- When the client logs in with a new session, it is paired with the client's device token.
  - (The `AppleDeviceToken` object is sent, with an `Authorization` request header.)
  - The `Authorization` header contains a Bearer token as the session ID.
    - Content example: `Bearer 9c567d50-a2fd-4f26-a221-d71f4102136b`


- When the client logs out from a session, it does a similar process.
  - (The `AppleDeviceToken` object is sent, but without the `Authorization` header.)
  - The server then responds with the `NOT_AUTHORIZED` error.

NOTE: Through some test trials, it looks like any randomly generated 64 character hexadecimal is accepted by the Poparazzi API as a valid apple device token.

### Response Example
```json
{
  "data": {
    "type": "apple_device_tokens",
    "id": "66f11365c8b9d5be77941db22de0573b732a25b329a4f0d259cd07787fdcdf8b",
    "attributes": {
      "bundle_version": "3.1.23",
      "bundle_id": "TTYL.Inc.Poparazzi",
      "build_number": "839",
      "is_production": true,
      "is_voip": false,
      "is_invalidated": false,
      "created_at": "2022-01-17T03:50:04.463Z",
      "updated_at": "2022-05-20T22:15:43.990Z"
    }
  },
  "relationships": {
    "session": {
      "data": { <Session> object }
    },
    "user": {
      "data": { <User> object or null }
    }
  }
}
```

### `PATCH` Payload Example
When the client associates its device token with a new session ID, or logs out from a session.

(The payload is the same, log in our out, the difference is the `Authorization` header.)
```json
{
  "data": {
    "type": "apple_device_tokens",
    "id": "66f11365c8b9d5be77941db22de0573b732a25b329a4f0d259cd07787fdcdf8b",
    "attributes": {
      "is_invalidated": false,
      "bundle_version": "3.1.23",
      "build_number": "839",
      "is_production": true,
      "bundle_id": "TTYL.Inc.Poparazzi",
      "is_voip": false
    }
  }
}
```