const { Model, DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection.js");

class Accounts extends Model {}

Accounts.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: { model: "user", key: "id" },
        onDelete: "CASCADE",
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "accounts",
});

module.exports = Accounts;