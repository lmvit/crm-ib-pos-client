function Time(date) {
    const minTime =  date.getHours();
    const minMin = date.getMinutes();
    const seconds = date.getSeconds()
    let min,minHr
    if (minTime<10) {
        minHr = '0'+minTime;
    }else{
        minHr=minTime;
    }
    if(minMin<10){
         min = '0'+minMin
    }else{
        min = minMin;
    }
    const time = minHr+":"+min+":"+seconds;
    return time;
}

export default Time;
