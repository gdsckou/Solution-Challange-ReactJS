import React, {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import TextField from '@mui/material/TextField'

import Image from '../assets/3275434.jpg'
import { IconButton, InputAdornment, Button, ButtonBase } from '@mui/material'
import axios from 'axios';
import { toast } from 'react-toastify';




const forgot_password = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const clickEvent = async (e) => {
      e.preventDefault();
        console.log(email);

        try {
          const response = await axios.post('/api/v1/auth/forgot-password', {
            email
          });

          if(response.data) toast.info("Check your e-mail for resetting your password.")

        } catch (error) {
          toast.error("Your process has been failed.",error);
        
        }
    }

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        
        // Email format kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(!emailRegex.test(inputEmail));
        console.log(error);
      };
  return (
    <>
    
    <div className=" max-lg:auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" mx-16 col-span-1 p-4 items-start justify-center my-60 flex flex-col gap-8  ">
            
            <TextField required id="outlined-basic"
             fullWidth size="large"
              value={email} 
              onChange={handleEmailChange}
             label="E-mail" variant="outlined"/>
             <Button variant="outlined" onClick={clickEvent}>Reset Password</Button>
        </div>
        <div className="col-span-1  ">
        <img src={Image} className=" w-auto h-36"  />
        </div>
    </div>

    </>
  )
}

export default forgot_password