'use client';

import React, { useState, useEffect } from 'react'
import { RestaurantData } from '../../types';
import RestaurantCard from '@/components/custom/RestaurantCard';

const home = () => {
  const [data, setData] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantData | null>(null);

  // Fetch restaurant data from API
  const getRestaurantData = async () => {
    try {
      const restaurantResponse = await fetch('http://localhost:5000/api/one-utama/restaurants')
      const restaurantData = await restaurantResponse.json()
      setData(restaurantData)
    } catch (error) {
      console.log(error)
      alert('Failed to fetch restaurant data')
    }
  }

  // generate a random restaurant
  const generateRandomRestaurant = () => {
    const randomIndex = Math.floor(Math.random() * data.length)
    setSelectedRestaurant(data[randomIndex])
  }

  useEffect(() => {
    getRestaurantData()
  }, [])
  
  return (
    <div className='p-6 w-full h-full'>
      <header className='text-black flex flex-col justify-center items-center'>
        <h1 className='text-xl font-bold'>One Utama Restaurant Roulette</h1>
      </header>
      <main className='flex flex-col items-center justify-center'>
        <p className='text-black my-6'>Don't know what to eat at 1 Utama? Family and friends saying they're ok with anything? Click Generate To Randomly select a restaurant at One Utama!</p>
          <button
          className='text-white font-semibold rounded-full border-[2px] bg-black px-4 py-2 w-fit' 
          onClick={() => generateRandomRestaurant()}
          >
            Generate
          </button>
          
          {selectedRestaurant && (
          <div className='flex flex-col justify-center items-center'>
            <RestaurantCard 
            restaurantData={selectedRestaurant}
            />
          </div>

        )}
      </main>
    </div>
  )
}

export default home

