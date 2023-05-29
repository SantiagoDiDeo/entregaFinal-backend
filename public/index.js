import io from "socket.io";
const socket = io.connect();

//chat
const userEmail = document.getElementById("userEmail");
const userMensaje = document.getElementById("userMensaje");
//products
const cartList = document.getElementById("cart");
const cartForm = document.getElementById("cartForm");
const submitLogin = document.getElementById("submitLogin");
//login
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
//register
const inputRegister = document.getElementsByClassName("inputRegister");

/* TOAST */
function toast(mensaje, color1, color2) {
  Toastify({
    text: mensaje,
    duration: 4000,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: `linear-gradient(to right, ${color1}, ${color2})`,
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

const handleRegister = async () => {
  let emptyInputs = 0;

  for (let i = 0; i < inputRegister.length; i++) {
    if (inputRegister[i].value === "") {
      emptyInputs++;
    }
  }

  if (emptyInputs > 0) {
    toast("Complete todos los campos", "#E74C3C", "#922B21");
  } else {
    toast("usuario registrado con exito", "#2ECC71", "#82E0AA");
  }
};

/* HANDLERS */
const handleLogin = async () => {
  if (usernameInput.value === "" || passwordInput.value === "") {
    toast("Debe completar todos los datos", "#E74C3C", "#922B21");
  } else {
    toast("login exitoso", "#2ECC71", "#82E0AA");
    window.location.href = "/products";
    // const data = {
    //   username: usernameInput.value
    // }
    // console.log(data, 'here data')
    // const response = await fetch(`http://localhost:8080/login/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)

    // })
    // .then((response) => location.replace('http://localhost:8080/products'))
  }
};

const handleAddCartProduct = (id, code, title, price) => {
  let productCounter = document.querySelector(`#product_${code}`);
  let counterValue = +productCounter.textContent + 1;

  productCounter.innerText = `${counterValue}`;

  const modifiedItem = document.getElementById(`cart_${id}`);
  if (modifiedItem) {
    modifiedItem.textContent = `id: ${id} cantidad: ${counterValue} producto: ${title} precio: ${price}`;
  } else {
    const li = document.createElement("li");
    li.setAttribute("id", `cart_${id}`);
    const div = document.createElement("div");
    div.innerText = `id: ${id} cantidad: ${counterValue} producto: ${title} precio: ${price}`;
    li.appendChild(div);
    cartList.appendChild(li);
  }
};

const handleDeleteCartProduct = (id, code, title, price) => {
  const itemToDelete = document.getElementById(`cart_${id}`);
  const cuantityText = itemToDelete.textContent.split(" ");
  let productCounter = document.querySelector(`#product_${code}`);

  if (cuantityText[3] === "1") {
    itemToDelete.remove();
    productCounter.innerText = `0`;
  } else {
    let newCuantity = +cuantityText[3] - 1;
    itemToDelete.innerText = `id: ${id} cantidad: ${newCuantity} producto: ${title} precio: ${price}`;
    productCounter.innerText = `${newCuantity}`;
  }
};

const handleBuy = () => {
  if (cartList.childNodes.length > 1) {
    const data = {
      username: "",
      products: null,
      address: "",
    };

    Array.from(cartList.childNodes).forEach((item) => {
      const text = item.textContent.split(" ");
      data.products = !data.products
        ? [
            {
              productId: text[1],
              cantidad: text[3],
              producto: text[5],
              precio: text[7],
            },
          ]
        : [
            ...data.products,
            {
              productId: text[1],
              cantidad: text[3],
              producto: text[5],
              precio: text[7],
            },
          ];
    });
    sessionStorage.setItem("cart", data);
    cartForm.addEventListener("submit", async (e) => {
      data.products.shift();
      e.preventDefault();
      await fetch(`http://localhost:8080/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      window.location.href = "/cart";
    });
  }
};

/* CHAT - SOCKET */
// socket.on('connect', () => {
//     console.log('socket connected');
// });

// socket.on('chat', async (data) => {

//     htmlToRender = '';
//     await data.forEach((element) => {

//         htmlToRender = htmlToRender + `
//         <tr>
//             <th><h1 class='user'>${element.username}</h1></th>
//             <th><h1 class='mensaje'>${element.message}</h1></th>
//         </tr>
//         `
//     });

//     document.getElementById('message').innerHTML = htmlToRender;
//     });

// const addMessage = async (messageToAdd) => {

//     messageToAdd =  {
//         username: userEmail.value,
//         body: userMensaje.value
//       }
// if(messageToAdd.username) {
//     await socket.emit('newMessage', messageToAdd);
//   };
// };
