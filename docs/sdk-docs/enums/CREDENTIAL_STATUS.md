# `CREDENTIALS_STATUS`

#### Represents the status of a credential submission attempt.

## Enum Values

- ### `MISSING_SESSION` = 0
  - The program tried to submit credentials before creating a session.
- ### `INVALID` = 1
  - The credentials submitted were found invalid by the server.
- ### `VALID` = 2
  - The credentials submitted were validated by the server.