const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Punto di ingresso
  output: {
    filename: "bundle.js", // Nome del file di output
    path: path.resolve(__dirname, "dist"), // Cartella di output
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Applica Babel a tutti i file .js
        exclude: /node_modules/, // Escludi la cartella node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Il file HTML di base
      filename: "index.html", // Il nome del file HTML generato
    }),
  ],
  mode: "development", // Modalità ('development' o 'production')
};
