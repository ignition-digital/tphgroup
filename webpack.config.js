const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Define your 'roots' variable
const ROOTS_URL = "";

// Define the pages for HtmlWebpackPlugin
const pages = [
  { name: "index", template: "./src/index.html" },
  { name: "contact", template: "./src/contact.html" },
  { name: "404", template: "./src/404.html" },
  { name: "about", template: "./src/about.html" },
  { name: "mission", template: "./src/mission.html" },
  { name: "privacy-policy", template: "./src/privacy-policy.html" },
  { name: "terms-of-condition", template: "./src/terms-of-condition.html" },
  { name: "golden-era-world", template: "./src/golden-era-world.html" },
  { name: "bright-station", template: "./src/bright-station.html" },
];

const ejs = require("ejs");

const layoutTemplate = path.resolve(__dirname, "src/components/layout.html");

const htmlPlugins = pages.map((page) => {
  const rawBodyContent = fs.readFileSync(page.template, "utf-8");

  const navbar = fs
    .readFileSync(
      path.resolve(__dirname, "src/components/navbar.html"),
      "utf-8"
    )
    .replace(/<%= roots %>/g, ROOTS_URL);

  const footer = fs
    .readFileSync(
      path.resolve(__dirname, "src/components/footer.html"),
      "utf-8"
    )
    .replace(/<%= roots %>/g, ROOTS_URL);

  const renderedHtml = ejs.render(
    fs.readFileSync(layoutTemplate, "utf-8"),
    {
      navbar,
      footer,
      main: rawBodyContent,
      roots: ROOTS_URL,
    },
    { rmWhitespace: true }
  );

  return new HtmlWebpackPlugin({
    filename: `${page.name}.html`,
    inject: false,
    templateContent: renderedHtml, // ✅ use rendered result
    minify: {
      collapseWhitespace: true,
      removeOptionalTags: false,
    },
  });
});

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "production",
  performance: {
    maxAssetSize: 2512000,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    watchFiles: ["src/**/*.html", "src/**/*.js", "src/**/*.css"],
    hot: true,
    port: 8080,
    open: true,
  },
  plugins: [
    ...htmlPlugins,
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets", to: "assets" },
        { from: "css2", to: "css2.css" },
        { from: "CNAME", to: "CNAME", toType: "file" },
        { from: "s", to: "s" },
        { from: "golfy", to: "golfy" },
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/service-worker.js", to: "service-worker.js" },
        { from: "src/robot.txt", to: "robot.txt" },
        { from: "src/sitemap.xml", to: "sitemap.xml" },
      ],
    }),
  ],
};
