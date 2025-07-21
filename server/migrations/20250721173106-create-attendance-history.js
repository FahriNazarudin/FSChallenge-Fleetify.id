'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AttendanceHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: 'Employees',
          key: 'employee_id'
        },
        onDelete: 'restrict',
        onUpdate: 'cascade'
      },
      attendance_id: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'Attendances',
          key: 'attendance_id'
        },
        onDelete: 'restrict',
        onUpdate: 'cascade'
      },
      date_attendance: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      attendance_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '1=In, 2=Out'
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AttendanceHistories');
  }
};