# Daily Log of development

## Day1
npm install yarn
```cmd
  npm i yarn && yarn install

  // then create dist and src folders on root directory
```
dist directory will serve as an output folder once the code has compiled to plain JS<br />
And to help compile TypeScript to JS, create tsconfig.json on root directory<br />

**install other packages**<br />
```
yarn add typescript react react-dom express cors mongoose 
// and need to install types of dependencies to help TS compiler understand the packages
yarn add -D @types/node @types/express @types/mongoose @types/cors @types/react @types/react-dom nodemon concurrently
```

**add start and build command in package.json**
```
 "scripts": {
    "build": "tsc",
    "start": "concurrently \"tsc -w\" \"nodemon dist/js/app.js\""
  }
```

**test**