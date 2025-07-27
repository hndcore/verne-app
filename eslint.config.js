// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import jsx from "eslint-plugin-react";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  [
    globalIgnores(["dist", "build"]),
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: tseslint.parser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...globals.browser,
          React: "writable",
        },
      },
      plugins: {
        react: jsx,
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
      },
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
    {
      files: ["**/*.test.{ts,tsx}"],
      languageOptions: {
        globals: {
          ...globals.jest,
        },
      },
    },
    prettier,
  ],
  storybook.configs["flat/recommended"],
);
