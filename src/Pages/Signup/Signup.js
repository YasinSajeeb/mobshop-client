import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');

    const handleSignUp = async (data) => {
        setSignUPError('');
        try {
            const result = await createUser(data.email, data.password);
            const user = result.user;
            console.log('User created:', user);
            toast.success('User Created Successfully.');

            const userInfo = {
                displayName: data.name
            };

            await updateUser(userInfo);
            console.log('User updated with display name:', userInfo);

            const saveUser = async (name, email, role) => {
                const user = { name, email, role };
                const response = await fetch('https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                const responseData = await response.json();
                console.log("Save user response:", responseData);
                if (!response.ok) {
                    throw new Error(responseData.message || 'Failed to save user');
                }
            };

            await saveUser(data.name, data.email, data.role);
        } catch (error) {
            console.error('Sign up error:', error);
            setSignUPError(error.message);
        }
    }

    return (
        <div className='my-16'>
            <h2 className='text-4xl text-center font-bold'>Sign Up</h2>
            <div className='flex justify-center items-center shadow-lg w-96 mx-auto mt-10'>
                <div className='p-4'>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" {...register("name", { required: "Name is Required" })} className="input input-bordered w-96 max-w-xs" />
                            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                        </div>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" {...register("email", { required: true })} className="input input-bordered w-96 max-w-xs" />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be 6 characters long" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })} className="input input-bordered w-96 max-w-xs" />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        </div>

                        {/* Toggle */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">Select Your Profile</span></label>
                            <div className="input-group w-full">
                                <select {...register("role", { required: true })} className="select select-bordered">
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>
                        </div>

                        <input className='btn bg-[#fb6230] hover:bg-white hover:text-[#fb6230] border-0 w-full my-4 hover:border hover:border-[#fb6230]' value="Sign Up" type="submit" />
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    </form>
                    <p className='mt-2'>Already have an account? <Link className='text-blue-500' to="/login">Please Login...</Link></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline w-full mb-4'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
