//Asynchronous Javascript And XML
//lets create a object to send XMLHttpRequest
const weatherDiv = document.querySelector(".weather");
//

function get(url) {
  return new Promise((resolve, reject) => {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url);
    httpRequest.onload = () => {
      if (httpRequest.status == 200) {
        resolve(httpRequest.response);
      } else {
        reject(Error("Something went Wrong!"));
      }
    };
    httpRequest.send();
  });
}
function temptoF(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}
function successHandler(data) {
  const dataObj = JSON.parse(data);
  const weatherCity = dataObj.name;
  const temperature = temptoF(dataObj.main.temp);

  const description = dataObj.weather[0].description;
  weatherDiv.innerText = `
    Fetching Data from weather api:
    
    Your current location : ${weatherCity}
    today's temperature is : ${temperature}°C
 
    weather update : ${description}
    wind speed : ${dataObj.wind.speed}`;
  console.log(dataObj);
}
function failHandler(status) {
  weatherDiv.innerText = `${status}`;
}

$(document).ready(() => {
  const apikey = "1716f3a81519707856067ebab2c3ed99";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=rangpur&appid=" + apikey;
  get(url)
    .then((response) => {
      successHandler(response);
    })
    .catch((status) => {
      failHandler(status);
    });
});
