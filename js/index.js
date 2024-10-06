let search = document.getElementById('search');  

let todayDay = document.querySelector('.day');
let todayDate =document.querySelector('.date');

let todayLocation = document.getElementById('todayLocation');
let todayDegree = document.getElementById('todayDegree');
let todayImg = document.getElementById('todayImg');
let todayText= document.getElementById('todayText');
let humidity= document.getElementById('humidity');
let wind= document.getElementById('wind');
let compass= document.getElementById('compass');

let nextDay = document.querySelectorAll('.nextDay');

let fIcon = document.querySelectorAll('.fIcon');
let degree = document.querySelectorAll('.degree');
let small = document.querySelectorAll('small');
let text = document.querySelectorAll('.text');

search.addEventListener('input', async function(){
    displayAll(search.value.trim());
})

async function getData (city){ 
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f427a484de814d1aac2201538240510&q=${city}&days=3`);
    let data = await response.json();
    return data;
} 

function displayToday(data){
    let date = new Date();
    todayDay.innerText = date.toLocaleDateString("en-US",{weekday:"long"});
    todayDate.innerText = `${date.getDate()} ${date.toLocaleDateString("en-US",{month:"long"})}`;

    todayLocation.innerText = data.location.name;
    todayDegree.innerHTML = `${data.current.temp_c}<sup>o</sup>C`;
    todayImg.setAttribute("src",data.current.condition.icon);
    todayText.innerText = data.current.condition.text;
    humidity.innerHTML = `<img src="images/icon-umberella.png" alt=""> ${data.current.humidity}%`;
    wind.innerHTML = `<img src="images/icon-wind.png" alt=""> ${data.current.wind_kph}km/h`
    compass.innerHTML = `<img src="images/icon-compass.png" alt=""> ${data.current.wind_dir}`
}

function displayNext(data){
    let forecast = data.forecast.forecastday;

    for (let i = 0; i < forecast.length - 1; i++) { 
        let nextDayy = new Date(forecast[i + 1].date);
        nextDay[i].innerText = nextDayy.toLocaleDateString("en-US", { weekday: "long" });

        fIcon[i].setAttribute('src', forecast[i + 1].day.condition.icon); 
        degree[i].innerHTML = forecast[i + 1].day.maxtemp_c;
        small[i].innerHTML = forecast[i + 1].day.mintemp_c;
        text[i].innerHTML = forecast[i + 1].day.condition.text;
    }
}

async function displayAll(searchValue="cairo"){
    let data = await getData(searchValue);
    if(!data.error){
        displayToday(data);
        displayNext(data);
    }
}

displayAll();