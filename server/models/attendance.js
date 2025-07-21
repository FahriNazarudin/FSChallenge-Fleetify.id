'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendance.belongsTo(models.Employee, { foreignKey: "employee_id" });
      Attendance.hasMany(models.AttendanceHistory, {foreignKey: "attendance_id"}); 
    }
  }
  Attendance.init({
    employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg : "Employee id is required"},
          notNull: {msg : "Employee id is required"},
      },
    },
    attendance_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg : "Attendance id is required"},
          notNull: {msg : "Attendance id is required"},
      },
    },
    clock_in: DataTypes.DATE,
    clock_out: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};