# `CLIENT_EVENTS`

#### Defines all client events; used to store client event callback function references.

## Interface Object
```typescript
export interface CLIENT_EVENTS {
  login_success?: Function,
  login_failure?: Function
  logout?: Function
}
```

## Interface Variables

- ### login_success: `Function`
  - This event's callback is triggered upon a successful login.
- ### login_failure: `Function`
  - This event's callback is triggered upon a failed login.
- ### logout: `Function`
  - This event's callback is triggered when the Client's session is ended.