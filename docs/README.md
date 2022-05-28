<img src="https://user-images.githubusercontent.com/33995146/169403681-6f3abfb0-10f4-4c2c-9ef4-fe7704142b58.jpg" alt="Logo is a registered trademark reserved by TTYL Inc. Poparazzi" align="right" width="55%"/>

# SDK / API Documentation
Please feel free to make contributions to the documentation by submitting a pull request with your contribution.

### Key / Legend
```
⚠ - Missing more documentation
```

## SDK Documentation

  - ### Enums
    - [HTTP_METHOD](sdk-docs/enums/HTTP_METHOD.md)
    - [LOGIN_STATUS](sdk-docs/enums/LOGIN_STATUS.md)
    - [CREDENTIAL_TYPE](sdk-docs/enums/CREDENTIAL_TYPE.md)
    - [CREDENTIAL_STATUS](sdk-docs/enums/CREDENTIAL_STATUS.md)
    - [DEVICE_TOKEN_ACTION](sdk-docs/enums/DEVICE_TOKEN_ACTION.md)
  - ### Interfaces
    - [CLIENT_EVENTS](sdk-docs/interfaces/CLIENT_EVENTS.md)
  - ### Classes
    - ### `Client()` - [Client.md](sdk-docs/classes/Client.md)
      - #### Public Methods (A-Z)
        - [api_call()](sdk-docs/classes/Client.md#api_call)
        - [create_session()](sdk-docs/classes/Client.md#create_session)
        - [end_session()](sdk-docs/classes/Client.md#end_session)
        - [generate_device_token()](sdk-docs/classes/Client.md#generate_device_token)
        - [get_device_token()](sdk-docs/classes/Client.md#get_device_token)
        - [get_phone_number()](sdk-docs/classes/Client.md#get_phone_number)
        - [get_request_headers()](sdk-docs/classes/Client.md#get_request_headers)
        - [get_session()](sdk-docs/classes/Client.md#get_session)
        - [interactive_login_prompt()](sdk-docs/classes/Client.md#interactive_login_prompt)
        - [reset_device_token()](sdk-docs/classes/Client.md#reset_device_token)
        - [submit_phone_number()](sdk-docs/classes/Client.md#submit_phone_number)
        - [submit_verification_code()](sdk-docs/classes/Client.md#submit_verification_code)
        - [set_event()](sdk-docs/classes/Client.md#set_event)
        - [set_language()](sdk-docs/classes/Client.md#set_language)
        - [set_phone_number()](sdk-docs/classes/Client.md#set_phone_number)
      - #### Private Methods (A-Z)
        - [send_device_token()](sdk-docs/classes/Client.md#send_device_token)
        - [submit_credential()](sdk-docs/classes/Client.md#submit_credential)
        - [trigger_event()](sdk-docs/classes/Client.md#trigger_event)

## API Documentation

  - ### HTTPS Web API
    - `/api/configs` - [configs.md](api-docs/configs.md)
    - `/api/sessions` - [sessions.md](api-docs/sessions.md)
    - `/api/apple_device_tokens` - [apple_device_tokens.md](api-docs/apple_device_tokens.md)
    - `/api/users` - [users.md](api-docs/users.md)
    - `/api/groups` - [groups.md](api-docs/groups.md) ⚠️
- ### WSS Streaming API
  - [Stream Authentication](api-docs/websocket-stream.md#stream-authentication) (implementing soon)
  - [Pop View Counts Event](api-docs/websocket-stream.md#pop-view-counts-event) (implementing soon)