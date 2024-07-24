// today variables
let todayname=document.getElementById("today_date_day_name");
let todaynum=document.getElementById("today_date_day_number");
let todaymonth=document.getElementById("today_date_month");
let todaylocation=document.getElementById("today_location");
let todaytemp=document.getElementById("today_temp");
let todcondimg=document.getElementById("today_condition_img");
let todcontxt=document.getElementById("today_condition_text");
let Humidity=document.getElementById("humidity");
let Wind=document.getElementById("wind");
let Compass=document.getElementById("compass_location");

//tomorrow,after variables
let tomname=document.getElementsByClassName("next_day_name");
let tomcondimg=document.getElementsByClassName("next_condition_img");
let tomnextmaxtmp=document.getElementsByClassName("next_max_temp");
let tomnextmintmp=document.getElementsByClassName("next_min_temp");
let tomnextxt=document.getElementsByClassName("next_min_temp");

// search variables
let searchinput=document.getElementById("searching");

// fetch api
async function getweatherdata(cityName){
    let weatherresponse=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a4e45cc16ee74788b2a24632240402&q=${cityName}&days=3`)
    let weatherdata=await weatherresponse.json();
    return weatherdata;
}
// display today data
function displaytoday(data){
    let todaydate=new Date();
    todayname.innerHTML=todaydate.toLocaleDateString("en-US",{weekday:"long"});
    todaynum.innerHTML=todaydate.getDate();
    todaymonth.innerHTML=todaydate.toLocaleDateString("en-US",{month:"long"});
    todaylocation.innerHTML=data.location.name;
    todaytemp.innerHTML=data.current.temp_c;
    todcondimg.setAttribute("src","https:"+data.current.condition.icon);
    todcontxt.innerHTML=data.current.condition.text;
    Humidity.innerHTML=data.current.humidity+"%";
    Wind.innerHTML=data.current.wind_kph+"km/h";
    Compass.innerHTML=data.current.wind_dir;
}
// display next days data
function displaytom(data){

    let forecastdata=data.forecast.forecastday;
    // 3ndna array L 2 objects el tany wel talt gwa forecast(el object ely shaylahom)
    for(var i=0;i<2;i++){
        let tomdate=new Date(forecastdata[i+1].date);
        
        tomname[i].innerHTML=tomdate.toLocaleDateString("en-US",{weekday:"long"});
        // tany object fe elarray(tomorrow) 3shan kda wakhed i+1
        tomnextmaxtmp[i].innerHTML=forecastdata[i+1].day.maxtemp_c;
        tomnextmintmp[i].innerHTML=forecastdata[i+1].day.mintemp_c;
        tomcondimg[i].setAttribute("src","https:"+forecastdata[i+1].day.condition.icon);
        tomnextxt[i].innerHTML=forecastdata[i+1].day.condition.text;
    }
}

// function to combine all the functions
async function combineall(city="London"){
    let weatherdata=await getweatherdata(city);
    // 3shan n7el moshkelt en akherna 3 7roof nktbhom fel search
    if(!weatherdata.error){
     displaytoday(weatherdata);
     displaytom(weatherdata);
    }
    
}
combineall();
searchinput.addEventListener("input",function(){
    combineall(searchinput.value);
})