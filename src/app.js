const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const e = require('express')

const app = express()
//Define paths
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Use static pages
app.use(express.static(publicDirPath))

//Use handlers engine and views engine i.e templates
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Mrunal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Mrunal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is the help page',
        title:'Help Page',
        name:'Mrunal'
    })
})



app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'Address cannot be empty'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(longitude,latitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormessage:'Help article not found',
        title: '404',
        name:'Mrunal'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errormessage:'404',
        title: '404 page',
        name:'Mrunal'
    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})