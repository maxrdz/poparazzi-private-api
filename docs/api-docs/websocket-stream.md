# https://poparazzi.com:443

## HTTP Method - `GET /`
### Upgrades connection protocol to secure websocket `wss://`

### Description
The websocket connection streams client / server events.

Example: When the user views a profile, the event is sent through the websocket.

### Table of Contents

- [Upgrading to the secure websocket protocol](#upgrading-to-the-secure-websocket-protocol)
- [Switching protocols response](#switching-protocols-response)


- Websocket Stream Events
  - [Stream Authentication](#stream-authentication)
  - [Pop View Counts Event](#pop-view-counts-event)

### Upgrading to the secure websocket protocol
`Sec-WebSocket-Key` header includes a base64 encoded random value.
```http request
GET / HTTP/1.1
Host: poparazzi.com:443
Sec-WebSocket-Version: 13
Upgrade: websocket
Connection: Upgrade
Origin: wss://poparazzi.com
Sec-WebSocket-Key: ZnhhZWxtdWR3aHRta3dqZQ==
```

### Switching protocols response
`Sec-WebSocket-Accept` returns a base64 encoded SHA1 hash value.
```http request
HTTP/1.1 101 Switching Protocols
Date: Mon, 23 May 2022 19:42:17 GMT
Connection: upgrade
Server: nginx/1.18.0
Upgrade: websocket
Sec-WebSocket-Accept: <sha1_base64_value>
```

# Websocket Stream Events

### Stream Authentication
The client sends its existing session ID to authenticate the websocket connection.
```json
{
  "authorization": "Bearer 9c567d50-a2fd-4f26-a221-d71f4102136b"
}
```
The server then responds with the following if the authorization was successful.
```json
{ "authenticated": true }
```
The client then sends its starting `state` object over the stream.
```json
{
  "state": {
    "active_group_id": null,  // real data type not yet known
    "is_typing": null
  }
}
```
The server echoes the `state`, attached with the corresponding user ID.
```json
{
  "state": {
    "user_id": "2eed7a98-9f12-4d26-ad0f-a1f009b8e15b",
    "active_group_id": null,
    "is_typing": false
  }
}
```

### Pop View Counts Event
A short period of time after the client views 1 or more posts, it sends a `view_counts` object.

Each key in the object represents a content ID, a.k.a. a post (or pop), with a view count value.

**Technically, this can be heavily abused by sending a large value as a view count.**
```json
{
  "view_counts": {
    "F7E71599-70DF-4918-A882-DD3C1D53070E": 1,
    "8A213848-5156-4B82-88B6-294AA2D80974": 3,
    "6847ECD4-0DCA-4084-96B4-976BE22F1CB6": 1,
    "269DB696-6312-4BBE-848F-1B2B9C7A2959": 2,
    "2BD768F5-8891-4B90-9E99-311F6F88B111": 1
  }
}
```
The server responds by acknowledging the `view_counts` object it received.
```json
{ "view_counts": true }
```