# Employee Attendance System API Documentation

## Models

### Department

```md
- id : integer, primaryKey, required, autoIncrement
- department_name : string, required
- max_clock_in_time : time, required
- max_clock_out_time : time, required
- createdAt : timestamp (default: NOW())
- updatedAt : timestamp (default: NOW())
```

### Employee

```md
- id : integer, primaryKey, required, autoIncrement
- employee_id : string, required, unique
- name : string, required
- address : text
- department_id : integer, required, foreignKey(Department.id)
- createdAt : timestamp (default: NOW())
- updatedAt : timestamp (default: NOW())
```

### Attendance

```md
- id : integer, primaryKey, required, autoIncrement
- employee_id : string, required, foreignKey(Employee.employee_id)
- attendance_id : string, required, unique
- clock_in : timestamp
- clock_out : timestamp
- createdAt : timestamp (default: NOW())
- updatedAt : timestamp (default: NOW())
```

### AttendanceHistory

```md
- id : integer, primaryKey, required, autoIncrement
- employee_id : string, required, foreignKey(Employee.employee_id)
- attendance_id : string, required
- date_attendance : timestamp, required
- attendance_type : integer, required (1=Clock In, 2=Clock Out)
- description : string
- createdAt : timestamp (default: NOW())
- updatedAt : timestamp (default: NOW())
```

## Endpoints

List of available endpoints:

**Department Management:**

- `GET /departments`
- `POST /departments`
- `GET /departments/:id`
- `PUT /departments/:id`
- `DELETE /departments/:id`

**Employee Management:**

- `GET /employees`
- `POST /employees`
- `GET /employees/:id`
- `PUT /employees/:id`
- `DELETE /employees/:id`

**Attendance Operations:**

- `GET /attendances`
- `POST /attendances`
- `PUT /attendances/clock-out`

**Attendance History & Reports:**

- `GET /attendance-history`

## 1. GET /departments

Description:

- Fetch all departments with their time configurations

Response (200 - OK)

```json
[
  {
    "id": 1,
    "department_name": "Human Resources",
    "max_clock_in_time": "09:00:00",
    "max_clock_out_time": "17:00:00",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z"
  }
]
```

## 2. POST /departments

Description:

- Create a new department with time rules

Request

- body:

```json
{
  "department_name": "IT Department",
  "max_clock_in_time": "08:30:00",
  "max_clock_out_time": "17:30:00"
}
```

Response (201 - Created)

```json
{
  "msg": "Department created successfully",
  "department": {
    "id": 2,
    "department_name": "IT Department",
    "max_clock_in_time": "08:30:00",
    "max_clock_out_time": "17:30:00"
  }
}
```

Response (400 - Bad Request)

```json
{
  "error": "Department name is required"
}
OR
{
  "error": "Invalid time format"
}
```

## 3. GET /departments/:id

Description:

- Fetch department details by ID

Request

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "id": 1,
  "department_name": "Human Resources",
  "max_clock_in_time": "09:00:00",
  "max_clock_out_time": "17:00:00"
}
```

Response (404 - Not Found)

```json
{
  "message": "Department not found"
}
```

## 4. PUT /departments/:id

Description:

- Update department information

Request

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "department_name": "Human Resources Updated",
  "max_clock_in_time": "08:00:00",
  "max_clock_out_time": "16:00:00"
}
```

Response (200 - OK)

```json
{
  "msg": "Department updated successfully",
  "department": {
    "id": 1,
    "department_name": "Human Resources Updated",
    "max_clock_in_time": "08:00:00",
    "max_clock_out_time": "16:00:00"
  }
}
```

## 5. DELETE /departments/:id

Description:

- Delete department by ID

Request

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "msg": "Department deleted successfully"
}
```

Response (404 - Not Found)

```json
{
  "message": "Department not found"
}
```

## 6. GET /employees

Description:

- Fetch all employees with department information

Response (200 - OK)

```json
[
  {
    "id": 1,
    "employee_id": "EMP001",
    "name": "John Doe",
    "address": "Jl. Sudirman No. 123",
    "department_id": 1,
    "Department": {
      "id": 1,
      "department_name": "Human Resources"
    }
  }
]
```

## 7. POST /employees

Description:

- Create a new employee

Request

- body:

```json
{
  "employee_id": "EMP002",
  "name": "Jane Smith",
  "address": "Jl. Thamrin No. 456",
  "department_id": 1
}
```

Response (201 - Created)

```json
{
  "msg": "Employee created successfully",
  "employee": {
    "id": 2,
    "employee_id": "EMP002",
    "name": "Jane Smith",
    "address": "Jl. Thamrin No. 456",
    "department_id": 1
  }
}
```

Response (400 - Bad Request)

```json
{
  "error": "Employee ID already exists"
}
OR
{
  "error": "Employee name is required"
}
OR
{
  "error": "Department not found"
}
```

## 8. GET /employees/:id

Description:

- Fetch employee details by ID

Request

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "id": 1,
  "employee_id": "EMP001",
  "name": "John Doe",
  "address": "Jl. Sudirman No. 123",
  "department_id": 1,
  "Department": {
    "department_name": "Human Resources"
  }
}
```

