import React, {useEffect, useState} from 'react'
import fetchWeather from '../../apis/fetchWeather';

interface WeatherObjCondition {
    text?: string | null,
    icon?: string | null
}

interface WeatherObject {
    location: string,
    temperature_c?: number | null,
    condition?: string | null,
    icon?: string | undefined,

}

const Weather = () => {

    const [weatherObj, setWeatherObj] = useState<WeatherObject|null>(null);
    const [location, setLocation] = useState<string>("London");
    const [showUpdateLocation, setShowUpdateLocation] = useState(false);
    const [newLocation, setNewLocation] = useState(location);





    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLocation(event.target.value);
        setShowUpdateLocation(true);
    }

    const handleUpdateLocation = () => {
        setLocation(newLocation);
        handleCancelLocationUpdate();
        setNewLocation("")
    }

    const handleCancel = () => {
        handleCancelLocationUpdate();
    }
    
      const handleCancelLocationUpdate = () => {
        setShowUpdateLocation(false);
      };

    useEffect(() => {
        const getWeatherData = async() =>{
            try{
                const res = await fetchWeather.get('', {
                    params: {
                        location
                    }
                });
                const newWeatherObj: WeatherObject = {
                    location: res.data.location.name,
                    temperature_c: res.data.current.temp_c,
                    condition: res.data.current.condition.text,
                    icon: res.data.current.condition.icon
                }
                setWeatherObj(newWeatherObj);
            }catch(err){
                console.log(err)
                const newWeatherObj: WeatherObject = {
                    location: "London"
                }
                setWeatherObj(newWeatherObj);
            }
        }   

        getWeatherData();        

    }, [location])

    

  return (
    <div>
        <div className='weather-container'>
            
            <button className='weather-btn btn' onClick={() => setShowUpdateLocation(!showUpdateLocation)}>
                    <div className='weather-location'>
                        {weatherObj?.location}
                    </div>
                    <div className='weather-temp'>
                        {weatherObj?.temperature_c}°C 
                    </div>
                    <div className='weather-icon-container'>
                        <img className='weather-icon' src={weatherObj?.icon}
                         alt={`Icon showing weather describing ${weatherObj?.condition}  weather.`} />
                    </div>
            </button>

            <div className={showUpdateLocation ? "update-location open": "update-location"}>
                <h2>Change Location</h2>
                <label>
                  Update Location:
                  <input type="text" value={newLocation} onChange={handleLocationChange} />
                </label>
                <div className="update-location-actions">
                  <button className='btn' onClick={handleCancel}>Cancel</button>
                  <button className='btn' onClick={handleUpdateLocation}>Save</button>
              </div>
            </div>

        </div>

    </div>
  )
}

export default Weather