import axios from 'axios'
import { BASE_URL } from '../../URLData'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Employees.css'

const EmployeesRecords = () => {
  const [message, setMessage] = useState('')
  const [isTrue, setIsTrue] = useState(false)
  const [employeesList, setEmployeesList] = useState([])

  useEffect(() => {
    getEmployees()
  }, [])

  const getEmployees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-all-employee`)
      if (response) {
        setEmployeesList(response.data)
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  const handleDelete = async id => {
    try {
      let confirmation = window.confirm('Shall we proceed to delete?')
      if (confirmation) {
        const response = await axios.delete(`${BASE_URL}/delete-employee/${id}`)
        if (response) {
          setIsTrue(true)
          setMessage('Employee Deleted Successfully')
            setTimeout(()=>{
                getEmployees()
            },2000)
        }
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <>
      <div className='arrange'>
        <div className='center my-3'>
          <h3>Employee Records</h3>
        </div>
        {isTrue && <div className='alert alert-danger'>{message}</div>}
        <Table striped bordered hover responsive='sm' className='container'>
          <thead className='text-center'>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Designation</th>
              <th>Salary</th>
              <th colSpan='2'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {employeesList.map((employees, index) => (
              <tr key={index}>
                <td>{employees.firstName}</td>
                <td>{employees.lastName}</td>
                <td>{employees.email}</td>
                <td>{employees.contactNumber}</td>
                <td>{employees.designation}</td>
                <td>{employees.salary}</td>
                <td>
                  <Link
                    className=' btn btn-warning'
                    to={`/update-employee/${employees._id}`}
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <Button
                    variant='danger'
                    onClick={() => handleDelete(employees._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default EmployeesRecords