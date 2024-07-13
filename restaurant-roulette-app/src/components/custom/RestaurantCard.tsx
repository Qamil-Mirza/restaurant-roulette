'use client';

import React, { useState } from 'react';
import { 
  FaPhoneAlt,
  FaSearchLocation
 } from "react-icons/fa";


interface RestaurantCardProps {
  restaurantName: string;
  restaurantLocation: string;
  restaurantContact: string;
  restaurantImg: string;
}

const RestaurantCard = ({restaurantName, restaurantLocation, restaurantContact, restaurantImg}: RestaurantCardProps) => {

  console.log(restaurantName, restaurantLocation, restaurantContact);
  return (
    <div className="my-6 bg-white flex flex-col rounded-xl overflow-hidden shadow-lg md:w-1/2">
      <img
        src={restaurantImg}
        alt="Picture of generated restaurant"
        className="rounded-t-xl"
      />
      <main className="p-3">
        <h1 className="font-bold text-lg">{restaurantName}</h1>
        <p className="text-sm">description fetch still WIP</p>
        <div className="flex justify-between text-sm mt-6">
          <div className='flex items-center space-x-1'>
            <FaPhoneAlt />
            <p>{restaurantContact}</p>
          </div>
          <div className='flex items-center space-x-1'>
            <FaSearchLocation />
            <p>{restaurantLocation}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RestaurantCard;
