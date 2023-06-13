const users = require('../users');

module.exports = {

    Home: (req, res) => {
        res.send("Welcome to user management by Ben");
    },
    getUser: (req, res) => {
        res.status(200).json({
            statusCode: true,
            message: 'users fetched successfully',
            results: users
        })
    },
    postUser: (req, res) => {
        users.push(req.body);
        res.status(201).json({
            statusCode: true,
            message: 'user added successfully',
            results: users
        })
    },
    singleUser: (req, res) => {
        const id = req.params.id;
        const index = users.findIndex(user => user.id === Number(id));
        const user = users.find(user => user.id === Number(id));
        if (index === -1) {
            res.status(400).json({
                statusCode: false,
                message: 'user not available'
            })
        } else {
            res.status(201).json({
                statusCode: true,
                message: 'user deleted successfully',
                results: user
            })
        }
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
        users.splice(index, 1);
        if (index === -1) {
            res.status(400).json({
                statusCode: false,
                message: 'user not available'
            })
        } else {
            res.status(201).json({
                statusCode: true,
                message: 'user deleted successfully',
                results: users
            })
        }
    }
}