console.log('Hello  frontend dev')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageTwo.textContent = ''
messageOne.textContent =''
weatherForm.addEventListener('submit' ,(e) =>{
    e.preventDefault() 

    messageOne.textContent = 'Loading ....'
    const address = search.value
    fetch('/weather?address=' + address).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.address
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.address)
            console.log(data.forecast)
        }
    })
})
})