const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../Config/connection");

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
    },
    pay_day: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monthly_income: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    checking: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    savings: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    credit_card: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // bills_before: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    new_checking: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async(newCustomerData) => {
            newCustomerData.password = await bcrypt.hash(
                newCustomerData.password,
                10
            );
            return newCustomerData;
        },
        beforeUpdate: async(newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
});

module.exports = User;