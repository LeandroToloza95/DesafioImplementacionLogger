const socketClient = io();
const form = document.getElementById("chatForm")
const inputMessage = document.getElementById("chatMessage")
const h3name = document.getElementById("name")
const divChat = document.getElementById("chat")

let user;



socketClient.on('newUserBroadcast',(user)=>{
    Toastify({
        text: `${user} connected`,
        duration: 5000,
        // destination: "https://github.com/apvarun/toastify-js",
        // newWindow: true,
        // close: true,
        // gravity: "top", // `top` or `bottom`
        // position: "left", // `left`, `center` or `right`
        // stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        // onClick: function(){} // Callback after click
      }).showToast();
})

form.onsubmit = (e)=>{
    e.preventDefault();
    swal.fire({
        title: 'Welcome',
        text: 'Whats your name?',
        input: 'text',
        confirmButtonText: 'Enter',
        inputValidator:(value)=>{
            if(!value){
            return "Name is required";}
        }
      }
    ).then((input)=>{
        user=input.value;
        h3name.innerText=`Chat user: ${user}`
        socketClient.emit('newUser',user)
    })
    const infoMessage={
        name: user,
        message: inputMessage.value
    };
    socketClient.emit("message",infoMessage)

}

socketClient.on('newProduct',(messages)=>{
    const chat = messages.map(objMessage=>
        `<p>${objMessage.name}: ${objMessage.message} </p>`).join(' ')
    divChat.innerHTML = chat;
})