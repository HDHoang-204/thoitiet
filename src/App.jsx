import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';

import './App.css'

function App() {

  const [weather, setWeather] = useState("")
  const [search, setSearch] = useState(null)
  const KEY = 'c543f90669da4c0792593901243008'

  async function handleOnSearch() {
    try {
      const reponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${weather}`);
      console.log(reponse?.data);
      setSearch(reponse?.data)
      setWeather("")
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className='main'>

      <h1>Xem Thời Tiết</h1>

      <div className="box">
        <form className="sbox" onClick={handleOnSearch}>
          <input
            className="stext" type="text" placeholder="Nhập nơi..."
            value={weather}
            onChange={(e) => {
              setWeather(e.target.value)
            }}
          />
          <a className="sbutton" type="submit" >
            <i className="fa fa-search"></i>
          </a>
        </form>
      </div>


      <div className='context'>
        {search && (<ul>
          <li>
            {search?.location?.localtime}
          </li>
          <li>
            <label>Thời tiết hiện tại</label>: {search?.location?.name} - {search?.location?.country}
          </li>
          <li className='icon'>
            <a href="https://www.weatherapi.com/">
              <img src={`${search?.current?.condition?.icon}`} alt="Weather icon" />
            </a>
          </li>
          <li className='nd'>
            {search?.current?.temp_c} <p>(°C)</p>
          </li>
          <li>
            <label>Nhiệt độ (°F)</label>: {search?.current?.temp_f}
          </li>
          <li>
            <label>Gió</label>: {search?.current?.wind_mph} kph
          </li>

        </ul>
        )}
      </div>



    </div >
  )
}

export default App
