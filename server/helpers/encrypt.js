const bcrypt = require('bcrypt');

exports.cryptPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

exports.comparePassword = function(plainPass, hashword) {
  return bcrypt.compare(plainPass, hashword);
};
