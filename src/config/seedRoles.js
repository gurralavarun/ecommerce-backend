const Role = require("../models/Role");

const seedRoles = async () => {
    const roles = ["CUSTOMER", "ADMIN"];

    for (const roleName of roles) {
        await Role.findOrCreate({
            where: { name: roleName },
            defaults: { name: roleName }
        });
    }

    console.log("Roles initialized successfully");
};

module.exports = seedRoles;