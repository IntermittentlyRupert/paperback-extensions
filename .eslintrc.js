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
  "prefer-object-spread": "error",
  "grouped-accessor-pairs": "error",
  "no-constructor-return": "error",
  "no-floating-decimal": "error",
  "no-loop-func": "error",
  "no-useless-concat": "error",
  "radix": "error",
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

const jsRules = {
  "require-await": "error",
  "no-shadow": "error",
  "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  "import/no-named-default": "off",
};

const tsRules = {
  "no-undef": "off", // (covered by tsc)
  "@typescript-eslint/no-explicit-any": "off",
  "no-shadow": "off",
  "@typescript-eslint/no-shadow": "error",
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  "require-await": "off",
  "@typescript-eslint/require-await": "error",
  "@typescript-eslint/no-non-null-assertion": "error",
};

module.exports = {
  extends: ["eslint:recommended", "prettier"],
  plugins: ["import", "security", "promise", "@typescript-eslint"],
  env: {
    es2021: true,
    node: true,
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
        project: "./tsconfig.eslint.json",
      },
      rules: { ...baseRules, ...tsRules },
    },
    {
      files: ["**/*.js"],
      rules: { ...baseRules, ...jsRules },
    },
    {
      files: ["**/tests/**/*", "**/__tests__/**/*.js", "**/__mocks__/**/*.js"],
      env: {
        jest: true,
        jasmine: true,
      },
    },
  ],
};
