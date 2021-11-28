const formSelector = document.querySelector('form')
const inputSelector = document.querySelector('input')
const message_1Selector = document.querySelector('#loading')
const message_2Selector = document.querySelector('#message')
formSelector.addEventListener('submit',(e)=>{
    e.preventDefault()
    const enteredLocation=inputSelector.value
    
    message_1Selector.textContent='Loading...'
    message_2Selector.textContent=''
    fetch('/weather?address='+enteredLocation).then((response)=>{
    response.json().then((data)=>{
        
        if(data.error)
        {
            message_1Selector.textContent=data.error
        }
        else
        {   message_1Selector.textContent=data.location
            message_2Selector.textContent=data.forecast
        }
    
    })

})
})
