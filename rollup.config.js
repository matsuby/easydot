import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "src/easydot.js",
    output: {
      file: "dist/easydot.bundle.js",
      name: "easydot",
      format: "umd",
    },
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ['@babel/preset-env'],
      }),
    ],
  },
  {
    input: "src/easydot.js",
    output: {
      file: "dist/easydot.bundle.min.js",
      name: "easydot",
      format: "umd",
    },
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ['@babel/preset-env'],
      }),
      uglify(),
    ],
  },
];
