## Fullstack Developer Challenge Test

### DESCRIPTION

A Multinational company has employees and various divisions or departments within it. Due to the large number of employees to manage, the company requires an Attendance System to systematically record and evaluate employee discipline.

## TECH STACK

### Backend

- **Framework:** Node.js + Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Validation:** Built-in Sequelize validation
- **Error Handling:** Custom middleware

### Frontend

- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Bootstrap 5
- **HTTP Client:** Axios
- **Notifications:** SweetAlert2
- **Icons:** Font Awesome

---

## DATABASE SCHEMA

### Tables

#### 1. Departments

```sql
- id : integer, primaryKey, autoIncrement
- department_name : string, required
- max_clock_in_time : time, required
- max_clock_out_time : time, required
- createdAt, updatedAt : timestamps
```

#### 2. Employees

```sql
- id : integer, primaryKey, autoIncrement
- employee_id : string, required, unique
- name : string, required
- address : text
- department_id : integer, foreignKey(Department.id)
- createdAt, updatedAt : timestamps
```

#### 3. Attendances

```sql
- id : integer, primaryKey, autoIncrement
- employee_id : string, foreignKey(Employee.employee_id)
- attendance_id : string, unique (format: ATT-{timestamp})
- clock_in : timestamp
- clock_out : timestamp
- createdAt, updatedAt : timestamps
```

#### 4. AttendanceHistories

```sql
- id : integer, primaryKey, autoIncrement
- employee_id : string, foreignKey(Employee.employee_id)
- attendance_id : string
- date_attendance : timestamp, required
- attendance_type : integer (1=Clock In, 2=Clock Out)
- description : string
- createdAt, updatedAt : timestamps
```

---

## INSTALLATION & SETUP

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Git

### Backend Setup

```bash
# Clone repository
git clone https://github.com/FahriNazarudin/FSChallenge-Fleetify.id.git
cd FSChallenge-Fleetify.id/server

# Install dependencies
npm install

# Configure database
# Edit config/config.json with your PostgreSQL credentials

# Run migrations
npx sequelize-cli db:migrate

# (Optional) Run seeders
npx sequelize-cli db:seed:all

# Start server
npm start
# Server runs on http://localhost:3000
```

### Frontend Setup

```bash
# Navigate to client directory
cd ../client/attendance-employee

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📡 API ENDPOINTS

### Department Management

- `GET /departments` - Get all departments
- `POST /departments` - Create new department
- `GET /departments/:id` - Get department by ID
- `PUT /departments/:id` - Update department
- `DELETE /departments/:id` - Delete department

### Employee Management

- `GET /employees` - Get all employees
- `POST /employees` - Create new employee
- `GET /employees/:id` - Get employee by ID
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Attendance Operations

- `GET /attendances` - Get active attendances
- `POST /attendances` - Clock in employee
- `PUT /attendances/clock-out` - Clock out employee

### Attendance History & Reports

- `GET /attendance-history` - Get attendance history with filters

**Advanced Filtering:**

```
GET /attendance-history?date=2025-01-15
GET /attendance-history?start_date=2025-01-01&end_date=2025-01-31
GET /attendance-history?department_id=1
GET /attendance-history?employee_id=EMP001
```

**Full API Documentation:** [api_doc.md](./api_doc.md)

---

## ✨ FEATURES IMPLEMENTED


1. **CRUD Karyawan** - Complete employee management
2. **CRUD Departemen** - Complete department management
3. **POST Absen Masuk** - Clock in functionality with validation
4. **PUT Absen Keluar** - Clock out functionality
5. **GET List Log Absensi Karyawan** - Advanced attendance reporting

## 👨‍💻 DEVELOPER INFO

**Developer:** Fahri Nazarudin  
**Repository:** [FSChallenge-Fleetify.id](https://github.com/FahriNazarudin/FSChallenge-Fleetify.id)

## 📝 NOTES

- **Database:** PostgreSQL with Sequelize ORM for robust data management
- **Code Quality:** Following JavaScript/React best practices
- **Error Handling:** Comprehensive error management implemented
- **Documentation:** Complete API documentation provided


