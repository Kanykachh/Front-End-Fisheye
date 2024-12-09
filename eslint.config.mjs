import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script", // Pas d'import/export
      globals: {
        ...globals.browser,
        photographerTemplate: "readonly",
        initModal: "readonly",
        photographerId: "readonly",
        mediaTemplate: "readonly",
        displayLightBox: "readonly",
        updateTotalLikes: "readonly",
        createImageElement: "readonly",
        createVideoElement: "readonly",
        mediaArray: "readonly",
        sortMedia: "readonly",
      },
    },
  },
  pluginJs.configs.recommended, 
];
