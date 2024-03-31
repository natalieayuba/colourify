# Colourify

Colourify is a web application that generates a color palette from the album art of your top albums on Spotify. Inspired by [Receiptify](https://github.com/michellexliu/receiptify) and [Spotify Profile](https://github.com/bchiang7/spotify-profile).

Main technologies:

- [Create React App](https://create-react-app.dev/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Tailwind](https://tailwindcss.com/)
- [Color Thief](https://lokeshdhakar.com/projects/color-thief/)

## Installation

Clone or download this repository by clicking the green `<> Code` button above. Then, open the folder in Visual Studio or your preferred IDE or terminal.

This app runs on Node.js. On [its website](http://www.nodejs.org/download/) you can find instructions on how to install it.

Install the app's dependencies by running:

```bash
npm install
```

## Using your own credentials

You will need to register your app and get your own credentials from the [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard).

- Create a new app in the dashboard and add `http://localhost:8888/callback` to the app's redirect URL list.
- Once you have created your app, rename the `.env.example` file in your app to `.env`, and update the `CLIENT_ID` and `CLIENT_SECRET` variables with the credentials obtained from the app settings in the dashboard.

## Running the application

From a terminal:

```bash
npm run dev
```

Then, open `http://localhost:8888` in a browser.
