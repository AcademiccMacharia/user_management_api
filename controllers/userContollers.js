const users = require('../users');

module.exports = {
  Home: (req, res) => {
    res.send("Welcome to user management by Ben");
  },
  getUser: (req, res) => {
    res.status(200).json({
      statusCode: true,
      message: 'Users fetched successfully',
      results: users
    });
  },
  singleUser: (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id === Number(id));

    if (!user) {
      res.status(404).json({
        statusCode: false,
        message: 'User not found'
      });
    } else {
      res.status(200).json({
        statusCode: true,
        message: 'User fetched successfully',
        results: user
      });
    }
  },
  signupUser: (req, res) => {
    const { name, username, email, password } = req.body;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        statusCode: false,
        message: 'Email already exists'
      });
    }

    const newUser = {
      id: users.length + 1,
      name,
      username,
      email,
      password
    };

    users.push(newUser);

    res.status(201).json({
      statusCode: true,
      message: 'User signed up successfully',
      results: newUser
    });
  },
  loginUser: (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({
        statusCode: false,
        message: 'Invalid email or password'
      });
    }

    res.status(200).json({
      statusCode: true,
      message: 'User logged in successfully',
      results: user
    });
  },
  updateUser: (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    const userIndex = users.findIndex(user => user.id === Number(id));

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    users[userIndex] = { ...users[userIndex], ...updatedUser };

    res.json({
      success: true,
      message: 'User updated successfully',
      data: users[userIndex]
    });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(user => user.id === Number(id));

    if (index === -1) {
      res.status(404).json({
        statusCode: false,
        message: 'User not found'
      });
    } else {
      users.splice(index, 1);
      res.status(200).json({
        statusCode: true,
        message: 'User deleted successfully',
        results: users
      });
    }
  }
};