Response (404 - Not Found)

```json
{
  "message": "Employee not found"
}
```

## 9. PUT /employees/:id

Description:

- Update employee information

Request

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "John Doe Updated",
  "address": "Jl. Sudirman No. 123 Updated",
  "department_id": 2
}
```

Response (200 - OK)

```json
{
  "msg": "Employee updated successfully",
  "employee": {
    "id": 1,
    "employee_id": "EMP001",
    "name": "John Doe Updated",
    "address": "Jl. Sudirman No. 123 Updated",
    "department_id": 2
  }
}
```

## 10. DELETE /employees/:id

Description:

- Delete employee by ID

Request

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "msg": "Employee deleted successfully"
}
```

Response (404 - Not Found)

```json
{
  "message": "Employee not found"
}
```

## 11. GET /attendances

Description:

- Fetch all active attendance records (not yet clocked out)

Response (200 - OK)

```json
[
  {
    "id": 1,
    "employee_id": "EMP001",
    "attendance_id": "ATT-1642234567890",
    "clock_in": "2025-01-15T08:30:00.000Z",
    "clock_out": null,
    "Employee": {
      "name": "John Doe",
      "Department": {
        "department_name": "Human Resources"
      }
    }
  }
]
```

## 12. POST /attendances

Description:

- Record employee clock in time

Request

- body:

```json
{
  "employee_id": "EMP001"
}
```

Response (201 - Created)

```json
{
  "msg": "Clock in success",
  "attendance": {
    "id": 1,
    "employee_id": "EMP001",
    "attendance_id": "ATT-1642234567890",
    "clock_in": "2025-01-15T08:30:00.000Z",
    "clock_out": null
  }
}
```

Response (400 - Bad Request)

```json
{
  "message": "Employee not found"
}
OR
{
  "message": "Employee already clocked in"
}
```

## 13. PUT /attendances/clock-out

Description:

- Record employee clock out time

Request

- body:

```json
{
  "employee_id": "EMP001"
}
```

Response (200 - OK)

```json
{
  "msg": "Clock out success",
  "attendance": {
    "id": 1,
    "employee_id": "EMP001",
    "attendance_id": "ATT-1642234567890",
    "clock_in": "2025-01-15T08:30:00.000Z",
    "clock_out": "2025-01-15T17:00:00.000Z"
  }
}
```

Response (400 - Bad Request)

```json
{
  "message": "Employee not found"
}
OR
{
  "message": "No active attendance found"
}
```

## 14. GET /attendance-history

Description:

- Fetch attendance history with advanced filtering and absent employee detection

Request

- query parameters (all optional):

```json
{
  "date": "2025-01-15",
  "start_date": "2025-01-01",
  "end_date": "2025-01-31",
  "department_id": "1",
  "employee_id": "EMP001"
}
```

Response (200 - OK)

```json
{
  "filters": {
    "date": "2025-01-15",
    "start_date": null,
    "end_date": null,
    "department_id": "1"
  },
  "data": {
    "attendance_history": [
      {
        "id": 1,
        "employee_id": "EMP001",
        "attendance_id": "ATT-1642234567890",
        "date_attendance": "2025-01-15T08:30:00.000Z",
        "attendance_type": 1,
        "description": "Clock In",
        "Employee": {
          "id": 1,
          "employee_id": "EMP001",
          "name": "John Doe",
          "department_id": 1,
          "Department": {
            "id": 1,
            "department_name": "Human Resources",
            "max_clock_in_time": "09:00:00",
            "max_clock_out_time": "17:00:00"
          }
        }
      }
    ],
    "absent_employees": [
      {
        "employee_id": "EMP002",
        "employee_name": "Jane Smith",
        "department_name": "IT Department",
        "max_clock_in_time": "08:30:00",
        "max_clock_out_time": "17:30:00",
        "date": "2025-01-15",
        "status": "Absent",
        "description": "No clock in record found"
      }
    ]
  }
}
```

Response (400 - Bad Request)

```json
{
  "error": "Invalid date format"
}
OR
{
  "error": "Start date must be before end date"
}
```

## Global Error

Response (400 - Bad Request)

```json
{
  "error": "Validation error message"
}
```

Response (404 - Not Found)

```json
{
  "message": "Resource not found"
}
OR
{
  "name": "NotFound",
  "message": "Specific resource not found"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

