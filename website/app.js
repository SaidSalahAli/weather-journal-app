//for a better load performance
setTimeout(() => {
  document.querySelector("body").style.opacity = "1";
}, 1000);

const date = document.getElementById("date");
const temp = document.getElementById("temp");
const city = document.getElementById("city");
const description = document.getElementById("description");
const content = document.getElementById("content");
const icon = document.getElementById("icon");
const show = document.querySelector(".right");
const error = document.querySelector(".content");
// Personal API Key for OpenWeatherMap API

const apiKey = 'cc538c3a931aac8684a99fd5c0afc05e&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// Event listener to add function to existing HTML DOM element
const generate = document.getElementById("generate");
/* Function called by event listener */
generate.addEventListener("click", async (e) => {
  e.preventDefault();
  const zipCode = document.getElementById("zip").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
  // check input not empty
  if (zipCode !== "" && zipCode.length == 5) {
    getWeather(apiUrl)
      .then((data) => { postData("/add", data);
      }).then(() => { getData().then((allData) => {
          updateUI(allData);
        });
      });
  } else {
    alert("Please fill all input and zip code 5 digit");
  }
});

/* Function to GET Web API Data*/
const getWeather = async (url) => {
  const feelings = document.getElementById("feelings").value;
  const res = await fetch(url);
  // check validation input
  if (res.status === 404 || res.status === 400) {
    error.style.display = "block";
    error.innerHTML = "Please write a valid zip code!";
    error.style.backgroundColor = "#242424";
    show.classList.remove("active");
  } else {
    error.style.display = "none";
  }
  try {
    const data = await res.json();
    const newData = {
      date: newDate,
      temp: Math.round(data.main.temp),
      city: data.name,
      country: data.sys.country,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      content: feelings,
    };
    return newData;
  } catch (e) {
    console.log(e);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

/* Function to GET Project Data */
const getData = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    return allData;
  } catch (error) {
    console.log("error", error);
  }
};

const tempMin = document.getElementById("min");
const tempMax = document.getElementById("max");
/* Function to updateUI */
const updateUI = (allData) => {
  // check all data not empty
  if (
    allData.date !== undefined &&
    allData.temp !== undefined &&
    allData.content !== undefined &&
    allData.city !== undefined &&
    allData.country !== undefined &&
    allData.description !== undefined &&
    allData.icon !== undefined &&
    allData.tempMin !== undefined &&
    allData.tempMax !== undefined
  ) {
    date.innerHTML = `Today: ${allData.date}`;
    temp.innerHTML = `${allData.temp} °`;
    content.innerHTML = `NOTE: ${allData.content}`;
    city.innerHTML = `${allData.city}, ${allData.country} Weather`;
    description.innerHTML = `description: ${allData.description}`;
    icon.innerHTML = `
            <img src='http://openweathermap.org/img/w/${allData.icon}.png'
            alt='Icon depicting current weather.'>
        `;
    tempMin.innerHTML = allData.tempMin + " °/";
    tempMax.innerHTML = allData.tempMax + " °";
    showResult(); // Call function Add Class active
  }
};

// Add Class active
const showResult = () => {
  show.classList.add("active");
};
