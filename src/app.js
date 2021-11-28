const path=require('path')
const geocode=require('./utils/geocode')
const weather_forecast=require('./utils/weather_forecast')
const hbs=require('hbs')
const express =require('express')
const app=express()

//paths for the express configuration
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// setting up handlebars and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setting up static folder to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{

res.render('index',{
    title:'weather app',
    name:'Durga Prasad D'
})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about ',
        name:'Durga Prasad D'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Durga Prasad D'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Enter the address to search'
        })
    }
    searchLocation=req.query.address
    geocode(searchLocation,(error,{lattitude,longitude,place}={})=>{

    if(error){
        return res.send(error)
    }
    weather_forecast(lattitude,longitude,(error,forecast)=>{
        if(error){
            return res.send(error)
        }
        res.send({
            location:place,
            forecast,
            address:req.query.address
        })

    })
        
            })
        
    
    
        
         
     
})
app.get('/help/*',(req,res)=>{
    res.render('404error',{
        title:'404',
        name:'Durga Prasad D',
        message:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404error',{
        title:'404',
        name:'Durga Prasad D',
        message:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('server is up and running!!!   on port 3000')
})