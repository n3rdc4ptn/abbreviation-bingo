# Abbreviation Bingo

This is a simple game to help you learn abbreviations. It's a work in progress.

## How to use
Create a csv with the following structure:

```csv
abbr;longForm;description
HDMI;High-Definition Multimedia Interface;An interface for transmitting uncompressed video and audio data
...
```

Then upload the csv on the website.

## Important note
The website is completely running in the browser and does not send any data to the server. The csv is loaded in your browser localstorage and kept there. If you reload the website, the data is loaded from the localstorage so you dont need to reupload your csv every time.


Currently the game state data is not kept in localstorage, so a reload restarts the game.
