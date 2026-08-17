const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models/associations");
const registerUser = async (userData) => {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        roleId: 1
    });

    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({
    where: { email },
    include: {
        model: Role,
        attributes: ["id", "name"]
    }
});

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
    {
        userId: user.id,
        role: user.Role.name
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
);

return {
    user,
    token
};
};

module.exports = {
    registerUser,
    loginUser
};