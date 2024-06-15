import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import toast from 'react-hot-toast';

const MyProducts = () => {

    const { user, logOut } = useContext(AuthContext);
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/myproducts?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('laptopZone-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json();
            })
            .then(data => setProducts(data))
    }, [user?.email, logOut])

    console.log(products);

    const handleDelete = id => {
        const proceed = window.confirm("Are you sure you want to delete the Product?")
        if (proceed) {
            fetch(`https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/products/${id}`,
                {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('deleted successfully');
                        const remaining = products.filter(rev => rev._id !== id);
                        setProducts(remaining);
                    }
                })
        }
    }

    const handleStatusUpdate = id => {
        fetch(`https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/myproducts/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Advertised' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = products.filter(odr => odr._id !== id);
                    const approving = products.find(odr => odr._id === id);
                    approving.status = 'Advertised'

                    const newOrders = [approving, ...remaining];
                    setProducts(newOrders);
                }
            })
    }


    return (
        <div className='lg:mr-28 '>
            <h1 className=' font-bold text-4xl mb-10'>My <span className='text-[#fb6230]'>Products</span></h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Sales Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            products &&
                            products?.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <th>
                                    <button onClick={() => handleDelete(product._id)} className='btn btn-circle mt-1 '>X</button>
                                </th>
                                <td>{product.title}</td>
                                <td>{product.resale_price}</td>
                                <td><button onClick={()=> handleStatusUpdate(product._id)} className='btn btn-sm'>{product.status ? product.status : 'Advertise'}</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;