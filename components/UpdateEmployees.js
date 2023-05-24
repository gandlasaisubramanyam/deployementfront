import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../URLData'

const UpdateEmployees = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [isTrue, setIsTrue] = useState(false)
  const [employeesDetails, setEmployeesDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    designation: '',
    salary: ''
  })

  useEffect(() => {
    const id = params.id
    axios
      .get(`${BASE_URL}/get-single-employees/${id}`)
      .then(response => {
        setEmployeesDetails(response.data[0])
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }, [params.id])

  const handleChange = value => {
    return setEmployeesDetails(emp => {
      return { ...emp, ...value }
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const id = params.id
      const response = await axios.put(
        `${BASE_URL}/update-employee/${id}`,
        employeesDetails
      )
      if (response) {
        setEmployeesDetails({
          firstName: '',
          lastName: '',
          email: '',
          contactNumber: '',
          designation: '',
          salary: ''
        })
        setIsTrue(true)
        setMessage('Employee Edited Successfully')
        setTimeout(() => {
            navigate('/')
          }, 1000)
      }
    } catch (error) {
      console.log('Error while updating a employee:', error)
    }
  }

  return (
    <>
      <div className='center my-3'>
        <h2>Update Employee Records</h2>
      </div>
      {isTrue && <div className='alert alert-success'>{message}</div>}
      <Form onSubmit={handleSubmit} className='container form my-2'>
        <Form.Group className='mb-3 col-md-4'>
          <Form.Control
            type='text'
            id='fname'
            placeholder='First Name'
            required
            value={employeesDetails.firstName}
            onChange={event => handleChange({ firstName: event.target.value })}
          />
        </Form.Group>

        <Form.Group className='mb-3 col-md-4'>
          <Form.Control
            type='text'
            id='lname'
            placeholder='Last Name'
            required
            value={employeesDetails.lastName}
            onChange={event => handleChange({ lastName: event.target.value })}
          />
        </Form.Group>

        <Form.Group className='mb-3 col-md-4'>
          <Form.Control
            type='email'
            id='email'
            placeholder='Email'
            required
            value={employeesDetails.email}
            onChange={event => handleChange({ email: event.target.value })}
          />
        </Form.Group>

        <Form.Group className='mb-3 col-md-4'>
          <Form.Control
            type='num'
            id='contact'
            placeholder='Contact Number'
            required
            value={employeesDetails.contactNumber}
            onChange={event =>
              handleChange({ contactNumber: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group className='mb-3 col-md-4'>
          <Form.Control
            type='text'
            id='designation'
            placeholder='Designation'
            required
            value={employeesDetails.designation}
            onChange={event =>
              handleChange({ designation: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group className='mb-3 col-md-4'>
          <Form.Control
            type='num'
            id='salary'
            placeholder='Salary'
            required
            value={employeesDetails.salary}
            onChange={event => handleChange({ salary: event.target.value })}
          />
        </Form.Group>

        <Button variant='primary' type='submit' className='mb-3 col-md-2 my-2'>
          Update Employee
        </Button>
      </Form>
    </>
  )
}

export default UpdateEmployees