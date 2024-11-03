/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  purge: false,
  jit: true,
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/dist/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
