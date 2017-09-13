# Loopback-angular-userauth-startup project

A default loopback-angular startup project with userauthentication already in place.

Userauth views are written in angular(1.4.0) which use a lb generated angular service. Client project was scafolded using `yo angular`.

Project is to be forked and developed further as whatever site you want.

# Installation
* in root folder:
`npm install`
* in client folder:
`npm install` & `bower install`

# Running & Building
## Config Loopback Email Settings
Change Email SMTP stuff in `server/datasources.json` to an smtp server you can use:
```javascript
"mail": {
    "name": "mail",
    "connector": "mail",
    "transports": [
      {
        "type": "SMTP",
        "host": "smtp.gmail.com",
        "secure": true,
        "port": 465,
        "auth": {
          "user": "your@email.com",
          "pass": "GOD"
        }
      }
    ]
  }
```
[How to use google SMTP server?](https://www.digitalocean.com/community/tutorials/how-to-use-google-s-smtp-server)


Change initial created user in `server/boot/my-boot-script.js` to an email you own.
```javascript
User.create({email: 'your@email.com', password: 'GOD', emailVerified:true}, function(err, userInstance) {
    //...
  });
```

## Run Loopback
* in root folder: `node .`

## Run Angular Client
* in client folder: `grunt serve`

## Build Angular Client
* in client folder: `grunt build`