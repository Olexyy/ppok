// vue.config.js
const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "..", "store"),
    assetsDir: "assets",
    lintOnSave: false,
};