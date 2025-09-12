# Project Style Guide

This project uses [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to enforce a consistent code style. All code should be formatted according to the rules defined in the `.prettierrc.json` and `eslint.config.js` files.

## Pre-commit Hook

A pre-commit hook is configured using [Husky](https://typicode.github.io/husky/) to automatically check for formatting and linting errors before each commit. If any errors are found, the commit will be aborted.

## Manual Formatting

To manually format your code, you can run the following command:

```bash
npm run format
```

This will run Prettier and automatically fix any formatting issues.

## Manual Linting

To manually check for linting errors, you can run the following command:

```bash
npm run lint
```

This will run ESLint and report any errors. Many of these errors can be fixed automatically by running:

```bash
npm run lint -- --fix
```

## VS Code Integration

It is highly recommended to install the [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions for Visual Studio Code.

Once installed, you can configure your editor to automatically format the code on save by adding the following to your `.vscode/settings.json` file:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
