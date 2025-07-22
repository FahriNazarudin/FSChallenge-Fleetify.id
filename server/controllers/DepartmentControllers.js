const { Department } = require("../models");

class DepartementControllers {
  static async getAllDepartments(req, res, next) {
    try {
      const departments = await Department.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).json(departments);
    } catch (error) {
      next(error);
    }
  }

  static async getDepartmentById(req, res, next) {
    try {
      const { id } = req.params;
      const department = await Department.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      
      if (!department) {
        throw { name : "NotFound", message: "Department not found" };
      }
      return res.status(200).json(department);
    } catch (error) {
      next(error);
    }
  }

  static async createDepartment(req, res, next) {
    try {
      const { department_name, max_clock_in_time, max_clock_out_time } =
        req.body;
      const newDepartment = await Department.create({
        department_name,
        max_clock_in_time,
        max_clock_out_time,
      });
      return res.status(201).json(newDepartment);
    } catch (error) {
      next(error);
    }
  }
  static async updateDepartment(req, res, next) {
    try {
      const { id } = req.params;
      const { department_name, max_clock_in_time, max_clock_out_time } =
        req.body;
      const department = await Department.findByPk(id);
      if (!department) {
        throw { name : "NotFound", message: "Department not found" };
      }
      const updatedData = await department.update({
        department_name,
        max_clock_in_time,
        max_clock_out_time,
      });
      return res.status(200).json({
        department_name: updatedData.department_name,
        max_clock_in_time: updatedData.max_clock_in_time,
        max_clock_out_time: updatedData.max_clock_out_time,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteDepartment(req, res, next) {
    try {
      const { id } = req.params;
      const department = await Department.findByPk(id);
      if (!department) {
        throw { name : "NotFound" , message: "Department not found" };
      }
      await department.destroy();
      return res.status(200).json({ message: "Department was deleted" });
    } catch (error) {
     next(error);
    }
  }
}

module.exports = DepartementControllers;
