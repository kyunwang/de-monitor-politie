# de-monitor-politie
Name needs to be decided


## Running
We use `SCSS` and `browser-sync`

For now install `browser-sync` globally using `npm`: `npm install -g browser-sync`

Run in the website map:
- browser-sync start --server --files "*.html, style/*.css, scripts/*.js"

Go to the css map and run to compile `scss`
- sass --watch master.scss:master.css
