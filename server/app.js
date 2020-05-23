const express = require('express');
const bodyParser = require('body-parser');
const { comparePassword, cryptPassword } = require('./helpers/encrypt');

const app = express();
const PORT = process.env.PORT || 8080

const users = [];

app.use(bodyParser.json());

app.post('/sign-in', async function (req, res) {
  const { email, password } = req.body;

  const user = users.find(e => e.email === email);

  if (!user || !await comparePassword(password, user.password)) return res.status(404).json({
    message: 'Failed to log in'
  });

  res.send({
    email: user.email,
    username: user.username
  });
});

app.post('/sign-up', async function (req, res) {
  const { email, password, username } = req.body;
  users.push({ email, password: await cryptPassword(password), username });

  res.send({
    email,
    username
  });
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
