const jwt = require('jsonwebtoken');

exports.default = data => jwt.sign(data, 'secret');
