const request=require('request')
const weather_forecast=(lattitude,longitude,callbacks)=>{
    const url='http://api.weatherstack.com/current?access_key=502a54072806c264d21e7c460e8d88ab&query='+lattitude+','+longitude
    request({url,json:true},(error,{body}={})=>{
       if(error)
       {
    callbacks({error:'unable to access weather service. Please check your network connection!!'},undefined)
       }
       else if(body.error)
       {
           callbacks({error:'Unable to find the location! Please provide valid location'},undefined)
       }
       else
       {
        callbacks(undefined,body.current.weather_descriptions[0]+'. it is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out'+'and humidity is '+body.current.humidity+'%')
       }
    })

}

module.exports=weather_forecast


