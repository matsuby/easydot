import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import * as meta from "./package.json"

export default [
  {
    input: meta.module,
    output: {
      file: meta.main,
      name: meta.name,
      format: "umd",
    },
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
        externalHelpers: true,
      }),
    ],
  },
  {
    input: meta.module,
    output: {
      file: meta.main.replace(".js", ".min.js"),
      name: meta.name,
      format: "umd",
    },
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
        externalHelpers: true,
      }),
      uglify(),
    ],
  },
];
