const socketClient = io();
const form = document.getElementById("form")
// const inputMessage = document.getElementById("chatMessage")
// const h3name = document.getElementById("name")
// const divChat = document.getElementById("chat")

const textarea = document.getElementById('title');

textarea.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

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
    // if (input.isConfimed){
    //     swal.fire()
    // }
})

socketClient.on('newProductBroadcast',(product)=>{
    Toastify({
        text: `${product} connected`,
        duration: 5000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
})

form.onsubmit = (e)=>{
    e.preventDefault();
    const infoMessage={
        name: user,
        message: inputMessage.value
    };
    socketClient.emit("message",infoMessage)

}

socketClient.on('chat',(messages)=>{
    const chat = messages.map(objMessage=>
        `<p>${objMessage.name}: ${objMessage.message} </p>`).join(' ')
    divChat.innerHTML = chat;
})