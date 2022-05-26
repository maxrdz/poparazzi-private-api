# `DEVICE_TOKEN_ACTION`

#### Represents all actions available to send over the apple_device_tokens API endpoint.

## Enum Values

- ### `NEW_TOKEN` = 0
  - Will submit a new Apple device token object to the server.
- ### `END_SESSION` = 1
  - Will send an unauthorized PATCH to an existing device token to end the session.