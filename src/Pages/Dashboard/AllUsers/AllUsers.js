import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {

    const [users, setUsers] = useState([]);
  

    useEffect(() => {
        fetch('https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/allusers')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);


    const handleMakeAdmin = id => {
        fetch(`https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0){
                    toast.success('Make Admin Successful.')
                }
            })
    };

    const handleDelete = id => {
        const proceed = window.confirm("Are you sure you want to delete the User?")
        console.log(id);
        if (proceed) {
            fetch(`https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/users/${users.id}`,
                {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('deleted successfully');
                        const remaining = users.filter(rev => rev._id !== id);
                        setUsers(remaining);
                    }
                })
        }
    }
    return (
        <div>
            <h2 className="text-3xl">All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                                <td><button htmlFor="confirmation-modal" onClick={() => handleDelete(user._id)}
                                    className='btn btn-xs btn-danger'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;