/* globals Package, Npm */
Package.describe({
  name: 'justinr1234:kitchen-sink',
  version: '0.0.1',
  summary: 'justinr1234 Kitchen Sink',
  documentation: 'README.md',
  git: 'https://github.com/justinr1234/opinionated-meteor-application-template/packages/justinr1234-kitchen-sink',
});

Package.onUse(api => {
  api.versionsFrom('1.4.4.2');
  api.use('reactive-var');
  api.use('reactive-dict');
  api.use('ecmascript');
  api.use('random');
  api.use('underscore');
  api.use('mongo');

  // CLIENT LIB
  api.use('templating@1.3.2', 'client');
  api.use('kadira:flow-router@2.12.1');
  api.use('kadira:blaze-layout@2.3.0');

  // COMMON LIB
  api.use('justinr1234:lib');
  api.use('justinr1234:menu');

  // MAIN MODULES
  api.mainModule('client/main.js', 'client');
  api.mainModule('server/main.js', 'server');
});

Package.onTest(api => {
  api.use('justinr1234:kitchen-sink');
  api.use('practicalmeteor:chai');
  api.use('practicalmeteor:mocha');
  api.use('dispatch:mocha');
});
