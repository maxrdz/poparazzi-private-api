<img src="https://user-images.githubusercontent.com/33995146/169403681-6f3abfb0-10f4-4c2c-9ef4-fe7704142b58.jpg" alt="Logo is a registered trademark reserved by TTYL Inc. Poparazzi" align="right" width="55%"/>

# poparazzi-private-api

![](https://img.shields.io/discord/981056143600267285?color=blue&label=Discord&logo=Discord&logoColor=white) ![](https://img.shields.io/github/last-commit/Max-Rodriguez/poparazzi-private-api) ![](https://img.shields.io/github/issues/Max-Rodriguez/poparazzi-private-api) ![](https://img.shields.io/github/license/Max-Rodriguez/poparazzi-private-api)

### An open source implementation of the Poparazzi Web API, written in TypeScript.
<br>

# Installation
Installing using _NPM_
```
npm install poparazzi-private-api
```
Installing using _Yarn_
```
yarn add poparazzi-private-api
```

# Getting Started
Take a look at examples for using the package [here.](examples/)

Below is the simplest and fastest way to authenticate to Poparazzi using the package.
```typescript
import * as Poparazzi from 'poparazzi-private-api';

;(async () => {
    // Run the built-in quick login console prompt
    const client = new Poparazzi.Client({ interactive_login: true });

    client.set_event({ login_success: async () => {
        console.log(`Logged into Poparazzi!`);

        let session = client.get_session();
        let device_token = client.get_device_token();

        device_token = await client.end_session(); // Logout
    }});

    client.set_event({ logout: async () => {
        console.log("Logged out of Poparazzi.");
    }});
})();
```

# Contributing
If you would like to implement a new feature or fix a bug, feel free to create a pull request!

API and SDK documentation also make very useful contributions, so if you are good at - please do so!

Before starting on your own contribution, please read [the contributor guidelines](CONTRIBUTING.md)!

<br>

```
Released under the Apache-2.0 license. Copyright (c) 2022 Max Rodriguez
```
