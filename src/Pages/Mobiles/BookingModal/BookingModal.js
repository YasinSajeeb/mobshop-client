import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ productBooking, setProductBooking }) => {

    const { title, resale_price, image_url} = productBooking;

    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const price = form.price.value;
        const phone = form.phone.value;
        const meetingLocation = form.meetingLocation.value;

        const booking = {
            name: name,
            productBooking: title,
            image_url: image_url,
            email,
            phone,
            meetingLocation,
            price,

        }

        console.log(booking);
        

        fetch('https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.acknowledged) {
                setProductBooking(null);
                toast.success('Booking confirmed');
            }
            else{
                toast.error(data.message);
            }


            })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold lg:w-96">{title}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>

                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />

                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />

                        <input name="price" type="text" defaultValue={resale_price} disabled placeholder="Price in TK" className="input w-full input-bordered" />

                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" required />

                        <input name="meetingLocation" type="text" placeholder="Meeting Location" className="input w-full input-bordered" required />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;