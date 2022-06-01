## Create keys

> Move to /middlewares folder and type the next scripts in order to create the RSA-256 keys

```
ssh-keygen -t rsa -b 4096 -m PEM -f private.key
# Don't add passphrase
openssl rsa -in private.key -pubout -outform PEM -out private.key.pub
```

**IMPORTANT**

You must have these keys to sign, verify and decode JSON Web tokens generated in the project.

## Create data for database

> If you're running the project in local, you have to know that requires data. Don't worry for that, just make sure about has access to mongo/mongosh in your terminal without password.

You have able a script ``seed:init`` in package.json file. This can fill the database. You can run it ``npm run seed:init`` or ``yarn seed:init``

Or if you prefer, use the demo backend on URL HERE

