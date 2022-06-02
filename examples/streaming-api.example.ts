/*
    Written by Max Rodriguez
    Using the Poparazzi streaming API to upload a new pop view count.
    (first run `yarn build` to compile the package)
*/
import * as Poparazzi from '../';

;(async () => {
    const client = new Poparazzi.Client({ interactive_login: true });

    // Set event callback for when we connect to the streaming API
    client.set_event({ websocket_connect: async () => {
        console.log("Connected to the Streaming API!");
    }});

    // Set event callback for when we authenticate the websocket connection.
    client.set_event({ websocket_authorized: async () => {
        console.log("Stream authenticated!")
    }});

    client.set_event({ login_success: async () => {
        console.log(`Logged into Poparazzi!`);

        // Connect and authenticate to the Poparazzi streaming API
        const status = await client.connect_streaming_api({ auth: true });
    }});

    client.set_event({ login_failure: async () => {
        console.error(`Login failed; Please try again.`);
    }});

    client.set_event({ logout: async () => {
        console.log("Logged out of Poparazzi.");
    }});
})();
