const { Model, DataTypes } = require("sequelize");
const { User } = require(".");
const sequelize = require("../Config/connection");

class Debt extends Model {}

Debt.init({
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
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    due_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payments: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    auto_pay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    debited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: { model: "user", key: "id" },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "debt",
});

module.exports = Debt;