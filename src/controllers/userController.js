const userService = require("../services/userService");

const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await userService.getProfile(userId);

        res.status(200).json({
            message: "Profile retrieved successfully",
            user
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const getAdminTest = async (req, res) => {
    res.status(200).json({
        message: "Admin access granted",
        user: req.user
    });
};

const updateProfile = async (req, res) => {
    try {
        const user = await userService.updateProfile(
            req.user.userId,
            req.body
        );

        res.status(200).json({
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body;

        const result = await userService.changePassword(
            req.user.userId,
            currentPassword,
            newPassword
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const result = await userService.deleteAccount(
            req.user.userId
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            users
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const user = await userService.updateUserRole(
            req.params.id,
            req.body.roleId
        );

        res.status(200).json({
            message: "User role updated successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(
            req.params.id
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

module.exports = {
    getProfile,
    getAdminTest,
    updateProfile,
    changePassword,
    deleteAccount,
    getAllUsers,
    updateUserRole,
    deleteUser
};