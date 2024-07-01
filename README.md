# vue-test-project

## Table of contents

- [Overview ](#overview)
- [Project Setup](#project-setup)
- [Folder Structure](#folder-structure)

## Overview
This project is designed to evaluate frontend technical skills and is built with Vue 3. It includes three activities:

The first activity is accessible via the "Activity 1" link in the navigation bar and serves as the homepage.
The other activities are available through their respective links in the navigation bar.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Getting Started

When running the project for the first time you will need to do the following in order for it to get up and running.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Folder structure

All app source code is placed in `src` folder.

`src` folder:

- `/assets` contains all base stylesheets

- `/components` contains all components including reusable and customised components and their test files

- `/router` contains all routes used in the project

- `/utils` contains all common/shared functionalities acroos components

- `/views` contains all views of the project

- `/App.vue` contains the root component and acts as the main entry point for the project

- `/main.ts` works as a bridge between App.vue component and the web browser
