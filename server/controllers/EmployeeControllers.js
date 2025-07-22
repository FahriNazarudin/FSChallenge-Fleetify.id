const { Employee } = require("../models");

class EmployeeControllers {
  static async getAllEmployees(req, res) {
    try {
      const employees = await Employee.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      return res.status(200).json(employee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createEmployee(req, res) {
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
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const { employee_id, name, department_id, address } = req.body;
      const employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      const updatedData = await employee.update({
        employee_id,
        name,
        department_id,
        address,
      });
      return res.status(200).json(updatedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      await employee.destroy();
      return res.status(200).json({ message: "Employee was deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = EmployeeControllers;
