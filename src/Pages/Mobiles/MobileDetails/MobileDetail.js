
import React from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";

const MobileDetail = ({ mobile, setProductBooking }) => {
    const { title, image_url, details, location, original_price, posted, resale_price, years_of_use, seller_name } = mobile;
    return (
        <div>
            <div className="card card-compact shadow-xl rounded-none flex">
                <div>
                    <figure><img src={image_url} alt="Shoes" className='p-2 rounded-lg h-[350px]' /></figure>
                </div>
                <div className="card-body p-4">
                    <h2 className="card-title">{title}</h2>
                    <p className='font-medium mb-3'>{details}</p>
                    <hr />

                    <div className='flex justify-between '>
                        <span className='font-semibold text-lg'>Resale Price: {resale_price}tk</span>
                        <span className='font-semibold text-md'>Years of Use: {years_of_use}</span>
                    </div>
                    <hr />
                    <div className='flex justify-between '>
                        <span className='font-semibold text-md'>Original Price: {original_price}tk</span>
                        <span>Posted: {posted}</span>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <span className='font-semibold text-md'>Seller Name: {seller_name}</span>
                        <span className='flex items-center text-md'><FaMapMarkerAlt className='mt-1 mr-2'></FaMapMarkerAlt>{location}</span>

                    </div>


                    <label
                        onClick={() => setProductBooking(mobile)}
                        htmlFor="booking-modal"
                        className="btn bg-[#fb6230] hover:bg-white hover:text-[#fb6230] border-0 rounded-none mt-3 hover:border hover:border-[#fb6230]"
                    >Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default MobileDetail;
