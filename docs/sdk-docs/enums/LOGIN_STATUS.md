# `LOGIN_STATUS`

#### The status returned by the Client interactive login prompt.

## Enum Values

- ### `OK` = 0
  - The login prompt returned with a successful login.
- ### `INVALID` = 1
  - The login credentials were found invalid by the server.
- ### `SESSION_ERROR` = 2
  - The login encountered an issue while creating a new session.
- ### `EXISTS` = 3
  - The client already holds an existing Poparazzi session.