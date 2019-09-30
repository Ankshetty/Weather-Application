class FutureWeather
{
  mintemperature=[];
  maxtemperature=[];
  iconId=[];
  date_time=[];
  cnt;
  constructor(data)
  {
    this.cityname=data.city.name;
    this.countryname=data.city.country;
    this.cnt=data.list.length;
    
  
    for(let i=0;i<this.cnt;i=i+8)
    {

      this.mintemperature.push(data.list[i].main.temp_min);
      this.maxtemperature.push(data.list[i].main.temp_max);
      this.iconId.push(data.list[i].weather[0].icon);
      this.date_time.push(data.list[i].dt_txt);

    }
  } 
}
class CurrentWeather
{
  currentMinTemperature;
  currentMaxTemperature;
  currentIconId;
  currentCityname;
  currentCountryname;
  currentDate_time;
  currentImage;


  constructor(data)
  {
    this.currentMinTemperature=data.main.temp_min;
    this.currentMaxTemperature=data.main.temp_max;
    this.currentIconId=data.weather[0].icon;
    this.currentCityname=data.name;
    this.currentCountryname=data.sys.country;
    this.currentDate_time=data.dt*1000;
    this.currentImage=data.weather[0].main;
    
  }
}

const apiID="186e28de3dbdf39c5e63c7f4f3c1c7b9";

document.addEventListener('load',getLocation());


function getLocation()
{
  if (navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
  else 
  { 
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) 
{
  let latitude=position.coords.latitude ;
  let longitude=position.coords.longitude;
  getWeather(latitude,longitude);
  getFutureWeather(latitude,longitude);
}



let countryName=document.getElementById("country");
let backImage=document.getElementById('backImg');
let iconElement=document.getElementsByClassName("imgIcon");
let minTemp=document.getElementsByClassName("minTemp");
let maxTemp=document.getElementsByClassName("maxTemp");




function getFutureWeather(latitude,longitude)
{
  let api=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiID}`;
  
  fetch(api)
    .then(result => {
    return result.json();
    })
    .then(function(result)
    {
     displayFutureWeather(result);   
    })
}

function displayFutureWeather(result)
{     
  let weatherFuture=new FutureWeather(result);

      for(let i=1;i<5;i++)
      {        
       iconElement[i].innerHTML=`<img src="http://openweathermap.org/img/w/${weatherFuture.iconId[i]}.png"/>`;
       minTemp[i].innerHTML=`${weatherFuture.mintemperature[i]} 	&deg; `;
       maxTemp[i].innerHTML=` ${weatherFuture.maxtemperature[i]} 	&deg;`;
  
          let date = new Date(weatherFuture.date_time[i]);
          let hrs = date.getHours();
          let dd = date.getDate(); 
          let mm = date.getMonth()+1; 
          let yyyy = date.getFullYear();
          let dateString= yyyy+'-'+mm+'-'+dd;
          let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          let d = new Date(dateString);
          let dayName = days[d.getDay()];
          let dname=   document.getElementsByClassName('dayname');
           dname[i].innerHTML = dayName;
  
        }    
}

function getWeather(latitude,longitude)
{
  let api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiID}`; 
  fetch(api)
    .then(result => {
    return result.json();
    })
    .then(result=>{
      displayWeather(result);   
    })
}

function displayWeather(result)
{
          let weatherCurrent=new CurrentWeather(result);
         
          iconElement[0].innerHTML=`<img src="http://openweathermap.org/img/w/${weatherCurrent.currentIconId}.png"/>`;
          minTemp[0].innerHTML=`${weatherCurrent.currentMinTemperature} 	&deg; `;
          maxTemp[0].innerHTML=` ${weatherCurrent.currentMaxTemperature} 	&deg;`;
          countryName.innerHTML=`${weatherCurrent.currentCityname}, ${weatherCurrent.currentCountryname}`;
        
          switch(weatherCurrent.currentImage)
          {
            case 'Clear':
                backImage.style.backgroundImage='url("images/clear.jpg")';
              break;

            case 'Clouds':
                backImage.style.backgroundImage='url("images/cloudy.jpg")';
              break;

            case 'Rain':
                backImage.style.backgroundImage='url("images/rain.jpg")';
              break;

            case 'Drizzle':
                backImage.style.backgroundImage="url('images/drizzle.jpg')";
              break;

            case 'Mist':
            case 'Fog':
            case 'Haze':
            case 'Dust':
                backImage.style.backgroundImage="url('images/fog.jpg')";

              break;

            case 'Thunderstorm':
                backImage.style.backgroundImage="url('images/storm.jpg')";
              break;

            case 'Snow':
                backImage.style.backgroundImage="url('images/snow.jpg')";
              break;

            default:
                backImage.style.backgroundImage="url('images/sunny.jpg')";
              break;
          }
        

        switch( weatherCurrent.currentCityname)
        {
          case 'Amsterdam': var actualTime = new Date().toLocaleString("en-US", {timeZone: "Europe/Amsterdam"});
                            date = new Date(actualTime);
                            date.toLocaleString();


            break;
          case 'Bangalore':var actualTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
          date = new Date(actualTime);
          date.toLocaleString();
          break;
          case  'London':var actualTime = new Date().toLocaleString("en-US", {timeZone: "Europe/London"});
          date = new Date(actualTime);
          date.toLocaleString();
            break;

          case 'Chicago':var actualTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
          date = new Date(actualTime);
          date.toLocaleString();
            break;
          case 'Abu Dhabi':var actualTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Dubai"});
          date = new Date(actualTime);
          date.toLocaleString();
          break;

          case 'New York':var actualTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
          date = new Date(actualTime);
          date.toLocaleString();
            break;
        }

        let hrs = date.getHours();

        let dd = date.getDate();

        let mm = date.getMonth()+1; 
        let yyyy = date.getFullYear();
        let dateString= yyyy+'-'+mm+'-'+dd;
        let greet;

          if (hrs < 12)
              greet = 'Good Morning';
          else if (hrs >= 12 && hrs <= 16)
              greet = 'Good Afternoon';
          else if( hrs>16 && hrs<=24)
              greet = 'Good Evening';


          document.getElementById('Greetings').innerHTML = greet;

        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let d = new Date(dateString);
        let dayName = days[d.getDay()];
        document.getElementById('dayname1').innerHTML = dayName;


}



function openNav() {
    document.getElementById("sideNav").style.width = "150px";
    document.getElementById("hamburger").style.display="none";
  }
  
  function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("hamburger").style.display="block";

  }

