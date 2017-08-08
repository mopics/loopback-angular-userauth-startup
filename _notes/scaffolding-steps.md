# Scaffolding steps used to boot-up this project:

## Loopback install

1. surfed to project-root
2. typed `lb`
    1. default name ( name of project folder )
    2. Loopback v.3
    3. app with user-auth
3. `npm install i18n --save`
    * installs i18n support for express.

## Yo angular
1. Renamed loopback-generated yeoman-file : `.yo-rc.json` => `.yooooo-rc.json`
    * So `yeoman` does not install angular in root of project.
2. surfed to `client` folder
3. typed `yo angular`
    * Gulp instead of Grunt : `No`
    * Sass with Compass : `Yes`
    * Bootstrap : `No`
    * Default angular modules included
    * Overwrite README.md : `Yes`
    * Overwrite pacakge.js : `Yes`

## Git
1. surf to root folder
2. `git init`
    * `git add .`
    * `git commit -m "first commit"`
3. Create repo on github.com
    * No Readme.md!
    * Copy git-url
4. `git remote add origin <git-url>`
5. `git push -u origin master`

        

