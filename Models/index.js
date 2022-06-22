const User = require("./user");
const Bills = require("./bills");

User.hasMany(Bills, {
    foreignkey: "user_id",
    onDelete: "CASCADE",
});
Bills.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = { User, Bills };