'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Employee.belongsTo(models.Department, { foreignKey: "department_id" });
       Employee.hasMany(models.Attendance, { foreignKey: "employee_id" });
       Employee.hasMany(models.AttendanceHistory, {foreignKey: "employee_id",});
    }
  }
  Employee.init({
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Employee id is required" },
        notNull: { msg: "Employee id is required" },
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Department id is required" },
          notNull: { msg: "Department id is required" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name id is required" },
          notNull: { msg: "Name id is required" },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Address id is required" },
          notNull: { msg: "Address id is required" },
        },
      },
    },
    sequelize,
    modelName: "Employee",
  });
  return Employee;
};