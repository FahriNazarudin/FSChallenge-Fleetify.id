'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttendanceHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AttendanceHistory.belongsTo(models.Employee, {foreignKey: "employee_id"});
      AttendanceHistory.belongsTo(models.Attendance, {foreignKey: "attendance_id"}); 
    }
  }
  AttendanceHistory.init(
    {
      employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Employee id is required" },
          notNull: { msg: "Employee id is required" },
        },
      },
      attendance_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Attendance id is required" },
          notNull: { msg: "Attendance id is required" },
        },
      },
      date_attendance: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Date attendance is required" },
          notNull: { msg: "Date attendance is required" },
        },
      },
      attendance_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Attendance type is required" },
          notNull: { msg: "Attendance type is required" },
          isIn: {
            args: [[1, 2]],
            msg: "Attendance type must be 1 (In) or 2 (Out)",
          },
        },
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "AttendanceHistory",
    }
  );
  return AttendanceHistory;
};