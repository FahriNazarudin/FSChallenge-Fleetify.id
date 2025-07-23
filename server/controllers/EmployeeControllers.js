const { Employee } = require("../models");

class EmployeeControllers {
  static async getAllEmployees(req, res, next) {
    try {
      const employees = await Employee.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).json(employees);
    } catch (error) {
     next(error);
    }
  }

  static async getEmployeeById(req, res, next) {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw res.status(404).json({ message: "Employee not found" });
      }
      return res.status(200).json(employee);
    } catch (error) {
      next(error);
    }
  }

  static async createEmployee(req, res, next) {
    try {
      const { employee_id, name, department_id, address } = req.body;
      const newEmployee = await Employee.create({
        employee_id,
        name,
        department_id,
        address,
      });
      return res.status(201).json(newEmployee);
    } catch (error) {
      next(error);
    }
  }

  static async updateEmployee(req, res, next) {
    try {
      const { id } = req.params;
      const { employee_id, name, department_id, address } = req.body;
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw res.status(404).json({ message: "Employee not found" });
      }
      const updatedData = await employee.update({
        employee_id,
        name,
        department_id,
        address,
      });
      return res.status(200).json(updatedData);
    } catch (error) {
     next(error);
    }
  }

  static async deleteEmployee(req, res, next) {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw {name : "NotFound", message: "Employee not found" };
      }
      await employee.destroy();
      return res.status(200).json({ message: "Employee was deleted" });
    } catch (error) {
     next(error);
    }
  }
}

module.exports = EmployeeControllers;
