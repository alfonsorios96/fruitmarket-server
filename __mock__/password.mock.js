const bcrypt = require('bcrypt');

const PASSWORDS = ['12345678'];

for (const pass of PASSWORDS) {
    const pass_normal = bcrypt.hash(pass, 10, null);

    pass_normal.then(result => {
        console.log(pass, ' ==> ', result);
    }).catch(e => {
        console.log('error', e);
    });
}
