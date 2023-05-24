import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../URLData'

const InsertEmployees = () => {
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

  const handleChange = value => {
    return setEmployeesDetails(emp => {
      return { ...emp, ...value }
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${BASE_URL}/create-employee`,
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
        setMessage('Employee Created Successfully')
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <>
      <div className='center my-3'>
        <h2>Create Employee </h2>
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
            placeholder='Contact number'
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
          Insert Record
        </Button>
      </Form>
    </>
  )
}

export default InsertEmployees