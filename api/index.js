let bookArr,
  cartArr = [];
let card = "";
let change = 0;
let money = 0;
let calBoolean = false;

const request = new XMLHttpRequest();
request.open("GET", "https://api.jsonbin.io/b/5e69b564d2622e7011565547", true);
request.onload = function() {
  const data = JSON.parse(this.response);
  if (request.status === 200) {
    bookArr = data.books;
    data.books.forEach((book, i) => {
      card =
        card +
        `<div class="card">
          <img src=${book.cover}  style="width:100%">
          <h5 id="bTitle">${book.title}</h5>
          <p id="bPrice" class="price"> price: ฿${book.price}</p>
          <div style="width:100%">
          <button onclick="addItem(${i})">Add</button>
          </div>
          </div>`;
      document.getElementById("book").innerHTML = card;
    });
  } else {
    console.log("error");
  }
};
request.send();

const addItem = n => {
  const index = cartArr.findIndex(x => x.id === bookArr[n].id);
  if (index !== -1) {
    const qty = cartArr[index].qty + 1;
    cartArr[index] = {id: bookArr[n].id, title: bookArr[n].title, qty: qty, price: bookArr[n].price, total: +bookArr[n].price * qty};
  } else {
    cartArr.push({
      id: bookArr[n].id,
      title: bookArr[n].title,
      qty: 1,
      price: bookArr[n].price,
      total: +bookArr[n].price
    });
  }

  displayCart();
};

const displayCart = () => {
  let tableCart = "";
  let tableCal = "";
  let tableChange = "";
  let total = 0;
  let net = 0;
  const uniqueHarry = cartArr.filter((thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i);
  const discount = uniqueHarry.length > 1 ? calDiscount(uniqueHarry) : 0;

  cartArr.forEach((item, i) => {
    total += +item.total;
    net = +total - +discount;
    tableCart += `<table><tr>
    <td class="table-style" style="width:70%">${item.title}</td>
    <td class="table-style" style="width:10%;text-align:right">x${item.qty}</td>
    <td class="table-style" style="width:20%;text-align:right;padding-left:10;">${item.total.toFixed(2)}</td>
    <td class="table-style"><button style="width:30px;height:10px;justify-items:right"onclick="delElement(${i}) ">X</button></td></tr>`;
  });

  tableCart += `<tr><td></td><td style="text-align:right">Total</td><td style="width:10%;text-align:right;padding-left:10;">${total.toFixed(2)}</td><td></td></tr>`;
  tableCart += `<tr><td></td><td style="text-align:right">${discount === 0 ? "" : "Discount"}</td>
  <td style="width:10%;text-align:right;padding-left:10;">${discount === 0 ? "" : discount}</td><td></td></tr>`;
  tableCart += `<tr><td></td><td style="text-align:right">Net</td><td style="width:10%;text-align:right;padding-left:10;">${net.toFixed(2)}</td><td></td></tr>`;

  tableCal = `<tr><td></td><td style="text-align:right">Money</td>
  <td class="table-style"><input type="number" id="moneyInput" style="width:100%;height:30px;justify-items:center"></input></td>
  <td ><button id="ok" style="width:30px;height:10px;justify-items:right"onclick="calChange(${net})">OK</button></td>
  <tr></table>`;
  tableChange = `<tr><td class="table-style" style="width:70%">Money ${money.toFixed(2)}</td>
  <td class="table-style" style="width:10%;text-align:right">Change</td>
  <td class="table-style" style="width:20%;text-align:right;padding-left:10;></td>
  <td class="table-style">${change.toFixed(2)}</td>
  </tr></table>`;

  document.getElementById("cart").innerHTML = tableCart + (calBoolean ? tableChange : tableCal);

  if (calBoolean) {
    showPayment(total, discount, net);
    setTimeout(function() {
      location.reload();
    }, 3000);
  }
};

const delElement = n => {
  cartArr.splice(n, 1);
  displayCart();
};

const calDiscount = uniqeArr => {
  let discount = 0;
  let allPrice = 0;
  const priceUniqe = uniqeArr.map(item => (allPrice += +item.price));
  switch (+uniqeArr.length) {
    case 2:
      discount = +priceUniqe[priceUniqe.length - 1] * 0.1;
      break;
    case 3:
      discount = +priceUniqe[priceUniqe.length - 1] * 0.11;
      break;
    case 4:
      discount = +priceUniqe[priceUniqe.length - 1] * 0.12;
      break;
    case 5:
      discount = +priceUniqe[priceUniqe.length - 1] * 0.13;
      break;
    case 6:
      discount = +priceUniqe[priceUniqe.length - 1] * 0.14;
      break;
    case 7:
      discount = +priceUniqe[priceUniqe.length - 1] * 0.15;
      break;
  }
  return discount.toFixed(2);
};

const calChange = net => {
  calBoolean = true;
  money = +document.getElementById("moneyInput").value;
  change = money >= net ? money - net : alert("Money Not Enough!");
  displayCart();
};

const showPayment = (total, discount, net) => {
  let tablePayment = "";
  cartArr.forEach(item => {
    tablePayment += `<table><tr>
    <td class="table-style" style="width:70%">${item.title}</td>
    <td class="table-style" style="width:10%;text-align:right">x${item.qty}</td>
    <td class="table-style" style="width:20%;text-align:right;padding-left:10;">${item.total.toFixed(2)}</td>
    <td class="table-style"></td></tr>`;
  });

  tablePayment += `<tr><td></td><td style="text-align:right">Total</td><td style="width:10%;text-align:right;padding-left:10;">${total.toFixed(2)}</td><td></td></tr>`;
  tablePayment += `<tr><td></td><td style="text-align:right">${discount === 0 ? "" : "Discount"}</td>
  <td style="width:10%;text-align:right;padding-left:10;">${discount === 0 ? "" : discount}</td><td></td></tr>`;
  tablePayment += `<tr><td></td><td style="text-align:right">Net</td>
  <td style="width:10%;text-align:right;padding-left:10;">${net.toFixed(2)}</td><td></td></tr>`;

  tablePayment += `<tr><td class="table-style" style="width:70%">Money ${money.toFixed(2)}</td>
  <td class="table-style" style="width:10%;text-align:right">Change</td>
  <td class="table-style" style="width:20%;text-align:right;padding-left:10;></td>
  <td class="table-style">${change.toFixed(2)}</td>
  </tr></table>`;

  const myWindow = window.open("payment.html", "myWindow", "width=300,height=700");
  myWindow.onload = function() {
    document.getElementById("payment").innerHTML = tablePayment;
  };
};

module.exports = {
  calDiscount,
  addItem,
  delElement,
  calChange
};
