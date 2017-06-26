module.exports = {
    extends: "airbnb",
    plugins: [
        "react",
        "jsx-a11y",
        "import"
    ],
    parser: "babel-eslint",
    rules: {
      "strict": 0,
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off",
      "import/extensions": "off",

      "class-methods-use-this": "off",
      "no-continue": "off",
      "no-lonely-if": "off",
      "no-plusplus": "off",
      "no-prototype-builtins": "off",
      "no-restricted-syntax": "off",
      "no-use-before-define": "off",
      "operator-assignment": "off",
      "import/no-named-as-default": "off",
      "import/prefer-default-export": "off",
      "react/forbid-prop-types": "off",

      /**
       * We use .js for JSX files.
       */
      "react/jsx-filename-extension": "off",
      "react/no-string-refs": "off",
      "react/require-extension": "off",
      "react/sort-comp": ["error", {
        order: [
          "static-methods",
          "lifecycle",
          "/^(on|handle).+$/",
          "everything-else",
          "/^render.+$/",
          "render"
        ],
      }],
    }
};

// https://stackoverflow.com/questions/44531243/eslint-module-build-failed-error-with-eslint-config-airbnb
// airbnb config crashes with eslint 4, I made the modifications shown here https://stackoverflow.com/a/44574942
// until airbnb has made their own updates.
