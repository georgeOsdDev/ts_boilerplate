module.exports = {
  mode: "development",
  entry: {
    my_project_typescript_template_202003: "./src/index.ts"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ }]
  }
};
