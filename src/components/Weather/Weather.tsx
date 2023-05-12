import React, {useEffect, useState} from 'react'
import fetchWeather from '../../apis/fetchWeather';
import { RevolvingDot } from 'react-loader-spinner';

interface WeatherObjCondition {
    text?: string | null,
    icon?: string | null
}

interface WeatherObject {
    location: string,
    temperature_c?: number | null,
    condition?: string | null,
    icon?: string | undefined,
    error: boolean,

}

const Weather = () => {

    const [weatherObj, setWeatherObj] = useState<WeatherObject|null>(null);
    const [location, setLocation] = useState<string>("London");
    const [weatherError, setWeatherError] = useState(false);
    const [showUpdateLocation, setShowUpdateLocation] = useState(false);
    const [newLocation, setNewLocation] = useState<string>(location);
    const [fetchingWeather, setFetchingWeather] = useState<boolean>(true);





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
            setFetchingWeather(true)
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
                    icon: res.data.current.condition.icon,
                    error: false
                }
                setWeatherObj(newWeatherObj);
                setFetchingWeather(false)
                setWeatherError(false)
            }catch(err){
                console.log(err)
                setWeatherError(true)
                const newWeatherObj: WeatherObject = {
                    location: "London",
                    error: true
                }
                setWeatherObj(newWeatherObj);
                setFetchingWeather(false)
            }
        }   

        getWeatherData();        

    }, [location])



    const weatherBtnRenderHelper = () => {
        if(weatherError){
           return ( <div className='weather-container'>
            <button className='weather-btn btn' onClick={() => setShowUpdateLocation(!showUpdateLocation)}>
                    <div className='weather-location'>
                        {weatherObj?.location}
                    </div>             
            </button>
            </div>)
        }
        else if(fetchingWeather){
            return(
        <div className='weather-container'>
                <button className='weather-btn btn'>
                    {/* need to fix height issues with this */}
                    Loading
                    {/* <RevolvingDot
                      color="#f2fafa"
                      secondaryColor=''
                      ariaLabel="revolving-dot-loading"
                      wrapperStyle={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: '100%',
                        width: '100%'
                      }}
                      wrapperClass=""
                      visible={true}
                        /> */}
                </button>
            </div>
            )
        }else{
            return(
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
            </div>
            )
        }
    }

    

  return (
    <div>
            
            {weatherBtnRenderHelper()}

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

  )
}

export default Weather