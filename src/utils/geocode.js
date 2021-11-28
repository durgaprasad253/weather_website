const request=require('request')

const geocode=(address,callbacks)=>{
   const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZHVyZ2FwcmFzYWQtMDQiLCJhIjoiY2t3ZjdiNnF0MGJ2YzJvcG12MGkyZG81aiJ9.t_rEnRpBgQUHW5RSAMuaLg&limit=1'
   request({url,json:true},(error,{body}={})=>{
           if(error)
           {
               callbacks({error:'unable to access location service. Please check your network connection!!'},undefined)
           }
           else if(body.features.length===0)
           {
               callbacks({error:'Unable to find the location! Please provide valid location'},undefined)
           }
           else
           {   
               data={
                   lattitude:body.features[0].center[1],
                   longitude:body.features[0].center[0],
                   place:body.features[0].place_name

               }
               callbacks(undefined,data)
           }



})
}

module.exports=geocode