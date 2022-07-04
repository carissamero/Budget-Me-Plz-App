const { Model, DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection");

class bills extends Model {}

bills.init({
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
        onDelete: "CASCADE",
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "bills",
});

module.exports = bills;