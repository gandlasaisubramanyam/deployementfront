import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NavbarMain () {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand className='fs-2'>
        <Nav.Link as={Link} to='/' className='fs-5'>
           Employees 
          </Nav.Link>
           </Navbar.Brand>
        <Nav className='me-end'>
          <Nav.Link as={Link} to='/create-employees' className='fs-5'>
            Create Employees 
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavbarMain