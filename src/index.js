import "@babel/polyfill";
import './main.css';
import { writingEffect, CountDown } from './js/index'

//Variables
const timer = document.querySelector("#timer");
const stop = document.querySelector("#Stop");
const start = document.querySelector("#Start");
const restart = document.querySelector("#Restart");
const timername = document.querySelector("#timer-name");
let name = localStorage["name"] ? localStorage["name"] : "";
timername.value = name
const timeOptions = document.querySelectorAll(".time-option");
//Time selector
let myCountDown = localStorage["time"] ? new CountDown(JSON.parse(localStorage["time"]).minutes , JSON.parse(localStorage["time"]).seconds) : new CountDown();
timer.innerText = myCountDown.toString();
let interval;
let lastTime = localStorage["lastTime"] ? localStorage["lastTime"] : 0;


//Other events
const notifyEnd = () => {
    const options = {
        body: `${ lastTime } minutes have been passed successfully`,
        icon: './assets/camaleon.ico'
    }
    return new Notification(`${name} has Ended Up`, options)
}
const disabledAll = (elements, disabled = true) => {
    for(let element of elements){
        element.disabled = disabled;
    }
}
const setTime = (minutes) => {
    myCountDown = new CountDown( minutes, 0 );
    timer.innerText = myCountDown.toString();
    localStorage["time"] = JSON.stringify( myCountDown.getData() );
}
const restartTime = () => {
    localStorage["name"] = ""
    timername.value = ""
    stopTime();
    timername.disabled = false;
    start.value = "Start";
    start.disabled = false;
    name = "";
    setTime(lastTime);
    stop.disabled = true;
    restart.disabled = true;
    disabledAll(timeOptions, false);
}
const stopTime = () => {
    clearInterval(interval);
    disabledAll(timeOptions);
    start.value = "Resume";
    stop.disabled = true;
    start.disabled = false;
    restart.disabled = false;
    timername.disabled = true;
}
const startTime = () => {
    if(!Notification){
        alert("Your Browser is not compatible with the Notification System")
    }else if(["default", "denied"].includes(Notification.permission)){
        alert("We need you to accept the Notification permission")
        Notification.requestPermission()
        if(["default", "denied"].includes(Notification.permission)){
            return
        }
    }
    disabledAll(timeOptions);
    start.value = "Resume";
    timername.disabled = true;
    if(timername.value.length === 0){
        timername.value = "MyCountDown";
    }
    name = timername.value;
    localStorage["name"] = name;
    start.disabled = true;
    stop.disabled = false;
    restart.disabled = false;
    interval = setInterval(() => {
        if( myCountDown.decrease() ){
            notifyEnd()
            stopTime();

        }
        timer.innerText = myCountDown.toString();
        localStorage["time"] = JSON.stringify( myCountDown.getData() );

    },1000)
}
start.addEventListener('click', startTime);
stop.addEventListener('click', stopTime);
restart.addEventListener('click', restartTime);





//Writing effect
writingEffect(document.querySelector('.ctn-usage > h1'), 150);
for(let paragraph of document.querySelectorAll('.ctn-usage > p')){
    writingEffect( paragraph, 25 );
}


//Buttons events
for( let timeOp of timeOptions ){
    timeOp.addEventListener('click', event => {
        lastTime = event.target.getAttribute("mins");
        localStorage["lastTime"] = lastTime;
        setTime(lastTime) ;
        timer.innerText = myCountDown.toString();
    })
}

stop.disabled = true;
restart.disabled = true;