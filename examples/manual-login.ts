/*
    Written by Max Rodriguez
    Authenticating using the Poparazzi Client
    (first run `yarn build` to compile the package)
*/
import * as Poparazzi from '../';
import * as readline from "node:readline";

;(async () => {
    // Initialize the client (enter your phone number)
    const client = new Poparazzi.Client({ phone_number: "+10000000000" });

    // Create a new Poparazzi session and generate a device token (required by API)
    let session = await client.create_session();
    let device_token = await client.generate_device_token();

    // The first step to link your session to a Poparazzi account is to verify your phone number.
    session = await client.submit_phone_number();

    /*
    For simple testing purposes, the code below prompts for user input.
    You can use the `submit_verification_code(code)` method in any way that fits your needs.
    */
    let pin = "";
    const prompt = readline.createInterface({input: process.stdin, output: process.stdout});
    prompt.question("SMS 6-digit pin: ", (x: string) => {prompt.close(); (async () => {pin = x})();});

    // To complete your login, submit the verification code you received via text message.
    session = await client.submit_verification_code(pin);

    /*
    Use `set_event()` to assign callbacks to client events.
    See the docs for all available client events, or import the `CLIENT_EVENTS` interface.
    */
    client.set_event({ login_success: async () => {
        const session = client.get_session(); // Get updated session with user relationship
        console.log(`Login success event triggered: \n ${session}`);

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
