const getProfile = async (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user
    });
};

const getAdminTest = async (req, res) => {
    res.status(200).json({
        message: "Admin access granted",
        user: req.user
    });
};

module.exports = {
    getProfile,
    getAdminTest
};