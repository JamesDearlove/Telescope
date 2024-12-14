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

To start the local development server, run `npm run dev`. The app will then be hosted at `localhost:5173`

### Building

To build the app, run `npm run build`. By default the `dist` folder output produces an output that can be run as a static web app or run unpackaged in a Chromium browser.

> [!NOTE]
> Thanks to [this Chromium bug](https://issues.chromium.org/issues/41418973), the manifest is not identical between Firefox and Chromium extensions. To build with additional settings for Firefox ensure you define the `FIREFOX_BUILD` env variable. This can be done as so: `FIREFOX_BUILD=1 npm run build`

## Contributing

Thank you for considering to contribute to the project! Any suggestions, bug reports, bug fixes, and improvements are welcome.

If you are considering adding a service or wanting to make a significant change, please open an issue first to discuss it.

## License

Telescope is licensed under the [MIT License](LICENSE.txt).
