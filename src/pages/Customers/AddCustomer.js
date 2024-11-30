import React from 'react'
import './addcustomer.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const AddCustomer = () => {
    return (
        <div className='main-container'>
          <div>
          <h2
            style={{ textAlign: "center",
                     marginLeft: "5%",
                     color: "violet" }}
          >
            Add Customers 
          </h2>
          </div>
          <div className='textfield'><TextField id="outlined-basic" label="Name" variant="outlined"  sx={{width:'300%'}}/></div>
          <div className='textfield'><TextField id="outlined-basic" label="Company Name" variant="outlined" sx={{width:'300%'}} /></div>
          <div className='textfield'><TextField id="outlined-basic" label="Mobile No" variant="outlined" sx={{width:'300%'}} /></div>
          <div className='textfield'><TextField id="outlined-basic" label="Email" variant="outlined" sx={{width:'300%'}}/></div>
          <div className='textfield'><TextField id="outlined-basic" label="Address" variant="outlined" sx={{width:'300%'}}/></div>
          
          <div className='button'><Button variant="contained">Submit</Button></div>
    
        </div>
      )
}

export default AddCustomer