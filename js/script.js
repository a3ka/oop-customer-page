const date = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  ];

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date" id="${prevLastDay - x + 1}">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today" id="${i}">${i}</div>`;
    } else {
      days += `<div id="${i}">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date" id="${j}">${j}</div>`;
  }

  monthDays.innerHTML = days;
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

const monthDays = document.querySelector(".days");
const choosedDates = document.querySelector(".choosed-dates");

const itemPrice = 1800; // PRICE OF ONE ITEM 

// ADD DELIVERY DATES 

monthDays.addEventListener("click", (event)=>{
  deliveryDateSelector();
});


const deliveryDateSelector = () => {
  const pId = event.target.id + " " + months[date.getMonth()]; 
  const element = document.getElementById("selected-date");
  
  //DELETE ITEM 
  if(document.getElementById(pId) == null){
    const tag = document.createElement("p");
    tag.id = pId;
    const text = document.createTextNode(pId + " ");
    tag.appendChild(text);
    element.appendChild(tag);
  } else {
    document.getElementById(pId).remove();
  }

  // CHANGE PAYMENT SUM AND DISCOUNT
  const pieceQuantities = element.children.length; 
  if (pieceQuantities == 1) {
    document.getElementById('payment__sum').innerText = itemPrice * pieceQuantities + " $";
  } else if (pieceQuantities > 1) {
    document.getElementById('payment__sum').innerText = itemPrice * 0.95 * (pieceQuantities - 1) + itemPrice + "$";
    document.getElementById('payment__discount').innerText = "Discount 5% -";
    document.getElementById('payment__discount2').innerText = (itemPrice * 0.05 * (pieceQuantities - 1)) + "$";
  } else {
    document.getElementById('payment__sum').innerText = 0; 
    document.getElementById('payment__discount').innerText = "";
  } 
} 

// SAVE ALL DATA IN THE OBJECTS WITH ITS OWN PROPERTIES AND METHODS
const form = document.getElementById('signup');

form.addEventListener("click", function (event) {
  // stop form submission
  event.preventDefault();

  const person = {
    firstName: document.getElementById('fname1').value,
    lastName: document.getElementById('lname1').value
  }

  const billingInfo = {
    typeCard: document.getElementById("dropdownCard").options[document.getElementById("dropdownCard").selectedIndex].value,
    cardNumber: document.getElementById('cardNumber').value,
    cvv: document.getElementById('cvv').value, 
    discount: document.getElementById('payment__discount2').textContent
  }

  const dDates = [];

  for (i = 0; i < document.getElementById("selected-date").children.length; i++){
    dDates.push(document.getElementById("selected-date").children[i].innerHTML);     
    

  }

  const deliveryDates = {
    deliveryDates: dDates
  }

  const order = {
    person,
    billingInfo,
    deliveryDates, 
    getName: function(){
      console.log ("User's name: " + this.person.firstName + " " + this.person.lastName);
    },
    getBillingInfo: function(){
      console.log ("Billing info: " + "\r\n" + "Type of Card:" + this.billingInfo.typeCard + 
      "\r\n" + "Card Number: " + this.billingInfo.cardNumber +
      "\r\n" + "CVV: " + this.billingInfo.cvv + 
      "\r\n" + "Discount (5%): " + this.billingInfo.discount);
    },
    getDeliveryDates: function(){
      console.log ("Delivery Dates: " + this.deliveryDates.deliveryDates);
    }
  }

  order.getName();
  order.getBillingInfo();
  order.getDeliveryDates();
});