# Updating the Committee Page

The committee page is driven entirely by a single JSON file. No code changes are needed to add or update committee members.

## Data file

`src/services/committee.json`

## Structure

```jsonc
{
  "title": "...",
  "default_bio": "Fallback bio when a member's bio is empty.",
  "default_photo": "/assets/img/committee/default.jpg",
  "committee_years": [
    {
      "year": "22-23",            // displayed as the year heading
      "committee": [
        {
          "name": "Jane Doe",
          "position": "Auditor",
          "bio": "",              // leave empty to use default_bio
          "photo": "",            // leave empty to use default_photo
          "social_links": [
            { "bx bxl-github": "https://github.com/janedoe" },
            { "bx bxl-linkedin": "https://linkedin.com/in/janedoe" },
            { "bx bx-link": "https://janedoe.dev" }
          ]
        }
      ]
    }
  ]
}
```

## Adding a new year

1. Open `src/services/committee.json`.
2. Add a **new object at the top** of the `committee_years` array (newest year first).
3. Fill in the `year` string (e.g. `"24-25"`).
4. Add each committee member to the `committee` array.

The page automatically picks up the new year — no route or component changes needed.

## Member fields

| Field          | Required | Notes |
|----------------|----------|-------|
| `name`         | Yes      | Full name as displayed. |
| `position`     | Yes      | Role title (e.g. "Auditor", "System Administrator"). |
| `bio`          | No       | Leave `""` to fall back to `default_bio`. |
| `photo`        | No       | Public-style path (e.g. `/assets/img/committee/2024-25/janedoe.jpg`), resolved to the built asset — see [Photos](#photos). Leave `""` for the default photo. |
| `social_links` | No       | Array of `{ "icon_key": "url" }` objects. Can be empty `[]`. |

## Photos

- Place photos in `src/assets/img/committee/<year>/` (e.g. `src/assets/img/committee/2024-25/`).
- Use lowercase, no spaces in filenames (e.g. `janedoe.jpg`).
- Photos are displayed at 96px/112px circles — square images with a face centred work best.
- Drop in whatever you have (`.jpg`, `.jpeg`, `.png` or `.webp`) at whatever
  size. The build converts every photo to WebP, caps it at 256px and gives it a
  content-hashed filename so browsers can cache it forever. Do not hand-optimise
  them first.
- In `committee.json`, keep writing the path as if the file still lived in
  `public/` — `/assets/img/committee/2024-25/janedoe.jpg`, including the original
  extension. `resolvePhoto()` in `src/services/committee.ts` maps that string to
  the processed asset URL at build time.
- A photo path with no matching file is passed through unchanged, so a typo
  shows up as a broken image rather than a build failure.

## Social link icons

The icon key is matched by substring. Supported keywords:

| Key contains | Icon shown |
|--------------|------------|
| `github`     | GitHub     |
| `linkedin`   | LinkedIn   |
| `link`, `website`, `globe` | Generic link |

Example: `{ "bx bxl-github": "https://github.com/user" }` — the prefix `bx bxl-` is stripped, then `github` is matched.

## How it works

- `src/services/committee.ts` imports the JSON and exports typed data.
- `src/routes/(menu)/committee.tsx` renders the page with year filtering.
- `NumberOfCommitteeMembers` (used on the home infographic) is derived from the **first** entry in `committee_years`, so keep the current year first.
