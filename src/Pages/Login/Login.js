import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-hot-toast';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, providerLogin, updateUser } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    // const [loginUserEmail, setLoginUserEmail] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    // const [createdUserEmail, setCreatedUserEmail] = useState('')

    const from = location.state?.from?.pathname || '/';

    

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Logged in Successfully');
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error))
    }

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // setLoginUserEmail(data.email);
                const userInfo = {
                    displayName: data.name
                }
                console.log(userInfo);
                updateUser(userInfo)
                    .then(() => {
                        // saveUser(data.name, data.email, data.role);
                    })
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }

    // const saveUser = (name, email, role) => {
    //     const user = { name, email, role };
    //     fetch('https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/users', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log("save user", data);
    //             setCreatedUserEmail(email);
    //         })
    // }

    return (
        <div className='my-16'>
            <h2 className='text-4xl text-center font-bold'>Login</h2>
            <div className='flex justify-center items-center shadow-lg w-96 mx-auto mt-10'>
                <div className='p-4'>

                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"> <span className="label-text">Email</span></label>
                            <input type="text"
                                {...register("email", {
                                    required: "Email Address is required"
                                })}
                                className="input input-bordered w-96 max-w-xs" />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"> <span className="label-text">Password</span></label>
                            <input type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })}
                                className="input input-bordered w-96 max-w-xs" />
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <input className='btn bg-[#fb6230] hover:bg-white hover:text-[#fb6230] border-0 w-full my-4 hover:border hover:border-[#fb6230]' value="Login" type="submit" />
                        <div>
                            {loginError && <p className='text-red-600'>{loginError}</p>}
                        </div>
                    </form>
                    <p>New to MobShop? <Link className='text-blue-600' to="/signup">Create new Account...</Link></p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE<FaGoogle className='ml-2'></FaGoogle></button>
                </div>
            </div>
        </div>
    );
};

export default Login;