"use client"; // This is a client component

import Image from 'next/image'
import rainy from '../public/rainy.png';
import {AiOutlineSearch} from 'react-icons/ai';
import { useState } from 'react';
import axios from 'axios';
import {BsCloudHaze2Fill, BsCloudDrizzleFill, BsGlobeAmericas,} from 'react-icons/bs';
import {IoMdCloudy, IoMdSunny, IoMdRainy, IoMdSnow, IoMdThunderstorm,} from 'react-icons/io';

export default function Home() {
  const[data, setData] = useState({})
  const[location, setLocation] = useState('')
  const [cityFound, setCityFound] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);





  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=548fda029c0956a327ef3a43c2695668&units=metric`

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clouds':
        return <IoMdCloudy />;
      case 'Haze':
        return <BsCloudHaze2Fill />;
      case 'Rain':
        return <IoMdRainy />;
      case 'Clear':
        return <IoMdSunny />;
      case 'Snow':
        return <IoMdSnow />;
      case 'Thunderstorm':
        return <IoMdThunderstorm />;
      default:
        return null;
    }
  };

  
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      if (location.trim() === '') {
        alert('You have to enter a city');
        return; // Stop execution if the location is empty
      }
  
      axios.get(url).then((response) => {
        setData(response.data);
        setCityFound(true); // City found
        setSearchPerformed(true); // Set searchPerformed to true after the search is performed
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          setCityFound(false); // City not found
          setSearchPerformed(true);
        } else {
          console.error('An error occurred:', error);
        }
      });
  
      setLocation('');
    }
  };
  
  
  
  


  return (
    <div className='bg-cyan-400 flex justify-center' >
    <main className='bg-cyan-400 font-outfit w-3/4 min-h-screen'>
      <section>
        <div className='flex justify-center pt-10'>
          <h2>Weather app</h2>
        </div>
        <div className='flex justify-center pt-2'>
        <BsGlobeAmericas size={82}/>
        </div>
        <div className='justify-center pt-10'>
          <div className='flex justify-center'>
        <h3 className='text-xl pb-2'>Search location</h3>
        </div>
        <div className='flex justify-center'>
        <label class="relative block">
          <span class="sr-only">Search</span>
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <AiOutlineSearch className='fill-gray-400'/>
            </span>
            <input class="placeholder:italic placeholder:text-slate-400 block text-gray-800 bg-white w-100 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
            placeholder="City" type="text" name="search" value={location} onChange={event => setLocation(event.target.value)} onKeyUp={searchLocation}/>
            </label>
            </div>
            </div>
            {searchPerformed && cityFound === true ? (
            <div className='flex justify-center pt-6'>
            <div className='text-center p-8 rounded-xl bg-opacity-10 bg-white w-4/5 shadow-lg max-w-xs min-w-max'>
            
            <div className='text-6xl flex justify-center'>{data.weather && data.weather[0] && getWeatherIcon(data.weather[0].main)}</div>

            
            <p className='text-xl'>{data.weather && data.weather[0] && data.weather[0].main}</p>

          <h2 className='text-4xl pt-4 pb-2'>{data.name}</h2>
          <div className='flex justify-center gap'>
          {data.main ? <h2 className='text-6xl font-bold'>{data.main.temp.toFixed()}</h2> : null}<p className='text-s pt-1 font-bold'>°C</p>
          </div>
        </div>
        </div>
        ) : null }
        {searchPerformed && cityFound === false ? (
          <div className='flex justify-center pt-6'>
            <div className='text-center p-8 rounded-xl bg-opacity-80 bg-red-500 w-4/5 shadow-lg max-w-xs min-w-max'>
              <p>Did not find your city, please try again!</p>
            </div>
          </div>
          ) : null}
          
          {searchPerformed && cityFound === true ? ( // Show the following divs only if searchPerformed is true
        <div className='flex justify-center pt-6 pb-10'>
            <div className='flex justify-evenly py-2 rounded-xl bg-opacity-10 bg-white shadow-lg text-center w-3/5 max-w-xs min-w-max'>
              <div className='feels'>
                <div className='flex justify-center'>
                  {data.main ? <p className='text-s font-bold'>{data.main.feels_like.toFixed()}</p> : null}<p className='font-bold'>°C</p>
                  </div>
                  <p>Feels like</p>
                  </div>
                  <div className='humidity'>
                    <div className='flex justify-center'>
                      {data.main ? <p className='text-s font-bold'>{data.main.humidity}</p> : null}<p className='font-bold'>%</p>
                      </div>
                      <p>Humidity</p>
                      </div>
                      <div className='wind'>
                        <div className='flex justify-center'>
                          {data.main ? <p className='text-s font-bold pr-1'>{data.wind.speed.toFixed()}</p> : null}<p className='font-bold'>MPH</p>
                          </div>
                          <p>Wind</p>
                          </div>
            </div>
          </div>
          ) : null}

      </section>
      <section>
        <div className='py-10 text-xs flex justify-center'>
          <p>Design by Martin Olsson - 2023</p>
        </div>
      </section>
    </main>
    </div>
  )
}
