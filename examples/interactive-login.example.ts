/*
    Written by Max Rodriguez
    Authenticating using the Poparazzi Client interactive prompt option
    (first run `yarn build` to compile the package)

    Although this is an unusual feature for a library, I implemented this because
    Poparazzi accounts are authenticated using a phone number and an SMS pin.
*/
import * as Poparazzi from '../';

;(async () => {
    const client = new Poparazzi.Client({ interactive_login: true });

    // Declare variables for objects returned by the client
    let session: Poparazzi.Responses.Session | null;
    let device_token: Poparazzi.Responses.AppleDeviceToken | null;

    // The code below sets callback events.
    // The client will call these functions when their event is triggered.

    client.set_event({ login_success: async () => {
        console.log(`Logged into Poparazzi!`);

        session = client.get_session();
        device_token = client.get_device_token();

        // Logout from poparazzi
        device_token = await client.end_session();
    }});

    client.set_event({ login_failure: async () => {
        console.error(`Login failure event triggered.`);
    }});

    client.set_event({ logout: async () => {
        console.log("Logged out of Poparazzi.");
    }});
})();
