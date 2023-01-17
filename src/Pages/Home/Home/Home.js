import React from 'react';
import Banner from '../Banner/Banner';
import Counter from '../Counter/Counter';
import HomeCategories from '../HomeCategories/HomeCategories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Counter></Counter>
            <HomeCategories></HomeCategories>
        </div>
    );
};

export default Home;