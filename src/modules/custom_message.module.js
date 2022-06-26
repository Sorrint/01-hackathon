import { Module } from '../core/module'
import { randomCity } from '../assets/cities'
import { addEventContainer } from '../utils'

export class CustomMessage extends Module {
    eventContainer
    weatherBlockContainer
    constructor(type, text) {
        super(type, text)
        
        
    }

    async trigger() {
        try {
            addEventContainer(this.type);
            const W_URL = `https://api.openweathermap.org/data/2.5/weather?q=${randomCity()}&appid=3574141fd05c9364f6d45f88f3898d1d&units=metric`
            
            const response = await fetch(W_URL)
            const weather = await response.json()
            const temp = Math.round(weather.main.temp)
            const eventContainer = document.querySelector(`.${this.type}`);

            const weatherBlock = document.createElement('div')
            weatherBlock.className = 'weather-block'

            const weatherH2 = document.createElement('h2')

            const iconAndTempBlock = document.createElement('div')
            iconAndTempBlock.className = 'icon_and_temp_block'

            const weatherDescription = document.createElement('p')
            weatherDescription.className = 'weather_description'

            const tempPara = document.createElement('p')

            weatherH2.textContent = `${weather.name}, ${weather.sys.country} `
            tempPara.textContent = `${temp} C`
            const weatherIcon = document.createElement('img')
            weatherIcon.className = 'weather_icon'
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
            weatherDescription.textContent = `${weather.weather[0].description}`

            eventContainer.prepend(weatherBlock);
            weatherBlock.append(weatherH2, iconAndTempBlock, weatherDescription)
            iconAndTempBlock.append(weatherIcon, tempPara)

            setTimeout(() => {
                weatherBlock.remove()
            }, 4000)

        } catch (error) {
            console.error('Произошла ошибка в получении данных...')
        }
        finally {
        }
    }
}