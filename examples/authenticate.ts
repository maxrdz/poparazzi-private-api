/*
    Written by Max Rodriguez
    Authenticating using the Poparazzi Client
    (first run `yarn build` to compile the package)
*/
import * as Poparazzi from '../';
import * as readline from 'node:readline';

let mobile_phone = "";
let verification_code = "";

console.log("Log in to your Poparazzi account.\n");
console.log("Please enter your phone number.");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("(Example: +12124797990): ", (input: string) => {
    mobile_phone = input;
    rl.close();

    ;(async () => {
        const client = new Poparazzi.Client({ phone_number: `${mobile_phone}` });
        const session = await client.create_session();
        console.log(session);
    })();
});