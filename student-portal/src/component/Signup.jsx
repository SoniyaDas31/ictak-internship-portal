import { Box, Button, Grid, TextField, Typography, Link } from '@mui/material'
import React from 'react'

const Signup = () => {
    return(
        
        <Box sx={{ flexGrow: 1 }} style={{marginTop:'10%',width:'50%', marginLeft:'30%'}}>
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
         <Link to={'/'}style={{color:'darkblue'}}>Registered user? Please click here</Link>
         </Typography>
         
          </Grid>

        </Grid>
      </Box>    

    )
}
 export default Signup      