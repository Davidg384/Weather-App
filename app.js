function main(){
  window.addEventListener('load', getLocation);
}

function getLocation(){
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const weatherAPI = `${proxy}https://api.darksky.net/forecast/08c69a8d8e6d9bde6b86fdebf6ceb709/${lat},${long}
      `;

      fetch(weatherAPI)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {temperature, summary} = data.currently;
          //Set DOM Elements using API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
        })
    })
  } else{
    alert('Location not available.');
  }
}

main();