![CompSoc banner](https://compsoc.ie/assets/img/compsoc_banner_blue_black.png)

# compsoc.ie

The CompSoc website is a React single-page app. The home page shows society information and events from `https://api.compsoc.ie/v1/events/`. The committee, constitution, and CTF pages use content checked into this repository.

## Local development

Use Node.js 22 and npm. Run `npm ci`, then `npm start` for a local development server. `npm run build` creates the static site in `build/`. The current `npm test` script starts Create React App's interactive test runner; this repository has no checked-in tests.

## Delivery

Pull requests to `master` run `.github/workflows/ci.yml`, which installs dependencies and builds the app. Pushes to `master` run `.github/workflows/pages.yml`, which builds again and publishes `build/` to GitHub Pages. The Pages workflow uses Node.js 25 while CI uses Node.js 22. The old Docker production workflow is disabled and is not the current delivery path.

The `/committee`, `/constitution`, and `/ctf` routes need generated entrypoint files for direct visits on GitHub Pages. Those files are created by the Pages workflow in the local `origin/master` revision, but are absent from this checkout's workflow at `b5e1104`.
