import { Box, Button, Grid, TextField, Typography, Link } from '@mui/material';
import React from 'react';
import Navbar2 from './Navbar-logout';

const Signup = () => {

  

  const formSubmit = (e) => {

  }

  return (
    <>
      <Navbar2 />
      <div className="container-fluid">
        <div className="row mt-4 justify-content-center">
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={formSubmit} id="signupForm">
                  <div className="row row-gap-3">
                    <div className="col-12">
                      <label htmlFor="">Name</label>
                      <input id="name" name="stdName" type="text" placeholder="Full Name" className="form-control form-control-user" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="">Email</label>
                      <input id="email" name="stdEmail" type="email" placeholder="Email" className="form-control form-control-user" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="">Password</label>
                      <input id="password" name="empEmail" type="password" placeholder="Password" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="">Phone</label>
                      <input id="name" name="stdPhone" type="text" placeholder="Phone Number" className="form-control form-control-user" required />
                    </div>

                  </div>
                  <div className="row mt-10">
                    <div className="col-12 mt-4 d-flex justify-content-start">
                      <button className="btn btn-primary" type="submit">Register</button>
                    </div>
                    
                  </div>
                  <div className='row mt-3'>
                  <a href={'/login'} style={{ color: 'darkblue' }}>Registered user? Please click here</a>
                  </div>
                  <div className='row mt-4'>
                   
                      <div className="alert alert-primary col-8 ml-4" role="alert">
                          <span> Please fill the form with details to register</span>
                      </div>


                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Box sx={{ flexGrow: 1 }} style={{ marginTop: '10%', width: '50%', marginLeft: '30%' }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" />
          </Grid>

          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
          </Grid>

          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Phone Number" variant="outlined" />
          </Grid>

          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" />
          </Grid>

          <Button variant="contained" >Signup</Button>
          <Grid size={12}>
            <Typography>
              <Link to={'/'} style={{ color: 'darkblue' }}>Registered user? Please click here</Link>
            </Typography>

          </Grid>

        </Grid>
      </Box> */}

    </>
  )
}
export default Signup      