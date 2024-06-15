import React from 'react';
import error from '../../assets/error.jfif'
const Error = () => {
    return (
        <div>
           <img className='w-full lg:h-screen' src={error} alt="" /> 
        </div>
    );
};

export default Error;