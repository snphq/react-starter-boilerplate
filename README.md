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
yarn dev
```
or
```bash
yarn dev:spa
```
Now the app should be running at [http://localhost:5000/](http://localhost:5000/)


## NPM Main Script Commands

`yarn <script>`|Description
------------------|-----------
`dev`|Run your app on the development server at `localhost:5000`. HMR will be enabled.
`dev:spa`|Run your app on the development server at `localhost:5000`. HMR will be enabled. SSR will be disabled.
`start:staging`|Bundle files to `./public` and run it on the staging server with staging environment at `localhost:8080`.
`start:production`|Bundle files to `./public` and run it on the production server with production environment at `localhost:8080`.
`start:spa:staging`|Bundle files to `./public` and run it on the production server with production environment at `localhost:8080`. SSR will be disabled.
`start:spa:production`|Bundle files to `./public` and run it on the production server with production environment at `localhost:8080`. SSR will be disabled.
`build:assets:staging`|Remove the previous bundled staging files and bundle it to `./public`.
`build:assets:production`|Remove the previous bundled production files and bundle it to `./public`.
`lint`|Lint all `.js` and `.scss` files.
`lint:js`|Lint all `.js` files.
`lint:style`|Lint all `.scss` files.
`clean:build`|Remove the `./public/assets` folder to clean the client bundled files.
