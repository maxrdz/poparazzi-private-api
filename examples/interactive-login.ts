/*
    Written by Max Rodriguez
    Authenticating using the Poparazzi Client interactive prompt option
    (first run `yarn build` to compile the package)
*/
import * as Poparazzi from '../';

;(async () => {
    const client = new Poparazzi.Client({ interactive_login: true });

    client.set_event({ login_success: () => {
        const session = client.get_session();
        console.log(session);
    }});
})();
