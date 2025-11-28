import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },

    mail: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",   // 👉 nombre exacto en MySQL
    timestamps: true,     // createdAt / updatedAt
    /*
    hooks: {
      // Hash automático antes de guardar
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.pass = await bcrypt.hash(user.pass, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed("pass")) {
          const salt = await bcrypt.genSalt(10);
          user.pass = await bcrypt.hash(user.pass, salt);
        }
      },
    },*/
  }
);

export default User;