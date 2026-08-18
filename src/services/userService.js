const bcrypt = require("bcrypt");
const { User } = require("../models/associations");

const updateProfile = async (userId, userData) => {
    const { name, email } = userData;

    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (email && email !== user.email) {
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            throw new Error("Email already registered");
        }
    }

    if (name) {
        user.name = name;
    }

    if (email) {
        user.email = email;
    }

    await user.save();

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId
    };
};

const changePassword = async (
    userId,
    currentPassword,
    newPassword
) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!passwordMatch) {
        throw new Error("Current password is incorrect");
    }

    if (!newPassword || newPassword.length < 6) {
        throw new Error(
            "New password must be at least 6 characters"
        );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return {
        message: "Password changed successfully"
    };
};

const deleteAccount = async (userId) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("User not found");
    }

    await user.destroy();

    return {
        message: "Account deleted successfully"
    };
};

const getAllUsers = async () => {
    return await User.findAll({
        attributes: [
            "id",
            "name",
            "email",
            "roleId",
            "createdAt",
            "updatedAt"
        ],
        order: [["createdAt", "DESC"]]
    });
};

const updateUserRole = async (userId, roleId) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (![1, 2].includes(Number(roleId))) {
        throw new Error("Invalid role ID");
    }

    await user.update({
        roleId: Number(roleId)
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId
    };
};

const deleteUser = async (userId) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("User not found");
    }

    await user.destroy();

    return {
        message: "User deleted successfully"
    };
};

module.exports = {
    updateProfile,
    changePassword,
    deleteAccount,
    getAllUsers,
    updateUserRole,
    deleteUser
};