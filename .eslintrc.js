const basePlugins = ["security", "import"];

const baseExtends = [
  "eslint:recommended",
  "plugin:promise/recommended",
  "plugin:security/recommended",
  "prettier",
];

const baseRules = {
  "security/detect-object-injection": "off",
  "security/detect-non-literal-fs-filename": "off",
  "security/detect-non-literal-require": "off",
  "no-prototype-builtins": "off",
  "curly": ["error", "all"],
  "no-dupe-else-if": "error",
  "no-import-assign": "error",
  "no-setter-return": "error",
  "default-case": "error",
  "default-param-last": "error",
  "no-shadow": "error",
  "prefer-object-spread": "error",
  "grouped-accessor-pairs": "error",
  "no-constructor-return": "error",
  "no-floating-decimal": "error",
  "no-loop-func": "error",
  "no-useless-concat": "error",
  "radix": "error",
  "require-await": "error",
  "no-label-var": "error",
  "no-buffer-constructor": "error",
  "no-mixed-requires": "error",
  "func-name-matching": "error",
  "new-parens": "error",
  "no-bitwise": "error",
  "no-lonely-if": "error",
  "no-nested-ternary": "error",
  "no-var": "error",
  "prefer-const": "error",
  "object-shorthand": "error",
  "prefer-arrow-callback": "error",
  "prefer-rest-params": "error",
  "prefer-spread": "error",
  "prefer-template": "error",
  "import/named": "error",
  "import/no-unresolved": "error",
  "import/no-extraneous-dependencies": "error",
  "padding-line-between-statements": [
    "error",
    {
      blankLine: "always",
      prev: "import",
      next: "*",
    },
    {
      blankLine: "always",
      prev: "*",
      next: "import",
    },
    {
      blankLine: "any",
      prev: "import",
      next: "import",
    },
    {
      blankLine: "always",
      prev: "export",
      next: "*",
    },
    {
      blankLine: "always",
      prev: "*",
      next: "export",
    },
    {
      blankLine: "any",
      prev: "export",
      next: "export",
    },
  ],
};

module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  globals: {
    Promise: "readonly",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".d.ts", ".js"],
      },
    },
  },
  overrides: [
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: [...basePlugins, "@typescript-eslint"],
      extends: [
        ...baseExtends,
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        ...baseRules,
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
        "require-await": "off",
        "@typescript-eslint/require-await": "error",
      },
    },
    {
      files: ["**/__tests__/**/*.test.js"],
      parser: "@babel/eslint-parser",
      env: {
        jest: true,
        jasmine: true,
      },
      plugins: basePlugins,
      extends: baseExtends,
      rules: {
        ...baseRules,
        "import/no-named-default": "off",
      },
    },
  ],
};
