# `CLIENT_EVENTS`

#### Defines all client events; used to store client event callback function references.

## Interface Object
```typescript
export interface CLIENT_EVENTS {
  login_success?: Function,
  login_failure?: Function
  logout?: Function,
  websocket_connect?: Function,
  websocket_authorized?: Function
}
```

## Interface Variables

- ### login_success: `Function`
  - Event callback triggered upon a successful login.
- ### login_failure: `Function`
  - Event callback triggered upon a failed login.
- ### logout: `Function`
  - Event callback triggered when the Client's session is ended.
- ### websocket_connect: `Function`
  - Event callback triggered upon a successful websocket connection at **poparazzi.com:443**.
- ### websocket_authorized: `Function`
  - Event callback triggered when the Poparazzi websocket server authorizes the session. **Note:** The Poparazzi streaming API only authorizes sessions logged into a Poparazzi account.