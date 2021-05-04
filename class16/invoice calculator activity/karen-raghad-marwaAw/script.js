// No need to change this
const orders = []

/* This excersise will help you work with arrays, 
you will use the power of arrays in javascript 
to implement the function below.

You won't need to do anything with dom, it was setup so you
won't worry about styling or where to put you html, just use it
as outlined in the descriptions below. */


// Task: Implement search function
document.querySelector('.search-bar').addEventListener('input', handleSearch)

function handleSearch(e) {
    let searchVal = e.target.value.trim().toLowerCase()
    // filter the menu based on the menu item name
    // render the filtered menu using the renderMenu function, it takes an array

    if (searchVal === '') {
        renderMenu(menu)
    } else {
        const result = menu.filter(item => searchVal == item.name.toLowerCase());
        renderMenu(result);
    }
}
let totalType = 0;
// Task: Implement the function below
function renderInvoice() {
    const itemsDiv = document.getElementsByClassName('invoice-items')[0]
    const totalsDiv = document.querySelector('.totals')

    itemsDiv.innerHTML = ''
    totalsDiv.innerHTML = ''


    /* Task: Render items list with quantities

    - the orders array contain indexes of menu items 
      for each order button click
    
    - use the function getInvoiceItemHTML 
      to get html for the item that can be appended to itemsDiv

    - Uncomment the code below to see how 
      the function is used */

    let count = {};
    orders.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
    let filteredOrders = orders.filter((od, id) => orders.indexOf(od) === id)
    filteredOrders.forEach((order) => {
        itemsDiv.innerHTML += getInvoiceItemHTML(order, menu[order].name, count[order], menu[order].price);
    })


    /* Task: Calculate totals and render them to the totalsDiv

    - Each menu item has a type index 
      that corresponds to an item in 
      the TYPES array inside menu.js : TYPES[0] === "Main"

    - Calculate the totals by type for all orders using the original price

    - Calculate the subtotal for all orders original price

    - Calculate the total for all orders using the discountes price

    - Calculate the total discount using subtotal - total

    - Render them using the getTotalHTML function like it's usage below */

    let [subtotal, total] = [0, 0]

    // Compute totals by type, subtotal, and total here
    let totalType = [0, 0, 0, 0, 0];

    filteredOrders.forEach((order) => {
        TYPES.forEach((ty, i) => {
            if (menu[order].type === i) {
                totalType[i] += menu[order].price;
                // console.log(totalType[i]);
            }
        })
    })

    filteredOrders.forEach((order) => {
        subtotal += menu[order].price;
        //    console.log(menu[order].price);
    })

    filteredOrders.forEach((order) => {
        if (menu[order].discount !== null) {
            total += getDiscountedPrice(menu[order])
        } else {
            total += menu[order].price
        }
    })

    let discount = subtotal - total

    // Render totals by type here

    totalType.forEach((total, index) => {
        totalsDiv.innerHTML += getTotalHTML('total of Type ' + TYPES[index], total, true)
    })
    totalsDiv.innerHTML += getTotalHTML('Subtotal', subtotal, true)

    totalsDiv.innerHTML += discount ? getTotalHTML('Discount', discount, true, true) : ''

    totalsDiv.innerHTML += getTotalHTML('Total', total, true, false, true)
}


// Keep the below helper methods, they generate the required html and style for you
function handleOrder(e) {
    target = e.target
    itemId = target.dataset['id']
    orders.push(itemId)
    renderInvoice()
}

function getInvoiceItemHTML(index, name, quantity, price) {
    return `
    <div class="p-px w-5 bg-gray-300 rounded text-center">
        ${index}
    </div>
    <div>
        <div class='font-bold'>${name}</div>
        <div class="text-gray-500">
            Quantity: ${quantity}
        </div>
    </div>
    <div class='text-right ml-2'>\$${toFixed(price)}</div>
    `;
}

function getTotalHTML(name, cost, bold = false, negative = false, large = false) {
    return `
        <div class="flex justify-between ${bold ? 'font-bold' : ''} ${large ? 'text-lg' : ''}">
            <div>${name}</div>
            <div>${negative ? '-' : ''} \$${(cost).toFixed(2)}</div>
        </div>
    `
}

function toFixed(num) {
    return +num.toString()
        .match(/^-?\d+(?:\.\d{0,2})?/)[0]
}