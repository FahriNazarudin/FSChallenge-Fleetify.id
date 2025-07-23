'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Department.hasMany(models.Employee, { foreignKey: "department_id" });
    }
  }
  Department.init(
    {
      department_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Department name is required" },
          notNull: { msg: "Department name is required" },
        },
      },
      max_clock_in_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: { msg: "max clock in time is required" },
          notNull: { msg: "max clock in time is required" },
        },
      },
      max_clock_out_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: { msg: "max clock out time is required" },
          notNull: { msg: "max clock out time is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Department",
    }
  );
  return Department;
};