const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { comparePassword, cryptPassword } = require('./helpers/encrypt');
const generateToken = require('./helpers/generateToken').default;

const app = express();
const PORT = process.env.PORT || 8080

const users = [];

app.use(bodyParser.json());
app.use(cors());

app.post('/sign-in', async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = users.find(e => e.email === email);

    if (!user || !await comparePassword(password, user.password)) return res.status(404).json({
      message: 'User not found'
    });

    const data = {
      email: user.email,
      username: user.username
    };

    res.send({
      ...data,
      token: generateToken(data)
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

app.post('/sign-up', async function (req, res) {
  try {
    const { email, password, username } = req.body;

    const user = users.find(e => e.email === email);

    if (user) return res.status(400).json({
      message: 'User already exists'
    })

    users.push({ email, password: await cryptPassword(password), username });

    const data = {
      email,
      username,
    };

    res.send({
      ...data,
      token: generateToken(data)
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
