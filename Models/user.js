const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../Config/connection");

class user extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

user.init({
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
            len: [4],
        },
    },
    pay_day: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    monthly_income: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    checking: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    savings: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    credit_card: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // bills_before: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    new_checking: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
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
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = user;
