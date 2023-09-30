console.log("Probando cliente");

const socketClient = io()

const form = document.getElementById('form');
const inputName = document.getElementById('name');

form.onsubmit = (e) => {
    e.preventDefault();
    const userName = inputName.value;
    socketClient.emit('firstEvent', userName);
    console.log('Probando...');
};

socketClient.on('secondEvent',(info)=>{
    console.log(`info sent: ${info}`);
})