const apiID="186e28de3dbdf39c5e63c7f4f3c1c7b9";

const cityID='1277333';
getWeather(cityID);
getFutureWeather(cityID);


let countryName=document.getElementById("country");
let backImage=document.getElementById('backImg');
let iconElement=document.querySelectorAll(".imgIcon");
let minTemp=document.getElementsByClassName("minTemp");
let maxTemp=document.getElementsByClassName("maxTemp");
//create an object

const weather={

};
weather.mintemperature1={
  unit:"celsius"
}
weather.maxtemperature1={
  unit:"celsius"
}

let mintemperature=new Array();
let maxtemperature=new Array();
let iconId=new Array();
let date_time=new Array();
let cityname;
let countryname;
let cnt;
let bkimage;

document.addEventListener('load',getFutureWeather("1277333"));

function getFutureWeather(cityID)
{
  let api=`https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=metric&APPID=${apiID}`;
  
  fetch(api)
    .then(result => {
    return result.json();
    })
    .then(function(result)
    {
     
      cityname=result.city.name;
      countryname=result.city.country;
      cnt=result.list.length;
      bkimage=result.list[0].weather[0].main;
      var j=0;
      for(let i=0;i<cnt;i=i+8)
      {

        mintemperature[j]=result.list[i].main.temp_min;
        maxtemperature[j]=result.list[i].main.temp_max;
        iconId[j]=result.list[i].weather[0].icon;
        date_time[j]=result.list[i].dt_txt;

          j++;
       
      }
    })
    .then(result=>{
      // displayFutureWeather(result);
 
      displayFutureWeather(result,cityname,countryname,cnt,bkimage,mintemperature,maxtemperature,iconId,date_time);
    })

}
function displayFutureWeather(result,cityname,countryname,cnt,bkimage,mintemperature,maxtemperature,iconId,date_time)
{     
      for(let i=1;i<5;i++)
      {

        // let iconElement=document.getElementById("imgIcon");
        // let minTemp=document.getElementById("minTemp");
        // let maxTemp=document.getElementById("maxTemp");

          
        // iconElement[i].innerHTML="HII";
       iconElement[i].innerHTML=`<img src="http://openweathermap.org/img/w/${iconId[i]}.png"/>`;
       minTemp[i].innerHTML=`${mintemperature[i]} 	&deg; `;
       maxTemp[i].innerHTML=` ${maxtemperature[i]} 	&deg;`;
  
          var date = new Date(date_time[i]);

          let hrs = date.getHours();
  
          var dd = date.getDate();
  
          var mm = date.getMonth()+1; 
          var yyyy = date.getFullYear();
          if(dd<10) 
          {
              // dd='0'+dd;
              dd=`0${dd}`;
          } 
  
          if(mm<10) 
          {
              mm='0'+mm;
          }
  
  
          let dateString= yyyy+'-'+mm+'-'+dd;
        
  
          let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          let d = new Date(dateString);
          let dayName = days[d.getDay()];
          let dname=   document.getElementsByClassName('dayname');

           dname[i].innerHTML = dayName;
  
        }    
}

function getWeather(cityID)
{
  let api=`https://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&APPID=${apiID}`;
  
  fetch(api)
    .then(result => {
    return result.json();
    })
    .then(function(result)
    {
        weather.mintemperature1.value=result.main.temp_min;
        weather.maxtemperature1.value=result.main.temp_max;
        weather.iconId1=result.weather[0].icon;
        weather.cityname=result.name;
        weather.countryname=result.sys.country;
        weather.date_time1=result.dt*1000;
        // weather.timezone1=result.timezone;
        weather.image=result.weather[0].main;
        console.log(result);
// console.log(weather.date_time);

    })
    .then(result=>{
    displayWeather(result);
    })

}

function displayWeather(result)
{
          // console.log(result.weather[0].main);
          iconElement[0].innerHTML=`<img src="http://openweathermap.org/img/w/${weather.iconId1}.png"/>`;
          minTemp[0].innerHTML=`${weather.mintemperature1.value} 	&deg; `;
          maxTemp[0].innerHTML=` ${weather.maxtemperature1.value} 	&deg;`;
          countryName.innerHTML=`${weather.cityname}, ${weather.countryname}`;
        
          switch(weather.image)
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
        // let dateAndTime=`"${weather.date_time}"`;
        // var diff=weather.date_time1-weather.timezone1;
        // var date = new Date(diff);


//         var aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
// aestTime = new Date(aestTime);
// console.log('AEST time: '+aestTime.toLocaleString())

// var asiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Shanghai"});
// asiaTime = new Date(asiaTime);
// console.log('Asia time: '+asiaTime.toLocaleString())

// var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
// usaTime = new Date(usaTime);
// console.log('USA time: '+usaTime.toLocaleString())

// var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
// indiaTime = new Date(indiaTime);
// console.log('India time: '+indiaTime.toLocaleString())
        var date = new Date(weather.date_time1);

        console.log(date);
        // date.toGMTString();
        // console.log(date);

        // let date = new Date();
        let hrs = date.getHours();

        var dd = date.getDate();

        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();
        if(dd<10) 
        {
            // dd='0'+dd;
            dd=`0${dd}`;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        }


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

