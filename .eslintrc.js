module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "parser":"babel-eslint", // To fix "unexpected token" errors
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-extra-semi":"error",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
    }
}
