# gMail sender
Simple utility for sending a message to many people using gMail credentials.

## Usage
First run `npm install` to download dependencies.

Then add a `config.js` file with the following format:
```javascript
module.exports = {
  user: 'username',
  password: 'password'
}
```

Then edit the included `messages.txt` file for your own message, and put your users in `people.js`.

To start sending mails, run:
```SHELL
node ./send.js
```
