const authService = require("../services/authService");

const registerUser = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser(email, password);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                roleId: result.user.roleId
            },
            token: result.token
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};