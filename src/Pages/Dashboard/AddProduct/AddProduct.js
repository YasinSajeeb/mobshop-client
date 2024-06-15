import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loader from '../../Shared/Loader/Loader';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const date = format(new Date(), "PP");
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { data: brands = [], isLoading } = useQuery({
        queryKey: ['Brand'],
        queryFn: async () => {
            const res = await fetch('https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/mobiles');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loader />;
    }

    const handleAddProduct = async (data) => {
        console.log(data);

        if (!imageHostKey) {
            console.error("Image host key is not defined");
            toast.error("Image host key is not defined");
            return;
        }

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
        
        try {
            const imgRes = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const imgData = await imgRes.json();

            if (!imgData.success) {
                console.error("Image upload failed:", imgData);
                toast.error("Image upload failed");
                return;
            }

            console.log("Image URL:", imgData.data.url);

            const product = {
                seller_name: user.displayName,
                title: data.productName,
                location: data.location,
                resale_price: data.resalePrice,
                original_price: data.originalPrice,
                years_of_use: data.purchaseDate,
                image_url: imgData.data.url,
                details: data.details,
                posted: date,
                id: data.category,
                email: user.email
            };

            const res = await fetch('https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/products', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(product)
            });

            const result = await res.json();

            if (result.acknowledged) {
                console.log("Product added:", result);
                toast.success("Product added successfully");
                navigate('/dashboard/myproducts');
            } else {
                console.error("Failed to add product:", result);
                toast.error("Failed to add product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Error adding product");
        }
    };

    return (
        <div className='ml-10'>
            <h2 className='text-4xl font-bold ml-20'>Add Product</h2>
            <div className='flex justify-center items-center shadow-xl w-96 mt-10'>
                <div className='p-4'>
                    <form onSubmit={handleSubmit(handleAddProduct)}>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"><span className="label-text">Product Name</span></label>
                            <input type="text" {...register("productName", {
                                required: "Product Name is Required"
                            })} className="input input-bordered w-96 max-w-xs" />
                            {errors.productName && <p className='text-red-500'>{errors.productName.message}</p>}
                        </div>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"><span className="label-text">Resale Price</span></label>
                            <input type="text" {...register("resalePrice", {
                                required: "Resale Price is Required"
                            })} className="input input-bordered w-96 max-w-xs" />
                            {errors.resalePrice && <p className='text-red-500'>{errors.resalePrice.message}</p>}
                        </div>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"><span className="label-text">Original Price</span></label>
                            <input type="text" {...register("originalPrice", {
                                required: "Original Price is Required"
                            })} className="input input-bordered w-96 max-w-xs" />
                            {errors.originalPrice && <p className='text-red-500'>{errors.originalPrice.message}</p>}
                        </div>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"><span className="label-text">Mobile Number</span></label>
                            <input type="text" {...register("number", {
                                required: "Mobile Number is Required"
                            })} className="input input-bordered w-96 max-w-xs" />
                            {errors.number && <p className='text-red-500'>{errors.number.message}</p>}
                        </div>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"><span className="label-text">Location</span></label>
                            <input type="text" {...register("location", {
                                required: "Location is Required"
                            })} className="input input-bordered w-96 max-w-xs" />
                            {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                        </div>
                        <div className="form-control w-96 max-w-xs">
                            <label className="label"><span className="label-text">Year of Purchase</span></label>
                            <input type="text" {...register("purchaseDate", {
                                required: "Year of Purchase is Required"
                            })} className="input input-bordered w-96 max-w-xs" />
                            {errors.purchaseDate && <p className='text-red-500'>{errors.purchaseDate.message}</p>}
                        </div>
                        <div className='flex justify-between'>
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text">Product Condition</span></label>
                                <div className="input-group w-full">
                                    <select {...register("condition", { required: true })}
                                        className="select select-bordered">
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text">Product Category</span></label>
                                <div className="input-group w-full">
                                    <select {...register("category", { required: true })}
                                        className="select select-bordered">
                                        {brands.map(brand => (
                                            <option key={brand._id} value={brand.id}>
                                                {brand.category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <textarea {...register("details", { required: true })}
                            className="textarea textarea-info mt-5 w-full" placeholder="Product Details">
                        </textarea>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Photo</span></label>
                            <input type="file" {...register("image", { required: "Photo is Required" })}
                                className="file-input file-input-bordered w-full max-w-xs" />
                            {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                        </div>
                        <input className='btn bg-[#fb6230] hover:bg-white hover:text-[#fb6230] border-0 w-full my-4 hover:border hover:border-[#fb6230]' value="Add Product" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;