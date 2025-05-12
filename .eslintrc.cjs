// .eslintrc.cjs
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"], // ← uses your TS config
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-typescript", // Airbnb’s TS rules
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // runs prettier as an ESLint rule
  ],
  rules: {
    // your overrides, e.g.:
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "@typescript-eslint/explicit-function-return-type": "off",
    // …
  },
};
