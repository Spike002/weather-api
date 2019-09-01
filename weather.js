window.addEventListener('load', () => {
  let long;
  let lat;
  const tempDescription = document.querySelector('#temperature-description')
  const tempDegree = document.querySelector('#temperature-degree')
  const locationTimeZone = document.querySelector('#location-timezone')

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( position => {
      long = -111.6585337; //position.coords.longitude;
      lat = 40.2338438;//position.coords.latitude;

      const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/6818998431cb2026ca503765b8feeb2c/${lat},${long}`
      fetch(api)
        .then (response =>{
          return response.json();
        })
        .then (data =>{

          tempDescription.textContent = data.currently.summary;
          tempDegree.textContent = data.currently.temperature;
          locationTimeZone.textContent = data.timezone;

          setIcons(data.currently.icon, document.querySelector('#icon'));
        })

    })
  }

  function setIcons(icon, iconID){
     const skycons = new Skycons({"color": "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase()

    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon])
  }
})
