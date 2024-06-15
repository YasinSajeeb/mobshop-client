
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import MobileDetail from './MobileDetail';

const MobileDetails = () => {
    const mobileDetails = useLoaderData();
    const [productBooking, setProductBooking] = useState(null);
    console.log(mobileDetails);
    return (
        <div className='my-10 '>
            <h1 className='text-center font-bold text-4xl lg:mt-12 mb-20'>Pre-Owned <span className='text-[#fb6230]'> Mobiles</span></h1>
            <div className='grid lg:grid-cols-3  px-5 lg:px-28 gap-10'>
                {
                    mobileDetails.map(mobile=><MobileDetail
                    key={mobile._id}
                    mobile={mobile}
                    setProductBooking={setProductBooking}
                    ></MobileDetail>)
                }
            </div>
            {
                productBooking &&
                <BookingModal
                    productBooking={productBooking}
                    setProductBooking={setProductBooking}
                ></BookingModal>
            }
        </div>
    );
};

export default MobileDetails;
