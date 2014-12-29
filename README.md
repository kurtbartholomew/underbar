# Underscore Redux
This test suite was created for the purpose of helping others master functional programming fundamentals by reconstructing one of the more ubiquitous utility libraries in Javascript: [Underscore](https://underscorejs.org/).

# How to start

The main crux of this repo is two files, `src/underscoreredux.js` and `SpecRunner.html`.

Simply open `src/underscoreredux.js` and start working on the implementation for `_.identity`.

To check if your implementation is correct (since you'll be using previous functions in later ones), open up `SpecRunner.html` in a browser or simple http server. You'll see whether your implementations pass tests for that function. If it does, congrats! You can move on to the next function. If not, retool your implementation and reload the page.

## Additional Notes
If you'd like to have the page automatically reload on changes, you could try using [Browsersync](https://www.browsersync.io/). 

After installing, just run `browser-sync start --server --files "**/*.(css|html|js)` in this directory and then open to the address mentioned by the program on startup.