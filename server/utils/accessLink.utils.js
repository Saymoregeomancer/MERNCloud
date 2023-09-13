const jwt = require("jsonwebtoken");
const config = require("config");

class AccessLink {
  createAccessLink(userId, filePath) {
    const token = jwt.sign({ userId, filePath }, config.get("secretKey"));
    return token;
  }
  decryptAccessLink(token) {
    try {
      const decoded = jwt.verify(token, config.get('secretKey'));
      return decoded;
    } catch (error) {
      console.error('Помилка розшифрування токену:', error.message);
      throw new Error ('Shared files decoded error')
    }
  }
}

module.exports = new AccessLink();
