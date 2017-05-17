![](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/doc/home-page.png)

Table of Contents
=================
  * [Features](#features)
  * [Installation](#installation)
  * [Git Hooks](#git-hooks)
  * [Development Flow](#development-flow)
  * [Walkthrough](#walkthrough)
     * [Directory structure](#directory-structure)
     * [Import conventions](#import-conventions)
     * [Naming conventions](#naming-conventions)
     * [Preinstalled packages](#preinstalled-packages)
     * [Application functionality](#application-functionality)
        * [Home page](#home-page)
        * [Example List page](#example-list-page)
        * [Example Add page](#example-add-page)
        * [Example Edit page](#example-edit-page)
     * [Collections](#collections)
     * [CSS](#css)
     * [Routing](#routing)
     * [Forms](#forms)
     * [Authentication](#authentication)
     * [Authorization](#authorization)
     * [Configuration](#configuration)
     * [Quality Assurance](#quality-assurance)
        * [ESLint](#eslint)

----
## Features
Opinionated-meteor-application-template is a sample Meteor 1.4 application that is created to illustrate:

  * A standard directory layout using 'imports/' as recommended in the [Meteor Guide](https://guide.meteor.com/structure.html)
  * A standard set of Meteor packages and example usage (FlowRouter, AutoForm, Accounts, and Semantic UI)
  * Simple authorization/authentication and use of settings files for initialization.
  * Simple quality assurance using [ESLint](http://eslint.org) with packages to partially enforce the [Meteor Coding Standards](https://guide.meteor.com/code-style.html) and the [AirBnB Javascript Style Guide](https://github.com/airbnb/javascript).

The goal of this template is to help you get quickly started doing Meteor development by providing a reasonable directory structure for development and deployment, a set of common extensions to the core framework, and boilerplate code to implement basic page display, navigation, and collection manipulation.

To keep this codebase simple and small, some important capabilities are intentionally excluded from this template:

Examples of the these capabilities will be provided elsewhere.

## Installation

First, [install Meteor](https://www.meteor.com/install).

Second, [create a new GitHub repository](https://help.github.com/articles/create-a-repo/), and clone it into your local workspace.

You don't need to copy the README.md or index.md files (you should write your own), and you don't need to copy the doc/ directory (it contains only screenshots displayed in this page of documentation.)

Now your local repo should contain the template. To test that everything is OK, cd into the app directory install the required libraries with:


```
$ meteor npm install
```

Once the libraries are installed, you can run the application by invoking the ["start" script in the package.json file](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/package.json#L5):

```
$ meteor npm run start
```


**Note regarding bcrypt warning.** You will get the following message when you run this application:

```
Note: you are using a pure-JavaScript implementation of bcrypt.
While this implementation will work correctly, it is known to be
approximately three times slower than the native implementation.
In order to use the native implementation instead, run

  meteor npm install --save bcrypt

in the root directory of your application.
```

On some operating systems (particularly Windows), installing bcrypt is much more difficult than implied by the above message. Bcrypt is only used in Meteor for password checking, so the performance implications are negligible until your site has very high traffic. You can safely ignore this warning without any problems.

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000).  You can login using the credentials in [settings.development.json](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/config/settings.development.json), or else register a new account.

Lastly, you can run ESLint over the code in the imports/ directory with:

```
meteor npm run lint
```

## Git Hooks

This project is configured to use githooks on commit and push to ensure you are running `lint` and `test` prior to pushing to your source control.

## Development Flow

It is recommended to run `meteor npm run start-dev` while developing to enable the `debug` package that's being utilized. In the browser, you can open the development console and type `localStorage.debug = '*'` to enable client side debugging. See [imports/startup/server/accounts.js](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/imports/startup/server/accounts.js#7) for an example of how to use the debug package.

When developing a module by itself that can be unit tested (on the server side), run with `meteor npm run server-test-watch` as this will re-run tests on every change.

## Walkthrough

The following sections describe the major features of this template.

### Directory structure

The top-level directory structure is:

```
app/        # holds the Meteor application sources
config/     # holds configuration files, such as settings.development.json
doc/        # holds developer documentation, user guides, etc.
.gitignore  # don't commit IntelliJ project files, node_modules, and settings.production.json
```

This structure separates documentation files (such as screenshots) and configuration files (such as the settings files) from the actual Meteor application.

The app/ directory has this structure:

```
client/
  lib/           # holds Semantic-UI files.
  head.html      # the <head>
  main.js        # import all the client-side html and js files.

imports/
  api/           # Define collection processing code (client + server side)
  startup/       # Define code to run when system starts up (client-only, server-only, both)
    both/
    client/
    server/
  ui/
    layouts/     # Layouts contain common elements to all pages (i.e. footer)
    pages/       # Pages are navigated to by FlowRouter routes.

node_modules/    # managed by Meteor

packages/        # Contains application specific packages

public/          # static assets (like images) can go here.

server/
   publications/ # contains server side publications
   main.js       # import all the server-side js files.
   security.js   # import all collection security settings for insert/update
```

### Import conventions

This system adheres to the Meteor 1.4 guideline of putting all application code in the imports/ directory, and using client/main.js and server/main.js to import the code appropriate for the client and server in an appropriate order.

This system accomplishes client and server-side importing in a different manner than most Meteor sample applications. In this system, every imports/ subdirectory containing any Javascript or HTML files has a top-level index.js file that is responsible for importing all files in its associated directory.   

Then, client/main.js and server/main.js are responsible for importing all the directories containing code they need. For example, here is the contents of client/main.js:

```
import '/imports/startup/client';
import '/imports/startup/both';
import '/imports/api/example';
import '/imports/ui/layouts';
import '/imports/ui/pages';
```

Lines all invoke the index.js file in the specified directory.

We use this approach to make it more simple to understand what code is loaded and in what order, and to simplify debugging when some code or templates do not appear to be loaded.  In our approach, there are only two places to look for top-level imports: the main.js files in client/ and server/, and the index.js files in import subdirectories.

Note that this two-level import structure ensures that all code and templates are loaded, but does not ensure that the symbols needed in a given file are accessible.  So, for example, a symbol bound to a collection still needs to be imported into any file that references it. For example, a server startup file needs to reference the symbol "ExampleCollection" in order to initialize the collection, so it must import the symbol ExampleCollection:

```
import { ExampleCollection } from '/imports/api/example/example.js';
import { _ } from 'meteor/underscore';

const seeds = [
  { name: 'Basket', quantity: 3 },
  { name: 'Bicycle', quantity: 2 },
];

if (ExampleCollection.find().count() === 0) {
  seeds.forEach(e => ExampleCollection.insert(e));
}
```

This strategy is not ideal for all application scenarios, but for those just starting to get comfortable with importing in Javascript, it should reduce confusion and import-related bugs.

### Naming conventions

This system adopts the following naming conventions:

  * Files and directories are named in all lowercase, with words separated by hyphens. Example: accounts-config.js
  * "Global" Javascript variables (such as collections) are capitalized. Example: ExampleCollection.
  * Most Javascript variables are camel-case. Example: dataLoading. Exception with global pages. Example: EXAMPLE_LIST_HELPERS
  * Templates representing pages are in all caps, with words separated by underscores. Example: EXAMPLE_LIST.
  * Routes to pages are named the same as their corresponding page. Example: EXAMPLE_LIST.

### Preinstalled packages

In a nutshell, meteor-application-template includes support for:

  * Forms (autoform, collection2, check, autoform-semantic-ui )
  * Accounts (accounts-ui, accounts-password and useraccounts:semantic-ui)
  * Routing (flow-router, flow-router-helpers, active-route)
  * Presentation (semantic-ui, spin)
  * Security (ongoworks:security, alanning:roles)
  * Packages specific to this project (justinr1234:lib, justinr1234:golgi, justinr1234:menu)

### Application functionality

The application implements a simple CRUD application for managing "Example", which is a Mongo Collection consisting of a name (String) and a quantity (Number). There are four pages, each implemented by a template in the imports/ui/pages directory of the justinr1234:example package.

#### Home page

Implemented by the HOME_PAGE template.

![](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/doc/home-page.png)
![](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/doc/home-page-expand.png)
![](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/doc/mobile.png)
![](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/doc/mobile-expand.png)

You must login to access any page other than the Home page.

#### Example List page

You must login to see the contents of the ExampleCollection collection. You may only see your own Example items.

![](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/doc/list-page.png)

#### Example Add page

You must login to add new documents to the ExampleCollection collection. Added items are owned by the user that adds them. You may not see other peoples' items.

![](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/doc/add-page.png)

#### Example Edit page

You must login to add edit documents in the ExampleCollection collection.

![](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/doc/edit-page.png)


### Collections

The application implements a single Collection called "ExampleCollection". Each ExampleCollection document has two fields: a String "name" and a Number "quantity".

The ExampleCollection collection is defined in [imports/api/example/example.js](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/packages/justinr1234-example/imports/api/example/example.js) of the justinr1234:example package.

The ExampleCollection collection is initialized in [imports/startup/server/example.js](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/packages/justinr1234-example/imports/startup/server/example.js) of the justinr1234:example package.

### CSS

The application uses [Semantic UI](http://semantic-ui.com/), and installs one Meteor packages: `fabienb4:autoform-semantic-ui`.

The Semantic UI theme files are located in [app/client/lib/semantic-ui](https://github.com/justinr1234/opinionated-meteor-application-template/tree/master/client/lib/semantic-ui) directory.

Because the application implements a menu fixed to the top of the screen (via the justinr1234:golgi package), the [client/lib/semantic-ui/site/globals/site.overrides.import.less](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/client/lib/semantic-ui/site/globals/site.overrides.import.less) file adds 70px of padding to the body. Other page templates add additional padding to improve the look. All modifications exist in the /site/ directory of Semantic UI except a few that live in the [https://github.com/justinr1234/justinr1234-golgi/blob/master/client/lib/](justinr1234:golgi) package.

To learn more about the Semantic UI theme, see [Semantic-UI-Meteor](https://github.com/Semantic-Org/Semantic-UI-Meteor).

### Routing

For display and navigation among its four pages, the application uses [Flow Router](https://github.com/kadirahq/flow-router).

Routing is defined in [imports/startup/client/router.js](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/imports/startup/client/router.js) which calls out to a more robust mapper that defines the actual routes in [imports/api/helpers/both/routes/routes.js](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/imports/api/helpers/both/routes/routes.js) in addition to several global routes defined automatically in the [justinr1234:lib](https://github.com/justinr1234/justinr1234-lib/blob/master/imports/routes.js) package.

### Forms

To implement the Example Add and Example Edit pages, the application uses [AutoForm](https://github.com/aldeed/meteor-autoform).

See the [justinr1234:example](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/packages/justinr1234-example) package: [imports/ui/pages/example/example-add.html](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/packages/justinr1234-example/imports/ui/pages/example/example-add.html) and [imports/ui/pages/example/example-edit.html](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/packages/justinr1234-example/imports/ui/pages/example/example-edit.html).

### Authentication

For authentication, the application uses the Meteor accounts-ui package, with some simple customization in the [justinr1234:lib](https://github.com/justinr1234/justinr1234-lib/blob/master/imports/startup/both/accounts-config.js) package.

When the application is run for the first time, a settings file (such as [config/settings.development.json](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/config/settings.development.json)) should be passed to Meteor. That will lead to a default account being created through the code in [imports/startup/server/accounts.js](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/imports/startup/server/accounts.js).

The application allows users to register and create new accounts at any time.

### Authorization

Only logged in users can manipulate `ExampleCollection` documents. You can only edit and view documents owned by the currently logged in user.

To prevent users who are not logged in from accessing pages that manipulate `ExampleCollection` instances, template-based authorization is used following the recommendations in [Implementing Auth Logic and Permissions](https://kadira.io/academy/meteor-routing-guide/content/implementing-auth-logic-and-permissions).

The application implements template-based authorization using an If_Logged_In template, defined in [imports/ui/layouts/if-logged-in.html](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/imports/ui/layouts/if-logged-in.html) and [imports/ui/layouts/if-logged-in.js](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/imports/ui/layouts/if-logged-in.js).

### Configuration

The [config](https://github.com/justinr1234/opinionated-meteor-application-template/tree/master/config) directory is intended to hold settings files.  The repository contains one file: [config/settings.development.json](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/config/settings.development.json).

The [.gitignore](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/.gitignore) file prevents a file named settings.production.json from being committed to the repository. So, if you are deploying the application, you can put settings in a file named settings.production.json and it will not be committed.

Additionally external `justinr1234:` packages (`justinr1234:lib`, `justinr1234:golgi`, `justinr1234:menu`) are put in the `.gitignore` as well. This allows you to develop and make changes to these packages locally without accidentally commiting them since they live in different repositories.

For example, if you wanted to develop changes to the `justinr1234:golgi` menu:

1. From the directory that you have `opinionated-meteor-application-template`, clone the `justinr1234:golgi` repo into your packages directory: `git clone https://github.com/justinr1234/justinr1234-golgi.git ./packages/justinr1234-golgi`
2. Make your changes to `justinr1234:golgi`
3. Meteor will build using this package over the remote one pulled from Atmosphere
4. `cd ./packages/justinr1234-golgi && git add . && git commit -m "Made some changes" && git push origin HEAD` (requires `origin` remote to point to your fork of `justinr1234:golgi` on Github). Then create a PR to `justinr1234:golgi`!

### Quality Assurance

#### ESLint

The application includes a [.eslintrc](https://github.com/justinr1234/opinionated-meteor-application-template/blob/master/.eslintrc) file to define the coding style adhered to in this application. You can invoke ESLint from the command line as follows:

```
[~/opinionated-meteor-application-template]-> meteor npm run lint

> opinionated-meteor-application-template@ lint /Users/justin/opinionated-meteor-application-template
> eslint --quiet ./imports
```

ESLint should run without generating any errors.  

It's significantly easier to do development with ESLint integrated directly into your IDE (such as IntelliJ).
