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

    // Declare variables for objects returned by the client
    let session: Poparazzi.Responses.Session | null;
    let device_token: Poparazzi.Responses.AppleDeviceToken | null;
    let login_status: Poparazzi.CREDENTIAL_STATUS;

    /*
    Use `set_event()` to assign callback functions to client events.
    See the docs for the `CLIENT_EVENTS` interface.
    */
    client.set_event({ login_success: async () => {

        session = client.get_session(); // Get updated session with user relationship
        console.log(`Poparazzi login success!`);

        // Logout from poparazzi
        device_token = await client.end_session();
    }});

    client.set_event({ login_failure: async () => {
        console.error(`Login failure event triggered.`);
    }});

    client.set_event({ logout: async () => {
        console.log("Logged out of Poparazzi.");
    }});

    // Create a new Poparazzi session & generate a device token
    session = await client.create_session();
    device_token = await client.generate_device_token();

    // The first step to link your session to a Poparazzi account is to verify your phone number.
    login_status = await client.submit_phone_number();

    /*
    For ease of use in this example, the code below prompts for user input.
    You can use the `submit_verification_code(code)` method in any way that fits your needs.
    */
    const prompt = readline.createInterface({input: process.stdin, output: process.stdout});

    prompt.question("SMS 6-digit pin: ", (code: string) => {
        prompt.close();
        (async () => {
            // To complete your login, submit the verification code you received via text message.
            login_status = await client.submit_verification_code(code);
        })();
    });
})();
