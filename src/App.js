import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeesRecords from './Components/EmployeesRecords/EmployeesRecords'
import InsertEmployees from './Components/EmployeesRecords/InsertEmployees'
import UpdateEmployees from './Components/EmployeesRecords/UpdateEmployees'
import NavbarMain from './Components/EmployeesRecords/NavbarMain'
function App () {
  return (
    <BrowserRouter>
      <div className='app'>
        <NavbarMain />
        <Routes>
          <Route exact path='/' element={<EmployeesRecords />} />
          <Route exact path='/create-employees' element={<InsertEmployees />} />
          <Route
            exact
            path='/update-employee/:id'
            element={<UpdateEmployees />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App