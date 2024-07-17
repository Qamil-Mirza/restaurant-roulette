'use client';

import React, { useState } from 'react';
import { RestaurantData } from '../../../types';
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

import { 
  FaConciergeBell,
  FaDollarSign,
  FaInfo,
  FaLink,
  FaPhoneAlt,
  FaSearchLocation
 } from "react-icons/fa";


interface RestaurantCardProps {
  restaurantData: RestaurantData;
}

const RestaurantCard = ({restaurantData}: RestaurantCardProps) => {

  const moreInfoExists = restaurantData.description != 'No description available'
  console.log(restaurantData);
  return (
    <div className="my-6 bg-white flex flex-col rounded-xl overflow-hidden shadow-lg md:w-1/2">
      <img
        src={restaurantData.img_link}
        alt="Picture of generated restaurant"
        className="rounded-t-xl"
      />
      <main className='p-3'>
        <h1 className="font-bold text-lg">{restaurantData.restaurant_name}</h1>
        <ScrollArea className='text-sm mt-2 h-[4rem]'>{restaurantData.description}</ScrollArea>
        <div className="flex justify-between text-sm mt-6">
          <div className='flex items-center space-x-1'>
            <FaPhoneAlt />
            <p>{restaurantData.contact}</p>
          </div>
          <div className='flex items-center space-x-1'>
            <FaSearchLocation />
            <p>{restaurantData.location}</p>
          </div>
        </div>
        {moreInfoExists && (
          <>
          <hr className='mt-2'/>
          <div className='mt-6 mb-3 flex flex-wrap space-x-2'>
            <Badge className='flex flex-wrap justify-center items-center mt-2 p-2'>
              <FaConciergeBell />
              <p className='text-xs ml-2'>{restaurantData.cuisine}</p>
            </Badge>
            <Badge className='flex flex-wrap justify-center items-center mt-2 p-2'>
              <FaDollarSign />
              <p className='text-xs ml-2'>{restaurantData.price_range}</p>
            </Badge>
            {restaurantData.other_info && (
              <Badge className='flex flex-wrap justify-center items-center mt-2 p-2'>
                <p className='text-xs'>{restaurantData.other_info}</p>
              </Badge>
            )}
            <a href={restaurantData.restaurant_website_link}>
              <Badge className='flex flex-wrap justify-center items-center mt-2 p-2'>
                <FaLink />
                <p className='text-xs ml-2'>Website</p>
              </Badge>
            </a>
          </div>
          </>
        )}
      </main>
    </div>
  );
}

export default RestaurantCard;
