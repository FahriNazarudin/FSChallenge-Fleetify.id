const { where } = require("sequelize");
const { Attendance, AttendanceHistory, Employee } = require("../models");

class AttendanceControllers {
  static async getAttendance(req, res) {
    try {
      const attendances = await Attendance.findAll();
      return res.status(200).json(attendances);
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async createAttendance(req, res) {
    try {
      const { employee_id } = req.body;

      const employee = await Employee.findOne({
        where: { employee_id: employee_id },
      });

      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
          employee_id: employee_id,
        });
      }

      const attendance_id = `ATT-${Date.now()}`;
      const newAttendance = await Attendance.create({
        employee_id,
        attendance_id,
        clock_in: new Date(),
        clock_out: null,
      });

      await AttendanceHistory.create({
        employee_id,
        attendance_id,
        date_attendance: new Date(),
        attendance_type: 1,
        description: "Clock In",
      });

      return res.status(201).json({
        msg: "Clock in success",
        attendance: newAttendance,
      });
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async updateAttendance(req, res) {
    try {
      const { employee_id } = req.body;
      const attendance = await Attendance.findOne({
        where: { employee_id: employee_id },
      });
      if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
      }
      const updatedData = await attendance.update({
        clock_out: new Date(),
      });

      await AttendanceHistory.create({
        employee_id,
        attendance_id: attendance.attendance_id,
        date_attendance: new Date(),
        attendance_type: 2,
        description: "Clock Out",
      });

      return res.status(200).json({
        msg: "clock out success",
        attendance: updatedData,
      });
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = AttendanceControllers;
