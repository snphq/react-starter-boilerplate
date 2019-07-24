## Getting Started

**1. You can start by cloning the repository on your local machine by running:**

```bash
git clone https://github.com/snphq/react-starter-boilerplate
cd react-starter-boilerplate
```

**2. Install all of the dependencies:**

```bash
yarn
```

**3. Start to run it:**

```bash
yarn start
```

Now the app should be running at [http://localhost:5000/](http://localhost:5000/)


## NPM Main Script Commands

`yarn <script>`|Description
------------------|-----------
`start`|Run your app on the development server at `localhost:5000`. HMR will be enabled.
`start:production`|Bundle files to `./public/assets` and run it on the production server with production environment at `localhost:8080`.
`start:staging`|Bundle files to `./public/assets` and run it on the staging server with staging environment at `localhost:8080`.
`build:production`|Remove the previous bundled production files and bundle it to `./public/assets`.
`build:staging`|Remove the previous bundled staging files and bundle it to `./public/assets`.
`lint`|Lint all `.js` and `.scss` files.
`lint:js`|Lint all `.js` files.
`lint:style`|Lint all `.scss` files.
`clean:build`|Remove the `./public/assets` folder to clean the client bundled files.
