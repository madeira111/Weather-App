const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')

const forecast = new Forecast()

const updataUI = (data) => {
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    const { cityDets, weather } = data

    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;

    //update image
    console.log(weather)
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    console.log(iconSrc)
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'

    time.setAttribute('src', timeSrc)

    // Remove the d-none if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }

}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateCity(city)
        .then(data => updataUI(data))
        .catch(err => console.log(err))


    //set local storage

    localStorage.setItem('city', city)

});


if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updataUI(data))
        .catch(err => console.log(err))
}

