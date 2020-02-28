const mysql = require('mysql2')

const inquirer = require('inquirer')
const cTable = require('console.table')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'test'
})

inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 
        'View All Employees by Manager', 'Add Employee', 'Remove Employee', 
        'Update Employee Role', 'Update Employee Manager', 'View All Roles']
    }
]).then(res => {
    switch(res.action) {
        case 'View All Employees':
            viewAllEmployees()
            break
        case 'View All Employees by Department':
            let deptArr = getAllDepartments()
            inquirer.prompt([{
                type: 'list',
                name: 'dept',
                message: 'Select a department: ',
                choices: deptArr 
            }]).then(res2 => {
                viewAllEmployeesDept(res2.dept)
            })
            
        default:
            break
    }
})

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (e, res) => {
        if (e) throw e
        console.table(res)
    })
}
// view all employees by dept
const getAllDepartments = () => {
    let arr = []
    connection.query('SELECT * FROM departments' ,(e, deptDb) => {
        if (e) throw e
        deptDb.forEach(el => {
            arr.push(el.name)
        })
        return arr
    })
    return arr
}

const viewAllEmployeesDept = dept => {
    // determine dept id
    let dept_id
    connection.query('SELECT id FROM departments WHERE name = ?', dept, (e, res) => {
        if (e) throw e
        console.log(res)
    })

    //connection.query('SELECT id FROM roles WHERE department_id = ?', )

    // connection.query('SELECT * FROM employee WHERE ', dept, (e, res) => {
    //     if (e) throw e
    //     console.table(res)
    // })
}