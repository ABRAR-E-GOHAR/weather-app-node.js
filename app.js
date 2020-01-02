const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./src/utils/geocode')
const forcast=require('./src/utils/forcast')

//For heroku port process.env.PORT and for local host is 3000
const port=process.env.PORT || 3000;

const app=express();
const publicDirectory=path.join(__dirname, '/public')
const partialPath=path.join(__dirname, '/views/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectory))
hbs.registerPartials(partialPath);


app.get('', (req,res)=>{
    res.render('index',{
        title:"Weather Application",
    })
    })

    app.get('/about', (req,res)=>{
        res.render('about',{
            title:"About"
        })
        })

        app.get('/help', (req,res)=>{
    res.render('help',{
        title:"Help",
    })
    })

    app.get('/weather', (req,res)=>{
        
        if (!req.query.address){
            return res.send("Please Enter An Address")
        }

        geocode(req.query.address, (error, {latitude, longitude, placename}={})=>{
            if (error){
                return res.send({error})
            }

            forcast(latitude, longitude,(error, data1)=>{
                if (error){
                    return res.send({error})
                }

                res.send({
                    forcast: data1,
                    location: placename,
                    address: req.query.address
                })
        })

    })

    })

    app.get('*', (req,res)=>{
        res.render('404',{
            title:"Page Not Found",
            msg:"This Page is not found. Try out for an available page. "
        })
        })

        



app.listen(port, ()=>{
    console.log("Server has started at port " + port)
})