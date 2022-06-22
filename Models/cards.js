const { Model, DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection.js");

class Cards extends Model {}

Cards.init({
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
    due_date: {
        type: DataTypes.STRING,
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
    modelName: "cards",
});

module.exports = Cards;