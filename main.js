const createBtn = document.getElementById('createBtn');
const deleteAllBtn = document.getElementById("deleteAllBtn");
const deleteBtn = document.getElementById('deleteBtn');
const editBtn = document.getElementById('editBtn');
const tableBody = document.getElementById('tableBody');
const amount = document.getElementById('amount');
const names = document.getElementById('name');
const sellers = document.getElementById('seller');
const prices = document.getElementById('price');

var dataId = 0;

const dataArray = JSON.parse(localStorage.getItem('dataArray')) || []

const addingFunction = (name, seller, price)=>{
    dataArray.push({
        name,
        seller,
        price
    })
    localStorage.setItem('dataArray', JSON.stringify(dataArray))
    return { name, seller, price }
}

const deleteAllFunction = ()=>{
        dataArray.splice(0, dataArray.length);
    localStorage.setItem('dataArray', JSON.stringify(dataArray))
    tableBody.innerHTML = ``;
}

const deleteTableRowFunction = (e)=>{
  const match = dataArray[e.parentNode.parentNode.getAttribute('id') - 1]
  e.parentNode.parentNode.remove()
  dataArray.splice(match, 1)
  localStorage.setItem('dataArray', JSON.stringify(dataArray))
  dataId = dataId - 1;
  location.reload()
  }
const createTableFunction = ()=>{
            if (
              names.value !== "" &&
              sellers.value !== "" &&
              prices.value !== ""
            ) {
              const createNewElement = addingFunction(
                names.value,
                sellers.value,
                prices.value
              );
              createElements(createNewElement);
              names.value = "";
              sellers.value = "";
              prices.value = "";
              amount.value = "";
            } else {
              alert("Values cannot be empty");
            }
}


const createElements = ({name, seller, price})=>{
  dataId++
const mainString = `
            <tr id='${dataId}'>
                    <td>${dataId}</td>
                    <td>${name}</td>
                    <td>${seller}</td>
                    <td>$${price}</td>
                    <td><button id="editBtn" ><i  class="fa-solid fa-pen-to-square"></i></button></td>
                    <td><button id="deleteBtn" onclick='deleteTableRowFunction(this)'><i  class="fa-solid fa-trash"></i></button></td>
            </tr>
    `;
        tableBody.innerHTML += mainString;
}
dataArray.forEach(createElements)
createBtn.addEventListener('click', createTableFunction)


deleteAllBtn.addEventListener('click', ()=> deleteAllFunction())
