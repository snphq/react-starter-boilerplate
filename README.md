## Getting Started

**1. You can start by cloning the repository on your local machine by running:**

```bash
git clone https://github.com/wellyshen/react-cool-starter.git
cd react-cool-starter
```

**2. Install all of the dependencies:**

```bash
yarn
```

**3. Start to run it:**

```bash
yarn start:production    # Building bundle and running production server
```

Now the app should be running at [http://localhost:8080/](http://localhost:8080/)


## NPM Script Commands

`yarn <script>`|Description
------------------|-----------
`start`|Run your app on the development server at `localhost:3000`. HMR will be enabled.
`start:production`|Bundle files to `./public/assets` and run it on the production server at `localhost:8080`.
`start:prod`|Run your app on the production server only at `localhost:8080`.
`build`|Remove the previous bundled files and bundle it to `./public/assets`.
`lint`|Lint all `.js` and `.scss` files.
`lint:js`|Lint all `.js` files.
`lint:style`|Lint all `.scss` files.
`clean:all`|Remove the client/server bundled stuff and the coverage report.
`clean:build`|Remove the `./public/assets` folder to clean the client bundled files.
