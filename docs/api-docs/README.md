# API Endpoint Documentation Format
```
Please use this template for every API endpoint documented.
```

# https://poparazzi.com/api/______/
## HTTP Methods - `GET`, `POST`, `PATCH`
## Payload / Response Type - [`ResponseObject`]()

--------------------------------------------

### Description
Short description or summary of what the endpoint is used for.

### `GET` Response Example
Usually just the response object in JSON format. Leave any notes here.
```json
{
  "data": {
    "type": "",
    "attributes": {}
}
```

### `POST` Payload Example
Summary of the method's common use in the client.
```json
{
  "data": {
    "type": "",
    "attributes": {}
  }
}
```

### `PATCH` Payload Example
Summary of the method's common use in the client.

Maybe uses an extended url. E.g. `poparazzi.com/api/<endpoint>/<id>`
```json
{
  "data": {
    "type": "",
    "attributes": {}
  }
}
```

### Query Options

- `?query[ <key> ]= <value>` - Description of what the query does & returns.
  - ```json
    {
      "data": {}
    }
    ```