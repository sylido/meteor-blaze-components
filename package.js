Package.describe({
  name    : "sylido:blaze-components",
  summary : "Reusable components for Blaze",
  version : "0.24.0",
  git     : "https://github.com/sylido/meteor-blaze-components.git"
});

// Based on meteor/packages/templating/package.js.
Package.registerBuildPlugin({
  name : "compileBlazeComponentsTemplatesBatch",
  use  : [
    "caching-html-compiler",
    "ecmascript@0.16.10",
    "templating-tools",
    "spacebars-compiler",
    "html-tools"
  ],
  sources: [
    "patch-compiling.js",
    "compile-templates.js"
  ]
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@3.2.2");

  // Core dependencies.
  api.use([
    "blaze@3.0.2",
    "coffeescript@2.4.1",
    "underscore@1.6.4",
    "tracker@1.3.4",
    "reactive-var@1.0.13",
    "ejson@1.1.4",
    "spacebars@2.0.0",
    "jquery@3.0.2"
  ]);

  // If templating package is among dependencies, we want it to be loaded before
  // us to not override our augmented functions. But we cannot make a real dependency
  // because of a plugin conflict (both us and templating are registering a *.html plugin).
  api.use([
    "templating@1.4.4"
  ], { weak : true });

  api.imply([
    "meteor",
    "blaze",
    "spacebars"
  ]);

  api.use("isobuild:compiler-plugin@1.0.0");

  // Internal dependencies.
  api.use([
    "sylido:base-component@0.17.1"
  ]);

  // 3rd party dependencies.
  api.use([
    "sylido:assert@0.3.0",
    "sylido:reactive-field@0.6.0",
    "sylido:computed-field@0.10.0",
    "sylido:data-lookup@0.3.0"
  ]);

  api.export("Template");
  api.export("BlazeComponent");
  // TODO: Move to a separate package. Possibly one with debugOnly set to true.
  api.export("BlazeComponentDebug");

  api.addFiles([
    "template.coffee",
    "compatibility/templating.js",
    "compatibility/dynamic.html",
    "compatibility/dynamic.js",
    "compatibility/lookup.js",
    "compatibility/attrs.js",
    "compatibility/materializer.js",
    "lib.coffee",
    "debug.coffee"
  ]);

  api.addFiles([
    "client.coffee"
  ], "client");

  api.addFiles([
    "server.coffee"
  ], "server");
});

Package.onTest(function (api) {
  api.versionsFrom("METEOR@3.2.2");

  // Core dependencies.
  api.use([
    "coffeescript@2.4.1",
    "jquery@3.0.2",
    "reactive-var@1.0.13",
    "underscore@1.6.4",
    "tracker@1.3.4",
    "ejson@1.1.4",
    "random"
  ]);

  // Internal dependencies.
  api.use([
    "peerlibrary:blaze-components"
  ]);

  // 3rd party dependencies.
  api.use([
    "peerlibrary:classy-test@0.4.0",
    "peerlibrary:reactive-field@0.6.0",
    "peerlibrary:assert@0.3.0"
  ]);

  api.addFiles([
    "tests/tests.html",
    "tests/tests.coffee",
    "tests/tests.js",
    "tests/tests.es2015.js",
    "tests/tests.css"
   ]);
});
