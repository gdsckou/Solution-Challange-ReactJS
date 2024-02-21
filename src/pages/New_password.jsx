import React, {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import TextField from '@mui/material/TextField'

import Image from '../assets/5500661.jpg'
import { IconButton, InputAdornment, Button, ButtonBase } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';


const New_password = () => {

    const [password, setPass] = useState('');
    const [confirmPassword, setCheck] = useState('');
    const token = useParams();

    

    const clickEvent = async(e) => {
        
        if(password==confirmPassword){
          try {
            const response = axios.post(`/api/v1/auth/reset-password/${token}`, {
              password,
              confirmPassword,
            },
            {
              'Content-Type': 'application/json'
            }
            ); 

            if(response.data) toast.success(response.data.message);
          } catch (error) {
            toast.error("There was an accident happened: ",error);
          }

            console.log(true);
        }else{
            toast.error("Password and confirm password must be the same.");
            console.log(false);
        }
    }

    const handlePassChange = (e) => {
        const input= e.target.value;
        setPass(input);
      };

      const handleCheckChange = (e) => {
        const input= e.target.value;
        setCheck(input);
    
      };
  return (
    <>
    <Navbar/>
    <div className=" max-lg:auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" mx-16 col-span-1 p-4 items-start justify-center py-60 flex flex-col gap-5  ">
        <p className='text-5xl inline-block  align-middle'>
                Enter Your New Password!
            </p>
            <TextField required id="outlined-basic"
              size="medium"
              style={{ width: '300px' }}
              value={password}
              type='password'
              onChange={handlePassChange}
             label="New Password" variant="outlined"/>
             <TextField required id="outlined-basic"
              size="large"
              style={{ width: '300px' }}
              value={confirmPassword} 
              type='password'
              onChange={handleCheckChange}
             label="Confirm Password" variant="outlined"/>
             <Button variant="outlined" onClick={clickEvent}>Change Password</Button>
        </div>
        <div className="col-span-1 h-4/5 flex items-center justify-center   p-4">
        <img src={Image} className='object-scale-down  h-4/5' />
        </div>
    </div>

    </>
  )
}

export default New_password