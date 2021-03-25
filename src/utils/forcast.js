const request= require('request')
const forcast= (lat,lon,callback)=>{
    const url= 'https://api.darksky.net/forecast/57faefe939fd1e6e4500a28cb8fca376/'+lat+','+lon
request({url, json: true}, (error, {body})=>{
 if(error)
  {
     callback("Unable to show update",undefined)
  }
  else if(body.error){
     callback("Unable to find the location",undefined)
}
  
  else{
  callback(undefined,body.daily.data[0].summary +" It is currently " +body.currently.temperature +" degree. There is "+ body.currently.precipProbability+" % chance of rain"
  ) 
}
})

}

module.exports=forcast