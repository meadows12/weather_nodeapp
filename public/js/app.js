console.log('A javascript code at client side')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// const messageThree = document.querySelector('#message-3')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc = search.value
    console.log(loc)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    

    fetch('/weather?address='+loc).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            console.log(messageOne)
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            
        }
    })
})
})