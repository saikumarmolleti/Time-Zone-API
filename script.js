const TimeZone = document.getElementById('location');
const lat = document.getElementById('lat-coordinate');
const long = document.getElementById('log-coordinate');
const utc = document.getElementById('off-std');
const utcInSec = document.getElementById('off-std-sec');
const daylight = document.getElementById('off-dst');
const daylightInSec = document.getElementById('off-dst-sec');
const nation = document.getElementById('country');
const pincode = document.getElementById('postcode');
const cityLocation = document.getElementById('city');

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      coordinates(latitude, longitude);
    });
  } else {
    console.log(
      'kindly use another browser. Geolocation is not supported in this browser.'
    );
  }
};
const apiKey = '76b044e03fe04f9c93ab94a1c7612585';
// API
function coordinates(latitude, longitude) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentZone(data);
    })
    .catch((error) => console.log(error));
}

// uptade current Time Zone
function currentZone(data) {
  TimeZone.innerHTML = `Name of TimeZone: ${data.results[0].timezone.name}`;
  lat.innerHTML = `Lat: ${data.results[0].lat}`;
  long.innerHTML = `Long: ${data.results[0].lon}`;
  utc.innerHTML = `OffSet STD: ${data.results[0].timezone.offset_STD}`;
  utcInSec.innerHTML = `OffSet STD Seconds: ${data.results[0].timezone.offset_STD_seconds}`;
  daylight.innerHTML = `OffSet DST: ${data.results[0].timezone.offset_DST}`;
  daylightInSec.innerHTML = `OffSet DST Seconds: ${data.results[0].timezone.offset_DST_seconds}`;
  nation.innerHTML = `Country: ${data.results[0].country_code}`;
  pincode.innerHTML = `Postcode: ${data.results[0].postcode}`;
  cityLocation.innerHTML = `City: ${data.results[0].state_district}`;
}

const submit = document.getElementById('submit-button');
const input = document.getElementById('search-input');
const output = document.getElementById('search-output');

submit.addEventListener('click', () => {
  let address = input.value;
  if (address == '') {
    console.log('hi');
    output.innerHTML = `Please enter an address`;
    output.style.color = 'red';
  } else {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        resultsUpdate(data);
      })
      .catch((error) => console.log(error));
    output_box.innerHTML = `<p>Timezone could not be found!<p>`;
  }
});

// search Area updating
function resultsUpdate(data) {
  output.innerHTML = `
      <h1 id="result-title" >Your Result</h1>
      <div id="result">
      <div>Name of TimeZone: ${data.features[0].properties.timezone.name}</div>
      <div id="coordinates" >
      <div id="lat-coordinate" >Lat: ${data.features[0].properties.lat}</div>
      <div id="long-coordinate">Long: ${data.features[0].properties.lon}</div>
      </div>
      <div>OffSet STD: ${data.features[0].properties.timezone.offset_STD}</div>
      <div>OffSet STD Seconds: ${data.features[0].properties.timezone.offset_STD_seconds}</div>
      <div>OffSet DST: ${data.features[0].properties.timezone.offset_DST}</div>
      <div>OffSet DST Seconds: ${data.features[0].properties.timezone.offset_DST_seconds}</div>
      <div>Country: ${data.features[0].properties.country_code}</div>
      <div>Postcode: ${data.features[3].properties.postcode}</div>
      <div>city: ${data.features[0].properties.state_district}
      </div>
      </div>
      `;
}

// error message
function error(message) {
  output_box.innerHTML = `<p>Timezone could not be found!<p>`;
}
