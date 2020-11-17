# SpaceNav

[![Netlify Status](https://api.netlify.com/api/v1/badges/0040183c-5ca5-4fc0-bc07-7f66f0dd7815/deploy-status)](https://app.netlify.com/sites/spacenav/deploys)

Displays data about SpaceX rocket launches within a React App. Data retrieved from the [r-spaceX/SpaceX-API](https://github.com/r-spacex/SpaceX-API).

Created as final class project for ISM 4300 at the University of South Florida, Tampa.

Site is deployed to <https://spacenav.netlify.app/>.

Whenver there is new code published to the **master** branch, Netlify automatically rebuilds and updates the website.

Objectives:

- Learn how to retrieve data from an external API for React
- Learn the React framework
- Learn TypeScript
- Time Permits: Utilize a testing framework to make sure data is displayed correctly
- Time Permits: Create a GraphQL wrapper to only download the exact needed data

Task List:

- [ ] Loading screen
- [x] Show the upcoming launches
- [x] Countdown banner for the closest launch
- [ ] Show ~5 previous launches
- [x] Show carded stats for 4 rockets: Falcon, Falcon 9, Falcon Heavy, and Starship (which has yet to launch)
  - [x] Description
  - [x] Weight
  - [x] Cost
  - [x] In Service Since...
  - [x] Success rate

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![preview](./.github/preview.png)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
