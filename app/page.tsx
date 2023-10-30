"use client";
import Image from 'next/image'
import { useState } from 'react';
import styles from './page.module.css'
const { DateTime } = require("luxon");
// we are going to desing the user interface
//call the openweather api
// show the user data based off the API result
// group allows us to put content in different containers 
// we can have a group at the top
const API_KEY = "1d8a6a9a3894aa7054134bc1c2520540";
const UNSPLASH_API_KEY = "GcQdoAABZ2-VUNMdfEx3czS1foufHNqcdNZDGnPp8sk";
export default function Home() {
  const [cityInput, setCityInput] = useState("") //Seattle

  //to call an api, we are going to call it using the keyword await because we need to 
  // wait before the api is returned or the date
  const [weatherData, setWeatherData] = useState<any>({});
  async function getWeatherData() {
      //https://api.openweathermap.org/data/3.0/weather?q={city name}&appid={API key}
      // query data
      // if there is an error, throw error   // if not, save data
      try{
        const latAndLong = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${API_KEY}`
        )
        
        const [{lat, lon}] = await latAndLong.json();
          const serverResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          )
          
          const data = await serverResponse.json();
          console.log(data);
          if(data?.cod == "400") throw data;
          setWeatherData(data);
          console.log(weatherData)
      }
      catch(err) {
          console.log(err)
      }
  }
  function handleKeyPress(event: any) {
    if (event.key === 'Enter') {
      getWeatherData();
    }
  }
//{weatherData.main.temp}
//{weatherData.name}
  return (
    <div>
      <div className="bg-[url('https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] w-[100%] h-[100vh] bg-no-repeat bg-center bg-cover">
        <div className='rounded-3xl text-center px-4 py-4'>
        <input className='text-xl py-3 px-6 rounded-3xl border-solid border bg-[#ffffff]/[.01] border-[#ffffff]/[1]' type="text" placeholder='Enter City' onChange={(e) => {
              setCityInput(e.target.value)}} onKeyDown={handleKeyPress}/>
        </div>
          {Object.keys(weatherData).length !== 0 ? 
          
          
        <div className='flex justify-between max-w-[43.75rem] h-[43.75rem] m-auto px-4 py-0 flex-col relative top-[10%]'>
            <div className='w-full my-4 mx-auto'>
              <p className='text-2xl'>{weatherData.name}, {weatherData.sys.country}</p>
              <span className='text-8xl font-bold'>{Math.round(weatherData.main.temp)}&deg;C</span>
              <div className='relative right-[-90%] origin-[0_0] rotate-[269deg]'>
                <p className='text-2xl'>{weatherData.weather[0].main}</p>
              </div>
              
            </div>
            <div className="flex justify-evenly text-center w-[100%] mx-auto my-4 p-4 rounded-2xl bg-[#ffffff]/[.04]">
              <div>
                <span className='text-xl font-bold'>{Math.round(weatherData.main.feels_like)}&deg;C</span>
                <p className='text-xl'>Feels Like</p>
              </div>
              <div>
                <span className='text-xl font-bold'>{Math.round(weatherData.main.humidity)}%</span>
                <p className='text-xl'>Humidity</p>
              </div>
              <div>
                <span className='text-xl font-bold'>{Math.round(weatherData.wind.speed)}MPH</span>
                <p className='text-xl'>Wind Speed</p>
              </div>
            </div>
        </div>: null}
      </div>
          
        </div>
  )
}
