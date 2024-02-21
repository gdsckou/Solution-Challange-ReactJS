import illustration from '../assets/login.png';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { init } from '../redux/slices/user';
import { useNavigate } from 'react-router-dom';
import { HTTPMethods } from '../Constants/methods';
import endpoints from '../Constants/endpoints';


const validationSchema = Yup.object({
    email: Yup
        .string()
        .email("Invalid e-mail format")
        .required("Required field"),
    password: Yup
        .string()
        .required("Required field")
})


const SignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: 'berkaysalih188@gmail.com',
            password: '123456'
        },
        validationSchema,
        onSubmit: values => {
            
            HTTPMethods.SignIn(
                endpoints.Auth.SignIn, 
                {
                    email: values.email,
                    password: values.password
                },
                {
                    'Content-Type': 'application/json'
                }
            )
                .then((response: any) => {
                    const data = response.data;
                    const { token } = data;

                    localStorage.setItem("token", token);

                    dispatch(init({
                        email: data.user.email,
                        name: data.user.name,
                        username: data.user.username,
                        surname: data.user.surname,
                        points: data.user.points,
                        location: data.user.location,
                        phoneNumber: data.user.phoneNumber,
                        city: data.user.city,
                    }))

                    localStorage.setItem('email', data.user.email)
                    localStorage.setItem('name', data.user.name)
                    localStorage.setItem('username', data.user.username)
                    localStorage.setItem('surname', data.user.surname)
                    localStorage.setItem('points', data.user.points)
                    localStorage.setItem('location', data.user.location)
                    localStorage.setItem('phoneNumber', data.user.phoneNumber)
                    localStorage.setItem('city', data.user.city)

                    localStorage.setItem('isAuthenticated', "true");

                    navigate('/');
                })
                .catch((error: any) => {
                    if (error.response && error.response.data && error.response.data.msg) {
                        toast.error(error.response.data.msg, { autoClose: 1500 });
                    }
                    else {
                        toast.error("An error occured while signing in", { autoClose: 1500 });
                    }
                })


        }
    });

    return (
        <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 md:p-20">
            <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center p-4 gap-4">
                <h1 className="text-blue-950 font-bold text-xl md:text-3xl">
                    Welfare
                </h1>
                <TextField
                    variant="outlined"
                    id="email"
                    name="email"
                    label="E-mail"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    variant="outlined"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                
                <p className="font-bold text-md text-blue-900 cursor-pointer"><a href="/forgot-password">Forgot password?</a></p>
                <Button
                    type='submit'
                    className="text-green-500"
                    variant="outlined"
                    size="large"
                >
                    Sign In
                </Button>
            </form>
            <div className="flex justify-center items-center">
                <img className="max-w-full h-auto" src={illustration} alt="" />
            </div>
        </div>
    );
}


export default SignIn;
