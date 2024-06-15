import React from 'react';
import { Link } from 'react-router-dom';

const HomeCategory = ({category}) => {
    const {category:brand, logo, id} = category;
    return (
        <div>
            <Link to={`/mobiles/${id}`}>
                <div className="card bg-base-100 shadow-xl transition ease-in-out delay-130  hover:-translate-y-1 hover:scale-110 duration-200 border-t-8 border-yellow-500 rounded-t-lg">
                    <figure className="p4">
                        <img src={logo} alt="" className="rounded-xl h-16 mt-8" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title font-bold">{brand}</h2>

                    </div>
                </div>
            </Link>
        </div>
    );
};

export default HomeCategory;