# Class: `Client`

#### This class serves as the Poparazzi client object, which handles all API calls.

## Class Properties

- #### Private Properties
  - `phone_number`: **_string_**
  - readonly `poparazzi_ver`: **_string_**
  - readonly `cfnetwork_ver`: **_string_**
  - readonly `darwin_ver`: **_string_**
  - readonly `request_headers`: **_[Headers]()_**
  - readonly `event_callbacks`: **_[CLIENT_EVENTS]()_**
  - readonly `generate_random_hex`: **_Function_**
  - `session`: **_[Session]()_** | **_null_**
  - `device_token`: **_[AppleDeviceToken]()_** | **_null_**

# Public Methods

## constructor()

- #### constructor(args: { phone_number?: _[string]()_, language?: _[string]()_, interactive_login?: _[boolean]()_ })

- Constructs a new `Client` instance. All arguments are optional and can be set later.

## api_call()

- #### `Static` api_call(args: { endpoint: _[string]()_, headers: _[Headers]()_, path?: _[string]()_, method?: _[HTTP_METHOD]()_, payload?: _[object]()_ }): [Promise]()<[Response]()>

- Used by most API methods to send a request to an endpoint; can be accessed publicly.

## create_session()

- #### `async` create_session(): [Promise]()<[Session]()>

- This method creates a new Poparazzi session and stores the [Session]() object.

## end_session()

- #### `async` end_session(): [Promise]()<[AppleDeviceToken]() | _null_>

- This method ends a Poparazzi session by sending its device token without authorization.

## generate_device_token()

- #### `async` generate_device_token(): [Promise]()<[AppleDeviceToken]() | _null_>

- Sends a randomly generated [AppleDeviceToken]() to the **apple_device_tokens** API endpoint.

## get_device_token()

- #### get_device_token(): [AppleDeviceToken]() | _null_

- Returns the Client's `device_token` attribute. (can be **_null_**)

## get_phone_number()

- #### get_phone_number(): _[string]()_

- Returns the Client's `phone_number` attribute.

## get_request_headers()

- #### get_request_headers(): [Headers]()

- Returns the Client's `request_headers` attribute object.

## get_session()

- #### get_session(): [Session]() | _null_

- Returns the Client's `session` attribute object.

## interactive_login_prompt()

- #### `async` interactive_login_prompt(): [Promise]()<[LOGIN_STATUS]()>

- Launches the built-in login wizard, which takes user input from stdin.

## reset_device_token()

- #### reset_device_token(): _[void]()_

- Sets the Client's `device_token` attribute to **_null_**.

## submit_phone_number()

- #### `async` submit_phone_number(number?: _[string]()_): [Promise]()<[Session]()>

- Submits the phone number given to the Poparazzi **sessions** API endpoint. If a phone number argument is not given, by default it will use the Client's `phone_number` property.

## submit_verification_code()

- #### `async` submit_verification_code(code: _[string]()_): [Promise]()<[Session]()>

- Submits the 6-digit code given to the Poparazzi **sessions** API endpoint.

## set_event()

- #### set_event(callbacks: _[CLIENT_EVENTS]()_): _[void]()_

- Sets the corresponding client event callback function in `event_callbacks`.

## set_language()

- #### set_language(language: _[string]()_): _[void]()_

- Sets `request_headers` **"Accept-Language"** header to the string given.

## set_phone_number()

- #### set_phone_number(phone: _[string]()_): _[void]()_

- Sets the Client's `phone_number` attribute to the string given.

# Private Methods

## send_device_token()

- #### `async` send_device_token(arg: _[DEVICE_TOKEN_ACTION]()_): [Promise]()<[AppleDeviceToken]() | _null_>

- This function is the under the hood implementation of the **apple_device_tokens** API endpoint.

## submit_credential()

- #### `async` submit_credential(data: _[string]()_, type: _[CREDENTIAL_TYPE]()_): [Promise]()<[Session]()>

- This method submits credential information to the **sessions** API endpoint.

## trigger_event()

- #### `async` trigger_event(event_key: _[string]()_, args?: _[any]()_): _[void]()_

- Triggers a client event, which calls its corresponding async callback function from the `event_callbacks` Client property.