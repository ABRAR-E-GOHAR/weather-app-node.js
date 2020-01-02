
const Form= document.querySelector('form')
const search= document.querySelector('input')

const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


Form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location=search.value

    messageOne.textContent="Loading..."
    messageTwo.textContent=""

    // for local host add -->    fetch('http://localhost:3000/weather?address='+location)
    //for heroku development add -->    fetch ('/weather?address='+location)
        fetch('/weather?address='+ location)
    .then((response)=>  
    response.json()
    .then((data)=>{
        if (data.error){

            messageOne.textContent= data.error        }
    
        else {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forcast
        }
    }) )





})