const { Op } = require("sequelize");
const {
  Attendance,
  AttendanceHistory,
  Employee,
  Department,
} = require("../models");
const { calculateTimeDifference } = require("../helpers/helper");

class AttendanceControllers {
  static async getAttendance(req, res, next) {
    try {
      const attendances = await Attendance.findAll();
      return res.status(200).json(attendances);
    } catch (error) {
      next(error);
    }
  }

  static async createAttendance(req, res, next) {
    try {
      const { employee_id } = req.body;

      const employee = await Employee.findOne({
        where: { employee_id: employee_id },
      });

      if (!employee) {
        throw { name : "NotFound", message: "Employee not found" };
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
      next(error);
    }
  }

  static async updateAttendance(req, res, next) {
    try {
      const { employee_id } = req.body;
      const attendance = await Attendance.findOne({
        where: { employee_id: employee_id },
      });
      if (!attendance) {
        throw { name : "NotFound", message: "Attendance not found" }
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
      next(error);
    }
  }

  static async getAttendanceHistory(req, res, next) {
    try {
      const { date, department_id } = req.query;

      // Inisialisasi kondisi WHERE untuk filter database
      let whereCondition = {};

      // Filter berdasarkan tanggal jika parameter date ada
      if (date) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        whereCondition.date_attendance = {
          [Op.gte]: startDate, 
          [Op.lt]: endDate,
        };
      }

      // Konfigurasi untuk JOIN table Employee dan Department
      // Mengambil data karyawan beserta informasi departemen dan waktu maksimal absen
      let includeOptions = {
        model: Employee,
        attributes: ["id", "employee_id", "name", "department_id"],
        include: [
          {
            model: Department,
            attributes: [
              "id",
              "department_name",
              "max_clock_in_time", // Waktu maksimal absen masuk
              "max_clock_out_time", // Waktu maksimal absen keluar
            ],
          },
        ],
      };

      // Filter berdasarkan department jika parameter department_id ada
      if (department_id) {
        includeOptions.where = { department_id: parseInt(department_id) };
      }

      // Query database untuk mengambil data attendance history
      // dengan JOIN ke table Employee dan Department
      const attendanceHistory = await AttendanceHistory.findAll({
        where: whereCondition,
        include: [includeOptions],
        order: [["date_attendance", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });


      // Ambil data karyawan yang tidak masuk (absent) hanya jika filter tanggal aktif
      let absentEmployees = [];
      if (date) {
        // Setup range waktu untuk tanggal yang dipilih
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Kondisi filter untuk employees berdasarkan department (jika ada)
        const employeeWhere = {};
        if (department_id) {
          employeeWhere.department_id = parseInt(department_id);
        }

        // Ambil semua karyawan dalam department yang dipilih
        const allEmployees = await Employee.findAll({
          where: employeeWhere,
          include: [
            {
              model: Department,
              attributes: [
                "id",
                "department_name",
                "max_clock_in_time",
                "max_clock_out_time",
              ],
            },
          ],
          attributes: ["id", "employee_id", "name", "department_id"],
        });

        // Ambil karyawan yang sudah clock in pada tanggal tersebut
        const clockedInEmployees = await AttendanceHistory.findAll({
          where: {
            date_attendance: {
              [Op.between]: [startOfDay, endOfDay],
            },
            attendance_type: 1, // Hanya Clock In
          },
          attributes: ["employee_id"],
        });

        // Extract employee_id yang sudah clock in
        const clockedInEmployeeIds = clockedInEmployees.map(
          (record) => record.employee_id
        );

        // Cari karyawan yang tidak clock in (absent)
        absentEmployees = allEmployees
          .filter((emp) => !clockedInEmployeeIds.includes(emp.employee_id))
          .map((employee) => ({
            employee_id: employee.employee_id,
            employee_name: employee.name,
            department_name: employee.Department.department_name,
            max_clock_in_time: employee.Department.max_clock_in_time,
            max_clock_out_time: employee.Department.max_clock_out_time,
            date: date,
            status: "Absent",
            description: "No clock in record found",
          }));
      }

      // Return response JSON dengan data attendance dan absent employees
      return res.status(200).json({
        filters: {
          date: date,
          department_id: department_id,
        },
        data: {
          attendance_history: attendanceHistory,
          absent_employees: absentEmployees,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AttendanceControllers;
