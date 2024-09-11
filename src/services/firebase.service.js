const admin = require("firebase-admin");
const { firebase: firebaseConfig } = require('src/services/config.service');
const serviceAccount = require(firebaseConfig.serviceAccountKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
