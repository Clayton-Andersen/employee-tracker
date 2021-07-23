const inquirer = require('inquirer')
const connection = require('./db/connection')

const mainMenu = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'userSelection',
        message: 'Select an option',
        choices: [{
            name: 'View all departments',
            value: 'viewDepartments'
        },
        {
            name: 'View all roles',
            value: 'viewRoles'
        },
        {
            name: 'View all employees',
            value: 'viewEmployees'
        },
        {
            name: 'Add a department',
            value: 'addDepartment'
        },
        {
            name: 'Add a role',
            value: 'addRole'
        },
        {
            name: 'Add an employee',
            value: 'addEmployee'
        },
        {
            name: 'Update an employees role',
            value: 'updateEmployeeRole'
        }]
    }])
        .then(({ userSelection }) => {
            switch (userSelection) {
                case 'viewDepartments':
                    viewDepartments();
                    break;
                case 'viewRoles':
                    viewRoles();
                    break;
                case 'viewEmployees':
                    viewEmployees();
                    break;
                case 'addDepartment':
                    addDepartment();
                    break;
                case 'addRole':
                    addRole();
                    break;
                case 'addEmployee':
                    addEmployee();
                    break;
                case 'updateEmployeeRole':
                    updateEmployeeRole();
                    break;
            }
        })
}

const viewDepartments = () => {
    connection.query('SELECT * FROM department', (error, data) => {
        console.table(data)
        mainMenu();
    })
}
const viewRoles = () => {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', (error, data) => {
        console.table(data)
        mainMenu();
    })
}
const viewEmployees = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, manager.last_name AS manager, role.title, role.salary, department.name AS department FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id LEFT JOIN department ON role.department_id = department.id', (error, data) => {
        console.table(data)
        console.log(error)
        mainMenu();
    })

}
const addDepartment = () => {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', async (error, data) => {
        console.table(data)
        const departmentName = await inquirer.prompt([{
            name: 'department',
            message: 'Input the name of the department you wish to add:',
            type: 'input'
        }])
        connection.query('INSERT INTO department (name) VALUES (?)', [departmentName.department], (error, data) => {
            if (error) throw error
            mainMenu();
        })
    })
}
const addRole = () => {
    connection.query('SELECT * FROM department', async (error, data) => {
        const roleType = await inquirer.prompt([{
            name: 'role',
            message: 'What job title would you like to add?',
            type: 'input'
        },
        {
            name: 'salary',
            message: 'What will the salary be?',
            type: 'input'
        },
        {
            name: 'department_id',
            message: 'To which department will this role be added?',
            type: 'list',
            choices: data.map((department) => ({ name: department.name, value: department.id }))
        }
        ])
        connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleType.role, roleType.salary, roleType.department_id], (error, data) => {
            if (error) throw error
            console.table(data)
            mainMenu();
        })
    })
};
const addEmployee = async () => {
    const roles = await connection.promise().query('SELECT * FROM role')
    const manager = await connection.promise().query('SELECT first_name, last_name, id FROM employee')
    const employeeType = await inquirer.prompt([{
        name: 'first_name',
        message: 'What is the first name of the employee you\'re adding?',
        type: 'input'
    },
    {
        name: 'last_name',
        message: 'What is the last name of the employee you\'re adding?',
        type: 'input'
    },
    {
        name: 'role',
        message: 'What role would you like to add?',
        type: 'list',
        choices: roles[0].map((role) => ({ name: role.title, value: role.id }))
    },
    {
        name: 'manager',
        message: 'Who is the manager of this employee?',
        type: 'list',
        choices: manager[0].map((manager) => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id}))
    }])
    const addEmp = await connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
    [employeeType.first_name, employeeType.last_name, employeeType.role, employeeType.manager])
    console.log('Employee added successfully!')
    mainMenu();
}
const updateEmployeeRole = () => {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', async (error, data) => {
        console.table(data)
        const prompt = await inquirer.prompt([{
            name: 'role',
            message: 'Which role would you like to update?',
            type: 'list',
            choices: data.map((role) => ({ name: role.title, value: role.id }))
        },
    {
        name: 'salary',
        message: 'What would you like to update the salary to?',
        type: 'input'
    }])
        const updateEmpRole = await connection.promise().query('UPDATE role SET salary = ? WHERE id = ?', [prompt.salary, prompt.role])
        mainMenu();
    })
}

mainMenu();