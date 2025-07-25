export function getLanguageName(language_id) {
  const LANGUAGE_NAMES = {
    74: "TYPESCRIPT",
    63: "JAVASCRIPT",
    71: "PYTHON",
    62: "JAVA",
  };

  return LANGUAGE_NAMES[language_id] || "Unknown";
}

export function getLanguageId(language) {
  const languageMap = {
    TYPESCRIPT: 74,
    JAVASCRIPT: 63,
    PYTHON: 71,
    JAVA: 62,
  };

  return languageMap[language.toUpperCase()];
}
