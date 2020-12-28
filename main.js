const api={
    key:"634a96b054c56b12d1016fa4a988a635",
    baseurl:"https://api.openweathermap.org/data/2.5/"
}

var searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);
searchbox.addEventListener('keypress', () => {
    element.textContent = " ";
})

function setQuery(evt){
    if(evt.keyCode==13)
    {
        getResults(searchbox.value);
        console.log(searchbox.value);
        
    }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    var city=document.querySelector('.location .city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    var now= new Date();
    var date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);

    var temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;

    var weather_el=document.querySelector('.current .weather');
    weather_el.innerText=weather.weather[0].main;

    var hilow=document.querySelector('.hi-low');
    hilow.innerText=`${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c `
}

function dateBuilder(d){
    var months=["January","Feburary","March","April","May","June","July","August","September","October","November","December"]
    var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    var day=days[d.getDay()];
    //console.log(d.getFullYear());
    var date=d.getDate();
    var month=months[d.getMonth()];
    var year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

document.getElementsByClassName("search-box").target.reset();