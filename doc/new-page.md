# Creating a new page

## General

- Development is done in packages
- See `justinr1234:example` for examples of patterns

## Steps

1. Create a `package.json` specifying the name of the package at the root `<package>/package.json` - [Example](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/packages/justinr1234-example/package.json)
2. Create a `package.js` to instantiate the package - [Meteor Package.js Docs](https://docs.meteor.com/api/packagejs.html) - [Example](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/packages/justinr1234-example/package.js)
3. Create a `main.js` for the client in `<package>/client/main.js` - [Meteor Modular Package Docs](http://docs.meteor.com/packages/modules.html#Modular-package-structure) - [Example](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/packages/justinr1234-example/client/main.js)
4. Create a `main.js` for the server in `<package>/server/main.js` - [Meteor Modular Package Docs](http://docs.meteor.com/packages/modules.html#Modular-package-structure) - [Example](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/packages/justinr1234-example/server/main.js)
5. Create collections (with server defined security [ongoworks:security](https://github.com/reactioncommerce/meteor-security) and [SimpleSchema](https://github.com/aldeed/meteor-simple-schema)) in `<package>/imports/collections/` - [Example](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/packages/justinr1234-example/imports/api/collections/)
6. Create publication names (shared by client & server) in `<package>/imports/publication-names.js` - [Meteor Pub/Sub Docs](https://docs.meteor.com/api/pubsub.html) - [Meteor Data Flow Docs](https://guide.meteor.com/data-loading.html) - [Example](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/packages/justinr1234-example/imports/publication-names.js)
7. Create publications in `<package>/imports/server/publications/` - [Meteor Pub/Sub Docs](https://docs.meteor.com/api/pubsub.html) - [Meteor Data Flow Docs](https://guide.meteor.com/data-loading.html) - [Example](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/packages/justinr1234-example/server/publications/)
8. Create methods in `<package>/imports/api/methods/` (**Note** always use [SimpleSchema](https://github.com/aldeed/meteor-simple-schema) to have a [validatedMethod](https://guide.meteor.com/methods.html#validated-method)) - [Meteor Methods Docs](https://guide.meteor.com/methods.html) - [Example](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/packages/justinr1234-example/imports/api/methods/)
9. Create routes in `<package>/imports/routes.js` - [FlowRouter docs](https://github.com/kadirahq/flow-router) - [Example](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/packages/justinr1234-exaxmple/imports/routes.js)
10. Create pages in `<package>/imports/ui/pages/` - [Meteor Blaze Template Docs](http://blazejs.org/api/templates.html) - [Meteor Spacebars Template Docs](http://blazejs.org/guide/spacebars.html) - [Example](https://raw.githubusercontent.com/justinr1234/opinionated-meteor-application-template/master/packages/justinr1234-exaxmple/imports/ui/pages/)
11. Common abstracted functionality (such as global [Spacebars](http://blazejs.org/guide/spacebars.html) helpers) should be added to the [justinr1234:lib](https://github.com/justinr1234/justinr1234-lib) package
12. Add main menu items in `/public/data/nav-data.json`
