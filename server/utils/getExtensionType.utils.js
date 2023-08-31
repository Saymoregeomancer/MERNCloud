const config = require("config");

function getExtensionType(fileType) {
  const supportedExtensions = config.get("supportedExtensions");
  const keys = Object.keys(supportedExtensions);
  const type = keys.filter((key) =>
    supportedExtensions[key].includes(`.${fileType.toLowerCase()}`)
  );
  return type[0];
}

module.exports = getExtensionType;
