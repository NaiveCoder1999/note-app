module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: "@babel/eslint-parser", // To fix "unexpected token" errors
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      // your babel options
      presets: ["@babel/preset-react"],
      babelrc: false,
      configFile: false,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["plugin:react/recommended", "prettier"],
  overrides: [],

  plugins: ["react", "react-hooks"],
  rules: {
    //"no-extra-semi": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
  },
};
