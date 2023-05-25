import logger from "../logger/logger";
import io from 'socket.io';

const socket = io.connect();

const userEmail = document.getElementById('userEmail');
const userName = document.getElementById('userName');
const userSurname = document.getElementById('userSurname');
const userAge = document.getElementById('userAge');
const userNickname = document.getElementById('userNickname');
const userAvatar = document.getElementById('userAvatar');
const userMensaje = document.getElementById('userMensaje');

const myButton = document.getElementById('logout');
myButton.addEventListener('click',  () => {
  try {
    window.location.href = '/logout';
    return;
  } catch (err) {
    logger.error(Error('err'));
    //console.log(`ERRORRRR ${err}`);
  };

});

socket.on('connect', () => {
    logger.info('socket connected');
});

//agregar nuevo producto
let formulario = document.getElementById('formProducts');

const formAddE = async () => {

    formulario = await formulario.addEventListener('submit',  e => {
        e.preventDefault();
        const product = {
            "title": title.value,
            "description": description.value,
            "code": code.value,
            "price": price.value,
            "stock": stock.value,
            "category": category.value,
            "thumbnail": thumbnail.value
        };
        socket.emit('newProduct', product);
        
        });

};




//lista productos
socket.on('products',  (data) => {
    
    let htmlToRender = `
  <table class="table container">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">descripcion</th>
        <th scope="col">Codigo</th>
        <th scope="col">Precio</th>
        <th scope="col">Stock</th>
        <th scope="col">categoria</th>
        <th scope="col">Foto</th>
      </tr>
    </thead>
    </tbody>`;
   
    data.forEach(( element) => {
        htmlToRender = htmlToRender + `
        <tr>
          
          <td>${element.title}</td>
          <td>${element.description}</td>
          <td>${element.code}</td>
          <td>${element.price}</td>
          <td>${element.stock}</td>
          <td>${element.category}</td>
          <td><img src=${element.thumbnail} style="max-width: 50px; height: auto;"</td>
        </tr>` 
    
    });
    htmlToRender = htmlToRender + '</tbody></table>';
    document.getElementById('tableProducts').innerHTML = htmlToRender;
});




//chat
socket.on('chat', async (data) => {
        
    htmlToRender = '';
    await data.forEach((element) => {

        htmlToRender = htmlToRender + `
        <tr>
            <th><h1 class='user'>${element.email}</h1></th>
            <th><h1 class='mensaje'>${element.message}</h1></th>
            <th><h1 class='date'>${element.date}</h1></th>
        </tr>
        `
    });

    document.getElementById('message').innerHTML = htmlToRender;
    });
    

    // const validateEmail = (mail) => {
    //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    //   if (regex.test(mail)) {
    //     return true; 
    //   } else {
    //     alert("El mail ingresado no es válido."); 
    //     return false;
    //   };
    // };
  
//   const addMessage = async () => {
 
//     const messageToAdd =  {
//       author: {
//         id: userEmail.value,
//         name: userName.value,
//         usersurname: userSurname.value,
//         age: userAge.value,
//         nickname: userNickname.value,
//         avatar: userAvatar.value
//       },
//       text: userMensaje.value
//     };
    
//     userMensaje.value = '';


// if(validateEmail(messageToAdd.author.id)) {

//    await socket.emit('newMessage', messageToAdd);
//   };
// };


const handleRouteCart = async () => {
  const req = await fetch(`http://localhost:8080/cart`, {
      method: 'POST',
  })
  window.location = `${req.url}`
}
const handleAddCartProduct = async (id) => {
  const res = await fetch(`http://localhost:8080/cart/${id}/products`,{
      method: 'POST',
  })
}
const handleDeleteCartProduct = async (id, idProd) => {
  const res = await fetch(`http://localhost:8080/cart/${id}/products/${idProd}`,{
      method: 'DELETE',
  })
  window.location.reload()
}
const handleDeleteCart = async (id) => {
  const res = await fetch(`http://localhost:8080/cart/${id}`,{
      method: 'DELETE',
  })
  window.location = `http://localhost:8080/products`
}
const handleBuyCart = async () =>{
  const req = await fetch(`http://localhost:8080/cart/buy`)
}