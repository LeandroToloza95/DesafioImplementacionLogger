console.log("Probando cliente");

const socketClient = io()

const form = document.getElementById('form');
const inputName = document.getElementById('name');
const inputPrice=document.getElementById('price');

form.onsubmit = (e) => {
    e.preventDefault();
    // const userName = inputName.value;
    const price = inputPrice.value;
    socketClient.emit('firstEvent', price);
    
};

socketClient.on('secondEvent',(info)=>{
    console.log(`new price: ${info}`);
})