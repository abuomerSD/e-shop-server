import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./node_modules/flowbite-react/**/*.js"],
  theme: {
    extend: {},
  },
};

export default config;
