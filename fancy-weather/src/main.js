

const time=document.querySelector('.time');
const currentDate =document.querySelector('.date');
const farengheits=document.querySelector('.farengheit')
let tempMetric="units=metric"
let dataLocation;
let dataTemp;
const celcius=document.querySelector('.celcius');
let city="Minsk";
let currentCity=document.querySelector('.current-city')
const url="https://ipinfo.io/json?token=07485324dbcde1";
let img =new Image();

async function getGeoLocation() {
    let a= await fetch(url);
   const b= await a.json();
   dataLocation= await b;
   return await b;
    
}
getGeoLocation().then(()=>{
    city=dataLocation.city;
    currentCity.textContent=dataLocation.city;
    document.querySelector('.geolocation_latitude').textContent=dataLocation.loc.split(',')[0];
    document.querySelector('.geolocation_longitude').textContent=dataLocation.loc.split(',')[1];
    document.querySelector('.current-country').textContent=dataLocation.country;
});
function updateTime(){
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let date = new Date(); // (*)
    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    time.textContent=hours+':'+minutes;
    currentDate.textContent=days[date.getDay()]+" "+date.getDate()+" "+months[date.getMonth()];

}
async function getLinkToImage() {
    let url = `https://api.unsplash.com/photos/random?query=winter+${dataTemp.list[0].dt_txt.substr(11,5)}+${dataTemp.list[0].weather[0].description}&client_id=495dce78be509b81738b1a4af45f868ac6c2ade3fc3e6d89dc0fa5bbed473d2f`;
    let res= await fetch(url);
    let resJson = await res.json();
    img = await resJson;
    document.querySelector('body').style.backgroundImage=`url(${img.urls.full}`;
    }

function clockStart(){
    
    timerID=setInterval(updateTime,60000);
    updateTime();
}
clockStart();
async function getTemp(){
    const tempURL=`http://api.openweathermap.org/data/2.5/forecast?q=${city}&type=like&${tempMetric}&APPID=56c5a38b11c4c56fbcf54f474a72d731`;
    let res = await fetch(tempURL);
    const resJson = await res.json();
    const futureWeather=document.querySelector('.future-weather');
    dataTemp=await resJson;
    getLinkToImage();
    const weatherDescriptionList=document.querySelector('.weather_description').childNodes[1];
    document.querySelector('.tempreture').textContent=Math.round(dataTemp.list[0].main.temp)+"°";
    weatherDescriptionList.childNodes[1].textContent=dataTemp.list[0].weather[0].description;
    weatherDescriptionList.childNodes[3].childNodes[1].textContent=Math.round(dataTemp.list[0].main.feels_like)+"°";
    weatherDescriptionList.childNodes[5].childNodes[1].textContent=dataTemp.list[0].wind.speed;
    weatherDescriptionList.childNodes[7].childNodes[1].textContent=dataTemp.list[0].main.humidity;
    document.querySelector('.geolocation_latitude').textContent=dataTemp.city.coord.lat;
    document.querySelector('.geolocation_longitude').textContent=dataTemp.city.coord.lon;
    document.querySelector('.current-country').textContent=dataTemp.city.country;
    document.querySelector('.current-city').textContent=dataTemp.city.name;
    document.querySelector('.weather_image').childNodes[1].src=`http://openweathermap.org/img/w/${dataTemp.list[0].weather[0].icon}.png`;
    for(let i=0;i<3;i++){
        futureWeather.childNodes[2*i+1].childNodes[3].childNodes[3].src=`http://openweathermap.org/img/w/${dataTemp.list[9+9*i].weather[0].icon}.png`;
        futureWeather.childNodes[2*i+1].childNodes[3].childNodes[1].textContent=Math.round(dataTemp.list[9+9*i].main.temp);
    }
}
getTemp();
celcius.addEventListener("click",()=>{
    if(farengheits.classList.length===2){
    farengheits.classList.remove('celcius-farengheit-active');
    celcius.classList.add('celcius-farengheit-active');
    tempMetric="units=metric";
    getTemp();
    }

})
farengheits.addEventListener("click",()=>{
    if(celcius.classList.length===2){
    celcius.classList.remove('celcius-farengheit-active');
    farengheits.classList.add('celcius-farengheit-active');
    tempMetric="units=imperial";
    getTemp();
    }
})

  

   document.querySelector('.header__search_button').addEventListener("click",()=>{
       city=document.querySelector('.search-city').value;
       getTemp();
       document.querySelector('.geolocation_latitude').textContent=dataTemp.city.coord.lat;
    document.querySelector('.geolocation_longitude').textContent=dataTemp.city.coord.lon;
    document.querySelector('.current-country').textContent=dataTemp.city.country;
    document.querySelector('.current-city').textContent=dataTemp.city.name;
 })
document.querySelector('.header__switching-pannel_change-bg').addEventListener("click",()=>{
    getLinkToImage();
    
    
})