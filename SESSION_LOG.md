# Session Log

Running log of changes made to this project, session by session. Newest entries at the top.

---

## 2026-11-22

**Project setup**
- Project files located at `~/Desktop/anna-home-organization` and copied into the working directory (`~/anna-website`).
- Initialized git, created public GitHub repo [`lgoldfarb-hub/anna-home-organization`](https://github.com/lgoldfarb-hub/anna-home-organization), pushed initial commit.
- Excluded `assets/images/before-after/_originals/` (raw image backups) from git via `.gitignore` — kept locally only.

**Copy edits**
- Moving process, step 3: bolded the phrase *"So nothing unnecessary travels into your new life."* (and equivalents in RU/FR/PT) by splitting the step into `{a, b}` parts in `js/app.js` and rendering the second part in `<strong>` in `index.html`.
- "Why" section heading: split `whyTitle` into `whyTitleA` / `whyTitleB` (all 4 languages) so the heading breaks onto two lines, with *"if you want to"* (and equivalents) starting the second line.

**Before & after gallery**
- Removed slide 3 ("Kids' room" — `03-kids-bookshelf-before/after.jpg`) from the `slides` array in `js/app.js`. Gallery now has 7 slides; dots/counter auto-adjust.
- Enhanced all 15 before/after photos: gray-world auto white balance, autocontrast, brightness +6%, contrast +8%, saturation +12%, unsharp mask sharpening. Originals backed up to `assets/images/before-after/_originals/` (gitignored, local only).

**Privacy policy**
- Created standalone `privacy.html`: full GDPR-compliant privacy policy (data collected, purpose/legal basis, no third-party sharing beyond FormSubmit/Netlify as processors, retention, GDPR rights, security, contact), styled to match the site.
- Replaced the placeholder `privacyNote` text in the footer and the `#privacy` anchor in the consent checkbox with real links to `privacy.html` (opens in a new tab).

---

## How to use this log

Add a new dated section at the top for each session with meaningful changes. Keep entries terse — what changed and why, not a full diff. Skip purely exploratory sessions with no changes.
