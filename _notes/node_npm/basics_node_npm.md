# Basics of Node.js and NPM
# `npm init`
creates a package.json

# `npm install <pacakge_name> --save-dev`
* Install node package and writes it as an development-dependency in `package.json`
* short: `npm i -D <pck_nm>`

# `npm <script_name>`
Starts scripts defined in `package.json`
```javascript
// from package.json
"scripts": {
    "test": "karma start test\\karma.conf.js"
  },
```
`npm test` starts : `karma start test\\karma.conf.js`


