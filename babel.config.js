module.exports = (api) => {
  api.cache(true)

  // const presets = [
  //   "babel-preset-gatsby-package"
  // ]

  const presets = [
    ["babel-preset-gatsby"],

    ["@babel/preset-env", {
      loose: true,
      modules: false,
      useBuiltIns: false,
      shippedProposals: true,
      targets: {
        browsers: [">0.25%", "not dead"],
      },
    }]
  ]

  const plugins = [
    ["babel-plugin-macros"],
    ["babel-plugin-styled-components", {
      "ssr": true,
      "displayName": true,
      "preprocess": false
    }],
    ["@babel/plugin-proposal-export-namespace-from"],
    ["@babel/plugin-proposal-optional-catch-binding"],
    ["@babel/plugin-transform-react-jsx"],
    ["@babel/plugin-transform-react-display-name"],
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-proposal-object-rest-spread"],
    ["@babel/plugin-proposal-optional-chaining"],
    ["@babel/plugin-proposal-nullish-coalescing-operator"],
    ["@babel/plugin-proposal-logical-assignment-operators"],
    ["@babel/plugin-proposal-do-expressions"],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-transform-runtime", {
       "helpers": true,
       "regenerator": true,
    }],


    // ["@babel/runtime"],
  ]

  return {
    presets,
    plugins,
  }
}
