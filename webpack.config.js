const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Define your 'roots' variable
const ROOTS_URL = "";

// Define the pages for HtmlWebpackPlugin
const pages = [
  { name: "index", template: "./src/index.html" },
  { name: "404", template: "./src/404.html" },
  { name: "contact-us", template: "./src/contact-us.html" },
  { name: "join-us", template: "./src/join-us.html" },
  { name: "clients", template: "./src/clients.html" },
  { name: "services", template: "./src/services.html" },
  { name: "static-guard", template: "./src/static-guard.html" },
  { name: "armed-guard", template: "./src/armed-guard.html" },
  { name: "vip-bodyguard", template: "./src/vip-bodyguard.html" },
  { name: "event-crowd-control", template: "./src/event-crowd-control.html" },
  {
    name: "security-escort-service",
    template: "./src/security-escort-service.html",
  },
  { name: "vehicle-patrol", template: "./src/vehicle-patrol.html" },
  { name: "about-us", template: "./src/about-us.html" },
  { name: "corporate-vision", template: "./src/corporate-vision.html" },
  { name: "corporate-structure", template: "./src/corporate-structure.html" },
  { name: "nbos", template: "./src/nbos.html" },
  { name: "license", template: "./src/license.html" },
  { name: "key-project", template: "./src/key-project.html" },
  { name: "our-training", template: "./src/our-training.html" },
  { name: "who-we-are", template: "./src/who-we-are.html" },
  { name: "company-information", template: "./src/company-information.html" },
  { name: "board-of-directors", template: "./src/board-of-directors.html" },
  { name: "objective", template: "./src/objective.html" },
];

const htmlPlugins = pages.map(
  (page) =>
    new HtmlWebpackPlugin({
      filename: `${page.name}.html`,
      template: page.template,
      minify: {
        removeOptionalTags: false,
        collapseWhitespace: true,
      },
      inject: "head",
      templateParameters: {
        commonHead: fs
          .readFileSync(
            path.resolve(__dirname, "src", "components", "common-head.html"),
            "utf-8"
          )
          .replace(/<%= roots %>/g, ROOTS_URL),
        roots: ROOTS_URL,
      },
      navbar: fs
        .readFileSync("./src/components/navbar.html", "utf8")
        .replace(/<%= roots %>/g, ROOTS_URL),
      footer: fs
        .readFileSync("./src/components/footer.html", "utf8")
        .replace(/<%= roots %>/g, ROOTS_URL),
    })
);

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "production",
  performance: {
    maxAssetSize: 2512000, // 3 MiB
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
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/service-worker.js", to: "service-worker.js" },
      ],
    }),
  ],
};
