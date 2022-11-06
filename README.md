# Telescope

A new tab page focused on all the information you need right now.

Available as a [Firefox](https://addons.mozilla.org/en-US/firefox/addon/telescope) or [Chrome](https://chrome.google.com/webstore/detail/telescope-new-tab-page/jmgkadnapnlgpefplbocbfhmgphecgfi) extension, and on the web at https://telescope.jimmyd.dev

<a href="https://addons.mozilla.org/en-US/firefox/addon/telescope"><img src="/docs/firefox-badge.svg" height="48"></a>
<a href="https://chrome.google.com/webstore/detail/telescope-new-tab-page/jmgkadnapnlgpefplbocbfhmgphecgfi"><img src="/docs/chrome-badge.svg" height="48"></a>

## Rationale & Goals

I personally use [Todoist](https://todoist.com/) as my day to day to-do list application. When I'm working at my computer all day, I happen to miss tasks I've set to get done until the day is over. As any developer would, I open a lot of tabs so I felt that this page could be better utilised with a better new tab page.

The goal is to have different "telescopes" depending on what browser profile or computer I'm using. For example, my work profile has a specific background and Todoist filtering for work tasks only. For home use, I'd have one have a different background and Todoist filtering for general tasks.

Future expansion plans include integrating with other information sources and services, like the weather, news, and time tracking software like [Toggl Track](https://toggl.com/track/).

## Development

Telescope uses the [npm](https://npmjs.com/) package manager, run `npm start` to install the required dependencies.

To start the local development server, run `npm start`. By default the app will be hosted at `localhost:3000`

To build the application, run `npm build`. See below for building as an extension

### Building as an Extension

Building Telescope as a browser extension requires an additional manifest for the browser to recognise the app as an extension. 

In the [extensions](/extensions) folder, there contains specific manfiests for Chromium based browsers and Firefox. Copy either of these to the build folder and rename it to `manifest.json` in order to use with your browser of choice. Once complete, you should be able to load the extension in developer mode into your browser.

## Contributing

Thank you for considering to contribute to the project! Any suggestions, bug reports, bug fixes, and improvements are welcome.

If you are considering adding a service or wanting to make a significant change, please open an issue first to discuss it.

## License

Telescope is licensed under the [MIT License](LICENSE.txt).
