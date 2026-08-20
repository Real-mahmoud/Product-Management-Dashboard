window.addEventListener("load", ()=>{
    renderHome()
})



let dashboardContainer =document.querySelector(".dashboard-content");



const defaultProducts = [
    {
        id: 1,
        name: "MacBook Pro 14",
        category: "Laptops",
        price: 1999,
        stock: 24,
        status: "in-stock",
        image: "assets/images/macbook-pro.jpg"
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        category: "Smartphones",
        price: 999,
        stock: 8,
        status: "low-stock",
        image: "assets/images/iphone-15-pro.jpg"
    },
    {
        id: 3,
        name: "Sony WH-1000XM5",
        category: "Headphones",
        price: 399,
        stock: 15,
        status: "in-stock",
        image: "assets/images/sony-wh1000xm5.jpg"
    },
    {
        id: 4,
        name: "iPad Air",
        category: "Tablets",
        price: 599,
        stock: 0,
        status: "out-of-stock",
        image: "assets/images/ipad-air.jpg"
    },
    {
        id: 5,
        name: "Logitech MX Master 3S",
        category: "Accessories",
        price: 99,
        stock: 32,
        status: "in-stock",
        image: "assets/images/mx-master-3s.jpg"
    },
    {
        id: 6,
        name: "Samsung Galaxy S24",
        category: "Smartphones",
        price: 799,
        stock: 6,
        status: "low-stock",
        image: "assets/images/galaxy-s24.jpg"
    },
    {
        id: 7,
        name: "AirPods Pro 2",
        category: "Headphones",
        price: 249,
        stock: 18,
        status: "in-stock",
        image: "assets/images/airpods-pro-2.jpg"
    },
    {
        id: 8,
        name: "Dell XPS 15",
        category: "Laptops",
        price: 1699,
        stock: 0,
        status: "out-of-stock",
        image: "assets/images/dell-xps-15.jpg"
    },
    {
        id: 9,
        name: "Apple Watch Series 10",
        category: "Smartwatches",
        price: 429,
        stock: 11,
        status: "in-stock",
        image: "assets/images/apple-watch.jpg"
    },
    {
        id: 10,
        name: "Samsung Galaxy Tab S9",
        category: "Tablets",
        price: 699,
        stock: 4,
        status: "low-stock",
        image: "assets/images/galaxy-tab-s9.jpg"
    }
];

function loadProducts() {
    try {
        const stored = localStorage.getItem("products");
        return stored ? JSON.parse(stored) : defaultProducts;
    } catch (e) {
        return defaultProducts;
    }
}

const products = loadProducts();

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}


function renderWelcome(){
    let welcomeContainer=document.createElement("div");
    welcomeContainer.classList.add("welcome-section")
    welcomeContainer.innerHTML=`
        <div class="welcome">

            <h3>Welcome Back, Mahmoud! <i class="fa-solid fa-heart"></i></h3>
            <p>Here's what's happening with your store today.</p>
        </div>
    `
    dashboardContainer.append(welcomeContainer);
}

function renderStatistics(){
    let statisticsContainer=document.createElement("div");
    statisticsContainer.classList.add("statistics")
    statisticsContainer.innerHTML=`
       <div class="statistic-card">
            <div class="card-title one">
                <i class="fa-solid fa-box"></i>
                <div>
                    <h4>Total Products</h4>
                    <p>128</p>
                </div>
            </div>
            <p><span>+12%</span> from last month</p>
        </div>
        <div class="statistic-card">
            <div class="card-title two">

                <i class="fa-solid fa-cart-shopping"></i>
                <div>
                    <h4>Total Revenue</h4>
                    <p>$45,231</p>
                </div>
            </div>
            <p><span>+2%</span> from last month</p>
        </div>
            <div class="statistic-card">
            <div  class="card-title three">
                
                <i class="fa-solid fa-warehouse"></i>
                <div>
                    <h4>Total Orders</h4>
                    <p>256</p>
                </div>
            </div>
            <p><span>+5%</span> from last month</p>
        </div>
        <div class="statistic-card">
            <div class="card-title four">

                <i class="fa-solid fa-people-group"></i>

                <div>
                    <h4>Total Customers</h4>
                    <p>342</p>
                </div>
            </div>
            <p><span>+3%</span> from last month</p>
        </div>
        
    `
    dashboardContainer.append(statisticsContainer);
}

let chartAmdInsightsContainer=document.createElement("section");
chartAmdInsightsContainer.classList.add("chart-insights")

let salesChart;

function renderChart(){
    // chart 
    if (salesChart) salesChart.destroy();

    const sectionTitle = document.createElement("h3");
    sectionTitle.classList.add("section-title");
    sectionTitle.textContent = "Insights";
    chartAmdInsightsContainer.append(sectionTitle);

    let chartContainer=document.createElement("div");
    chartContainer.classList.add("chart")
    chartContainer.innerHTML=`
        <div class="chart-header">
            <h3>Sales Overview</h3>
            <select name="month" id="month-select">
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August" selected>August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>
        </div>
        <canvas id="myChart"></canvas>
    `
    chartAmdInsightsContainer.append(chartContainer);

const monthlySales = {
    "January":   { labels: ["Jan 1", "Jan 6", "Jan 11", "Jan 16", "Jan 21", "Jan 26", "Jan 31"], data: [10000, 14000, 18000, 21000, 19000, 26000, 30000] },
    "February":  { labels: ["Feb 1", "Feb 6", "Feb 11", "Feb 16", "Feb 21", "Feb 26", "Feb 28"], data: [11000, 16000, 15000, 22000, 24000, 23000, 28000] },
    "March":     { labels: ["Mar 1", "Mar 6", "Mar 11", "Mar 16", "Mar 21", "Mar 26", "Mar 31"], data: [13000, 18000, 20000, 24000, 26000, 27000, 33000] },
    "April":     { labels: ["Apr 1", "Apr 6", "Apr 11", "Apr 16", "Apr 21", "Apr 26", "Apr 30"], data: [9000, 13000, 17000, 20000, 22000, 25000, 29000] },
    "May":       { labels: ["May 1", "May 6", "May 11", "May 16", "May 21", "May 26", "May 31"], data: [14000, 17000, 21000, 23000, 28000, 26000, 34000] },
    "June":      { labels: ["Jun 1", "Jun 6", "Jun 11", "Jun 16", "Jun 21", "Jun 26", "Jun 30"], data: [12000, 15000, 19000, 21000, 25000, 29000, 31000] },
    "July":      { labels: ["Jul 1", "Jul 6", "Jul 11", "Jul 16", "Jul 21", "Jul 26", "Jul 31"], data: [15000, 16000, 20000, 24000, 27000, 31000, 36000] },
    "August":    { labels: ["Aug 1", "Aug 6", "Aug 11", "Aug 16", "Aug 21", "Aug 26", "Aug 31"], data: [12000, 19000, 21000, 25000, 23000, 30000, 35000] },
    "September": { labels: ["Sep 1", "Sep 6", "Sep 11", "Sep 16", "Sep 21", "Sep 26", "Sep 30"], data: [13000, 16000, 18000, 22000, 26000, 28000, 32000] },
    "October":   { labels: ["Oct 1", "Oct 6", "Oct 11", "Oct 16", "Oct 21", "Oct 26", "Oct 31"], data: [11000, 14000, 19000, 23000, 21000, 27000, 30000] },
    "November":  { labels: ["Nov 1", "Nov 6", "Nov 11", "Nov 16", "Nov 21", "Nov 26", "Nov 30"], data: [16000, 20000, 24000, 27000, 31000, 33000, 38000] },
    "December":  { labels: ["Dec 1", "Dec 6", "Dec 11", "Dec 16", "Dec 21", "Dec 26", "Dec 31"], data: [18000, 22000, 26000, 29000, 34000, 36000, 42000] }
};

const ctx = chartContainer.querySelector("#myChart").getContext("2d");

salesChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: monthlySales.August.labels,
        datasets: [
            {
                label: "Revenue",
                data: monthlySales.August.data,
                borderWidth: 2
            }
        ]
    },options: {
    scales: {
        y: {
            ticks: {
                callback: function(value) {
                    return "$" + value / 1000 + "K";
                }
            }
        }
    }
}

});

const monthSelect = chartContainer.querySelector("#month-select");
monthSelect.addEventListener("change", () => {
    const { labels, data } = monthlySales[monthSelect.value];
    salesChart.data.labels = labels;
    salesChart.data.datasets[0].data = data;
    salesChart.update();
});
   
}
function renderInsights(){
    let insightsContainer=document.createElement("section");
    insightsContainer.classList.add("insights")
    insightsContainer.innerHTML=`
            <div class="insights-cards">
                
                    <div class="statistic-card">
                <div  class="card-title one">
                    
                    <i class="fa-solid fa-hourglass-half"></i>
                    <div>
                        <h4>Pending Orders</h4>
                        <p>8</p>
                    </div>
                </div>
                <p>Orders awaiting processing</p>
            </div>
            <div class="statistic-card">
                <div class="card-title two">
                    <i class="fa-solid fa-people-group"></i>
                    <div>
                        <h4>New Customers</h4>
                        <p>12</p>
                    </div>
                </div>
                <p> Joined this month</p>
            </div>
            <div class="statistic-card">
                <div class="card-title three">

                    <i class="fa-solid fa-truck"></i>
                    <div>
                        <h4>Low Stock Products</h4>
                        <p>21</p>
                    </div>
                </div>
                <p>Products running low</p>
            </div>
            <div class="statistic-card">
                <div class="card-title four">

                    <i class="fa-solid fa-box-open"></i>
                    <div>
                        <h4>Out of Stock</h4>
                        <p>20</p>
                    </div>
                </div>
                <p>Product out of stock</p>
            </div>
            </div>
    `
    chartAmdInsightsContainer.append(insightsContainer);

}



function renderHome(){
    renderWelcome();
    renderStatistics();
    dashboardContainer.append(chartAmdInsightsContainer);
    chartAmdInsightsContainer.innerHTML=""
    renderChart();
    renderInsights();
}



// end home -------------------------------------------------

// start products 

function productAction({ onView, onEdit, onDelete } = {}) {
    let productActionContainer = document.createElement("div");
    productActionContainer.classList.add("action-container")

    let view = document.createElement("i");
    view.classList.add("fa-solid", "fa-eye", "action-btn", "view-btn");

    let edit = document.createElement("i");
    edit.classList.add("fa-solid", "fa-pen-to-square", "action-btn", "edit-btn");

    let del = document.createElement("i");
    del.classList.add("fa-solid", "fa-trash", "action-btn", "delete-btn");

    if (onView) view.addEventListener("click", onView);
    if (onEdit) edit.addEventListener("click", onEdit);
    if (onDelete) del.addEventListener("click", onDelete);

    productActionContainer.append(view, edit, del)
    return productActionContainer
}

function showItemDetails(title, details, image = null) {
    const imageHtml = image
        ? `<img src="${image}" alt="${title}" class="detail-image">`
        : "";
    const rows = Object.entries(details)
        .map(([key, value]) => `<div class="detail-row"><span>${key}</span><strong>${value}</strong></div>`)
        .join("");

    Swal.fire({
        title,
        html: `<div class="detail-list">${imageHtml}${rows}</div>`,
        confirmButtonColor: "#3B82F6",
        background: "#292844",
        color: "#fff",
        width: 420
    });
}
let productsState = { search: "", category: "all", status: "all" };

function getVisibleProducts() {
    return products.filter((product) => {
        const matchSearch = product.name.toLowerCase().includes(productsState.search.trim().toLowerCase());
        const matchCategory = productsState.category === "all" || product.category === productsState.category;
        const matchStatus = productsState.status === "all" || product.status === productsState.status;
        return matchSearch && matchCategory && matchStatus;
    });
}

function buildProductRow(product) {
    let tr=document.createElement("tr")
    let ProductNameAndImage= document.createElement("td");
    ProductNameAndImage.classList.add("product-name-img-container");
    ProductNameAndImage.dataset.label = "Product";

    const productName = document.createElement("h4");
    productName.textContent = product.name;

    const productImg = document.createElement("img");
    productImg.src = product.image;
    productImg.alt = product.name;
    productImg.loading = "lazy";
    productImg.classList.add("product-img")

    const category = document.createElement("td");
    category.classList.add("hide-mobile");
    category.dataset.label = "Category";
    category.textContent = product.category;

    const price = document.createElement("td");
    price.dataset.label = "Price";
    price.textContent = `$${product.price}`;

    const stock = document.createElement("td");
    stock.classList.add("hide-mobile");
    stock.dataset.label = "Stock";
    stock.textContent = product.stock;

    const actions = document.createElement("td");
    actions.dataset.label = "Actions";
    const actionButtons = productAction({
        onView: () => showItemDetails(product.name, {
            Category: product.category,
            Price: `$${product.price}`,
            Stock: product.stock,
            Status: product.status
        }, product.image),
        onEdit: () => openEditModal(product),
        onDelete: () => deleteProduct(product)
    });

    actions.append(actionButtons);

    const status = document.createElement("td");
    const statusContent = document.createElement("span");

    status.classList.add("hide-mobile");
    status.dataset.label = "Status";
    statusContent.textContent = product.status;
    status.append(statusContent)
    statusContent.classList.add("status")
    switch (product.status){
        case "in-stock":
        statusContent.classList.add("in-stock");
        break;
        case "low-stock":
        statusContent.classList.add("low-stock");
        break;
        case "out-of-stock":
        statusContent.classList.add("out-of-stock");
        break;
    }

    ProductNameAndImage.append(productImg,productName)
    tr.append(ProductNameAndImage,category,price,stock,status,actions)
    return tr;
}

function renderProducts(products) {
    let productContainer=document.createElement("section");
    productContainer.classList.add("recent-products")

    let productHeader=document.createElement("div");
    let productTableTitleContainer=document.createElement("div");
    
    let productTableTitle=document.createElement("h3");
    productTableTitle.textContent="All Products"

    let productTableDesc=document.createElement("p");
    productTableDesc.textContent="Manage and organize your products"

    let ctaButton=document.createElement("button");
    ctaButton.classList.add("btn")

    let plusIcon=document.createElement("i");
    plusIcon.classList.add("fa-solid", "fa-plus")
    let addText=document.createElement("span");
    addText.textContent=" Add Product"

    ctaButton.append(plusIcon,addText)

    productTableTitleContainer.append(productTableTitle,productTableDesc)
    productHeader.append(productTableTitleContainer,ctaButton)
    productHeader.classList.add("product-header")

    let toolbar=document.createElement("div");
    toolbar.classList.add("products-toolbar")

    let searchInput=document.createElement("input");
    searchInput.type="search";
    searchInput.placeholder="Search products...";
    searchInput.classList.add("product-search")

    let categorySelect=document.createElement("select");
    categorySelect.classList.add("product-filter")

    let allCategoryOption=document.createElement("option");
    allCategoryOption.value="all";
    allCategoryOption.textContent="All Categories"

    categorySelect.append(allCategoryOption);

    [...new Set(products.map(p=>p.category))].forEach(cat=>{
        let option=document.createElement("option");
        option.value=cat;
        option.textContent=cat;
        categorySelect.append(option);
    })

    let statusSelect=document.createElement("select");
    statusSelect.classList.add("product-filter")

    let allStatusOption=document.createElement("option");
    allStatusOption.value="all";
    allStatusOption.textContent="All Statuses"

    statusSelect.append(allStatusOption);

    [...new Set(products.map(p=>p.status))].forEach(st=>{
        let option=document.createElement("option");
        option.value=st;
        option.textContent=st;
        statusSelect.append(option);
    })

    toolbar.append(searchInput,categorySelect,statusSelect)

    let recentProductTable=document.createElement("table");
    recentProductTable.classList.add("recent-products-table")
    
    let thead=document.createElement("thead");

    let theadTr=document.createElement("tr");

    let theadTh1=document.createElement("th");
    theadTh1.textContent="Product"
    let theadTh2=document.createElement("th");
    theadTh2.textContent="Category"
    theadTh2.classList.add("hide-mobile");
    let theadTh3=document.createElement("th");
    theadTh3.textContent="Price"
    let theadTh4=document.createElement("th");
    theadTh4.textContent="Stock"
    theadTh4.classList.add("hide-mobile");
    let theadTh5=document.createElement("th");
    theadTh5.textContent="Status"
    theadTh5.classList.add("hide-mobile");
    let theadTh6=document.createElement("th");
    theadTh6.textContent="Actions"

    theadTr.append(theadTh1,theadTh2,theadTh3,theadTh4,theadTh5,theadTh6)
    thead.append(theadTr)
    recentProductTable.append(thead)

    let tbody=document.createElement("tbody");
    recentProductTable.append(tbody)

    function renderTableBody(){
        tbody.innerHTML="";
        const visibleProducts=getVisibleProducts();

        if(visibleProducts.length===0){
            let emptyTr=document.createElement("tr");
            let emptyTd=document.createElement("td");
            emptyTd.colSpan=6;
            emptyTd.textContent="No products found";
            emptyTd.classList.add("empty-state");
            emptyTr.append(emptyTd);
            tbody.append(emptyTr);
            return;
        }

        visibleProducts.forEach(product=>{
            tbody.append(buildProductRow(product))
        })
    }

    searchInput.addEventListener("input",()=>{
        productsState.search=searchInput.value;
        renderTableBody();
    });

    categorySelect.addEventListener("change",()=>{
        productsState.category=categorySelect.value;
        renderTableBody();
    });

    statusSelect.addEventListener("change",()=>{
        productsState.status=statusSelect.value;
        renderTableBody();
    });

    renderTableBody();

    productContainer.append(productHeader,toolbar,recentProductTable)
    dashboardContainer.append(productContainer)
}



// orders page -------------------------------------------------

const orders = [
    { id: "#1001", customer: "Ahmed Hassan", product: "MacBook Pro 14", date: "2026-08-19", amount: 1999, status: "completed" },
    { id: "#1002", customer: "Sara Ali", product: "iPhone 15 Pro", date: "2026-08-18", amount: 999, status: "shipped" },
    { id: "#1003", customer: "Omar Khaled", product: "Sony WH-1000XM5", date: "2026-08-17", amount: 399, status: "pending" },
    { id: "#1004", customer: "Layla Mostafa", product: "iPad Air", date: "2026-08-16", amount: 599, status: "completed" },
    { id: "#1005", customer: "Youssef Adel", product: "Logitech MX Master 3S", date: "2026-08-15", amount: 99, status: "cancelled" },
    { id: "#1006", customer: "Nour El-Deen", product: "Samsung Galaxy S24", date: "2026-08-14", amount: 799, status: "shipped" },
    { id: "#1007", customer: "Mona Farouk", product: "AirPods Pro 2", date: "2026-08-13", amount: 249, status: "completed" },
    { id: "#1008", customer: "Hassan Ibrahim", product: "Dell XPS 15", date: "2026-08-12", amount: 1699, status: "pending" },
    { id: "#1009", customer: "Rana Samir", product: "Apple Watch Series 10", date: "2026-08-11", amount: 429, status: "completed" },
    { id: "#1010", customer: "Karim Fathy", product: "Samsung Galaxy Tab S9", date: "2026-08-10", amount: 699, status: "cancelled" }
];

let ordersState = { search: "", status: "all" };

function getVisibleOrders() {
    return orders.filter((order) => {
        const matchSearch =
            order.customer.toLowerCase().includes(ordersState.search.trim().toLowerCase()) ||
            order.id.toLowerCase().includes(ordersState.search.trim().toLowerCase()) ||
            order.product.toLowerCase().includes(ordersState.search.trim().toLowerCase());
        const matchStatus = ordersState.status === "all" || order.status === ordersState.status;
        return matchSearch && matchStatus;
    });
}

function buildOrderRow(order) {
    const tr = document.createElement("tr");

    const id = document.createElement("td");
    id.dataset.label = "Order ID";
    id.textContent = order.id;

    const customer = document.createElement("td");
    customer.dataset.label = "Customer";
    customer.textContent = order.customer;

    const product = document.createElement("td");
    product.classList.add("hide-mobile");
    product.dataset.label = "Product";
    product.textContent = order.product;

    const date = document.createElement("td");
    date.classList.add("hide-mobile");
    date.dataset.label = "Date";
    date.textContent = order.date;

    const amount = document.createElement("td");
    amount.dataset.label = "Amount";
    amount.textContent = `$${order.amount}`;

    const status = document.createElement("td");
    status.classList.add("hide-mobile");
    status.dataset.label = "Status";
    const statusContent = document.createElement("span");
    statusContent.classList.add("order-status", order.status);
    statusContent.textContent = order.status;
    status.append(statusContent);

    const actions = document.createElement("td");
    actions.dataset.label = "Actions";
    const actionButtons = productAction({
        onView: () => showItemDetails(`Order ${order.id}`, {
            Customer: order.customer,
            Product: order.product,
            Date: order.date,
            Amount: `$${order.amount}`,
            Status: order.status
        }),
        onEdit: () => editOrder(order),
        onDelete: () => deleteOrder(order)
    });
    actions.append(actionButtons);

    tr.append(id, customer, product, date, amount, status, actions);
    return tr;
}

function editOrder(order) {
    Swal.fire({
        title: "Edit Order",
        html: `
            <input id="swal-customer" class="swal2-input" placeholder="Customer" value="${order.customer}">
            <input id="swal-product" class="swal2-input" placeholder="Product" value="${order.product}">
            <input id="swal-amount" class="swal2-input" type="number" min="0" placeholder="Amount" value="${order.amount}">
            <select id="swal-status" class="swal2-input">
                <option value="completed">completed</option>
                <option value="pending">pending</option>
                <option value="shipped">shipped</option>
                <option value="cancelled">cancelled</option>
            </select>
        `,
        showCancelButton: true,
        confirmButtonColor: "#3B82F6",
        cancelButtonColor: "#393755",
        confirmButtonText: "Save",
        background: "#292844",
        color: "#fff",
        didOpen: () => {
            document.getElementById("swal-status").value = order.status;
        },
        preConfirm: () => {
            const customer = document.getElementById("swal-customer").value.trim();
            const product = document.getElementById("swal-product").value.trim();
            const amount = Number(document.getElementById("swal-amount").value);
            if (!customer || !product || amount < 0) {
                Swal.showValidationMessage("Please fill all fields correctly");
                return false;
            }
            return { customer, product, amount, status: document.getElementById("swal-status").value };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Object.assign(order, result.value);
            showToast("Order updated successfully");
            dashboardContainer.innerHTML = "";
            renderOrdersPage();
        }
    });
}

function renderOrdersPage() {
    const container = document.createElement("section");
    container.classList.add("recent-products");

    const header = document.createElement("div");
    header.classList.add("product-header");

    const titleWrap = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = "All Orders";
    const desc = document.createElement("p");
    desc.textContent = "Track and manage customer orders";
    titleWrap.append(title, desc);
    header.append(titleWrap);

    const toolbar = document.createElement("div");
    toolbar.classList.add("products-toolbar");

    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.placeholder = "Search orders...";
    searchInput.classList.add("product-search");

    const statusSelect = document.createElement("select");
    statusSelect.classList.add("product-filter");

    const allStatusOption = document.createElement("option");
    allStatusOption.value = "all";
    allStatusOption.textContent = "All Statuses";
    statusSelect.append(allStatusOption);

    ["completed", "pending", "shipped", "cancelled"].forEach((st) => {
        const option = document.createElement("option");
        option.value = st;
        option.textContent = st;
        statusSelect.append(option);
    });

    toolbar.append(searchInput, statusSelect);

    const table = document.createElement("table");
    table.classList.add("recent-products-table");

    const thead = document.createElement("thead");
    const theadTr = document.createElement("tr");
    ["Order ID", "Customer", "Product", "Date", "Amount", "Status", "Actions"].forEach((th, index) => {
        const cell = document.createElement("th");
        cell.textContent = th;
        if ([2, 3, 5].includes(index)) cell.classList.add("hide-mobile");
        theadTr.append(cell);
    });
    thead.append(theadTr);

    const tbody = document.createElement("tbody");

    function renderTableBody() {
        tbody.innerHTML = "";
        const visibleOrders = getVisibleOrders();

        if (visibleOrders.length === 0) {
            const emptyTr = document.createElement("tr");
            const emptyTd = document.createElement("td");
            emptyTd.colSpan = 7;
            emptyTd.textContent = "No orders found";
            emptyTd.classList.add("empty-state");
            emptyTr.append(emptyTd);
            tbody.append(emptyTr);
            return;
        }

        visibleOrders.forEach((order) => tbody.append(buildOrderRow(order)));
    }

    searchInput.addEventListener("input", () => {
        ordersState.search = searchInput.value;
        renderTableBody();
    });

    statusSelect.addEventListener("change", () => {
        ordersState.status = statusSelect.value;
        renderTableBody();
    });

    renderTableBody();

    table.append(thead, tbody);
    container.append(header, toolbar, table);
    dashboardContainer.append(container);
}

function deleteOrder(order) {
    Swal.fire({
        title: "Delete order?",
        text: `Order ${order.id} will be removed permanently.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#3B82F6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        background: "#292844",
        color: "#fff"
    }).then((result) => {
        if (result.isConfirmed) {
            const index = orders.findIndex((o) => o.id === order.id);
            if (index !== -1) {
                orders.splice(index, 1);
            }
            dashboardContainer.innerHTML = "";
            renderOrdersPage();
            Swal.fire({
                title: "Deleted!",
                text: "Order deleted successfully.",
                icon: "success",
                confirmButtonColor: "#3B82F6",
                background: "#292844",
                color: "#fff"
            });
        }
    });
}

// customers page -------------------------------------------------

const customers = [
    { name: "Ahmed Hassan", email: "ahmed@example.com", orders: 12, spent: 12450, joined: "2026-01-15", status: "active" },
    { name: "Sara Ali", email: "sara@example.com", orders: 8, spent: 8900, joined: "2026-02-03", status: "vip" },
    { name: "Omar Khaled", email: "omar@example.com", orders: 5, spent: 4200, joined: "2026-03-22", status: "active" },
    { name: "Layla Mostafa", email: "layla@example.com", orders: 15, spent: 15800, joined: "2025-11-10", status: "vip" },
    { name: "Youssef Adel", email: "youssef@example.com", orders: 2, spent: 1200, joined: "2026-05-01", status: "inactive" },
    { name: "Nour El-Deen", email: "nour@example.com", orders: 9, spent: 7600, joined: "2026-01-28", status: "active" },
    { name: "Mona Farouk", email: "mona@example.com", orders: 6, spent: 5300, joined: "2026-04-14", status: "active" },
    { name: "Hassan Ibrahim", email: "hassan@example.com", orders: 3, spent: 2400, joined: "2026-06-09", status: "inactive" },
    { name: "Rana Samir", email: "rana@example.com", orders: 11, spent: 9800, joined: "2025-12-05", status: "vip" },
    { name: "Karim Fathy", email: "karim@example.com", orders: 4, spent: 3100, joined: "2026-03-18", status: "active" }
];

let customersState = { search: "", status: "all" };

function getVisibleCustomers() {
    return customers.filter((customer) => {
        const matchSearch =
            customer.name.toLowerCase().includes(customersState.search.trim().toLowerCase()) ||
            customer.email.toLowerCase().includes(customersState.search.trim().toLowerCase());
        const matchStatus = customersState.status === "all" || customer.status === customersState.status;
        return matchSearch && matchStatus;
    });
}

function buildCustomerRow(customer) {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.classList.add("customer-name-container");
    nameTd.dataset.label = "Customer";
    const avatar = document.createElement("div");
    avatar.classList.add("customer-avatar");
    avatar.textContent = customer.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const name = document.createElement("h4");
    name.textContent = customer.name;
    nameTd.append(avatar, name);

    const email = document.createElement("td");
    email.dataset.label = "Email";
    email.textContent = customer.email;

    const ordersTd = document.createElement("td");
    ordersTd.classList.add("hide-mobile");
    ordersTd.dataset.label = "Orders";
    ordersTd.textContent = customer.orders;

    const spent = document.createElement("td");
    spent.classList.add("hide-mobile");
    spent.dataset.label = "Total Spent";
    spent.textContent = `$${customer.spent.toLocaleString()}`;

    const joined = document.createElement("td");
    joined.classList.add("hide-mobile");
    joined.dataset.label = "Joined";
    joined.textContent = customer.joined;

    const status = document.createElement("td");
    status.classList.add("hide-mobile");
    status.dataset.label = "Status";
    const statusContent = document.createElement("span");
    statusContent.classList.add("customer-status", customer.status);
    statusContent.textContent = customer.status;
    status.append(statusContent);

    const actions = document.createElement("td");
    actions.dataset.label = "Actions";
    const actionButtons = productAction({
        onView: () => showItemDetails(customer.name, {
            Email: customer.email,
            Orders: customer.orders,
            "Total Spent": `$${customer.spent.toLocaleString()}`,
            Joined: customer.joined,
            Status: customer.status
        }),
        onEdit: () => editCustomer(customer),
        onDelete: () => deleteCustomer(customer)
    });
    actions.append(actionButtons);

    tr.append(nameTd, email, ordersTd, spent, joined, status, actions);
    return tr;
}

function editCustomer(customer) {
    Swal.fire({
        title: "Edit Customer",
        html: `
            <input id="swal-name" class="swal2-input" placeholder="Name" value="${customer.name}">
            <input id="swal-email" class="swal2-input" placeholder="Email" value="${customer.email}">
            <input id="swal-orders" class="swal2-input" type="number" min="0" placeholder="Orders" value="${customer.orders}">
            <input id="swal-spent" class="swal2-input" type="number" min="0" placeholder="Total Spent" value="${customer.spent}">
            <select id="swal-status" class="swal2-input">
                <option value="active">active</option>
                <option value="vip">vip</option>
                <option value="inactive">inactive</option>
            </select>
        `,
        showCancelButton: true,
        confirmButtonColor: "#3B82F6",
        cancelButtonColor: "#393755",
        confirmButtonText: "Save",
        background: "#292844",
        color: "#fff",
        didOpen: () => {
            document.getElementById("swal-status").value = customer.status;
        },
        preConfirm: () => {
            const name = document.getElementById("swal-name").value.trim();
            const email = document.getElementById("swal-email").value.trim();
            const ordersCount = Number(document.getElementById("swal-orders").value);
            const spent = Number(document.getElementById("swal-spent").value);
            if (!name || !email || ordersCount < 0 || spent < 0) {
                Swal.showValidationMessage("Please fill all fields correctly");
                return false;
            }
            return { name, email, orders: ordersCount, spent, status: document.getElementById("swal-status").value };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Object.assign(customer, result.value);
            showToast("Customer updated successfully");
            dashboardContainer.innerHTML = "";
            renderCustomersPage();
        }
    });
}

function renderCustomersPage() {
    const container = document.createElement("section");
    container.classList.add("recent-products");

    const header = document.createElement("div");
    header.classList.add("product-header");

    const titleWrap = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = "All Customers";
    const desc = document.createElement("p");
    desc.textContent = "Manage and view your customers";
    titleWrap.append(title, desc);
    header.append(titleWrap);

    const toolbar = document.createElement("div");
    toolbar.classList.add("products-toolbar");

    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.placeholder = "Search customers...";
    searchInput.classList.add("product-search");

    const statusSelect = document.createElement("select");
    statusSelect.classList.add("product-filter");

    const allStatusOption = document.createElement("option");
    allStatusOption.value = "all";
    allStatusOption.textContent = "All Statuses";
    statusSelect.append(allStatusOption);

    ["active", "vip", "inactive"].forEach((st) => {
        const option = document.createElement("option");
        option.value = st;
        option.textContent = st;
        statusSelect.append(option);
    });

    toolbar.append(searchInput, statusSelect);

    const table = document.createElement("table");
    table.classList.add("recent-products-table");

    const thead = document.createElement("thead");
    const theadTr = document.createElement("tr");
    ["Customer", "Email", "Orders", "Total Spent", "Joined", "Status", "Actions"].forEach((th, index) => {
        const cell = document.createElement("th");
        cell.textContent = th;
        if ([2, 3, 4, 5].includes(index)) cell.classList.add("hide-mobile");
        theadTr.append(cell);
    });
    thead.append(theadTr);

    const tbody = document.createElement("tbody");

    function renderTableBody() {
        tbody.innerHTML = "";
        const visibleCustomers = getVisibleCustomers();

        if (visibleCustomers.length === 0) {
            const emptyTr = document.createElement("tr");
            const emptyTd = document.createElement("td");
            emptyTd.colSpan = 7;
            emptyTd.textContent = "No customers found";
            emptyTd.classList.add("empty-state");
            emptyTr.append(emptyTd);
            tbody.append(emptyTr);
            return;
        }

        visibleCustomers.forEach((customer) => tbody.append(buildCustomerRow(customer)));
    }

    searchInput.addEventListener("input", () => {
        customersState.search = searchInput.value;
        renderTableBody();
    });

    statusSelect.addEventListener("change", () => {
        customersState.status = statusSelect.value;
        renderTableBody();
    });

    renderTableBody();

    table.append(thead, tbody);
    container.append(header, toolbar, table);
    dashboardContainer.append(container);
}

function deleteCustomer(customer) {
    Swal.fire({
        title: "Delete customer?",
        text: `${customer.name} will be removed permanently.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#3B82F6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        background: "#292844",
        color: "#fff"
    }).then((result) => {
        if (result.isConfirmed) {
            const index = customers.findIndex((c) => c.name === customer.name);
            if (index !== -1) {
                customers.splice(index, 1);
            }
            dashboardContainer.innerHTML = "";
            renderCustomersPage();
            Swal.fire({
                title: "Deleted!",
                text: "Customer deleted successfully.",
                icon: "success",
                confirmButtonColor: "#3B82F6",
                background: "#292844",
                color: "#fff"
            });
        }
    });
}


// inventory page -------------------------------------------------

function renderDataTablePage({ title, desc, searchPlaceholder, data, state, filterOptions, searchFields, headers, buildRow, emptyText = "No results found", hideMobileColumns = [] }) {
    const container = document.createElement("section");
    container.classList.add("recent-products");

    const header = document.createElement("div");
    header.classList.add("product-header");

    const titleWrap = document.createElement("div");
    const h = document.createElement("h3");
    h.textContent = title;
    const p = document.createElement("p");
    p.textContent = desc;
    titleWrap.append(h, p);
    header.append(titleWrap);

    const toolbar = document.createElement("div");
    toolbar.classList.add("products-toolbar");

    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.placeholder = searchPlaceholder;
    searchInput.classList.add("product-search");

    const filterSelect = document.createElement("select");
    filterSelect.classList.add("product-filter");

    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All Statuses";
    filterSelect.append(allOption);

    filterOptions.forEach((st) => {
        const opt = document.createElement("option");
        opt.value = st;
        opt.textContent = st;
        filterSelect.append(opt);
    });

    toolbar.append(searchInput, filterSelect);

    const table = document.createElement("table");
    table.classList.add("recent-products-table");

    const thead = document.createElement("thead");
    const theadTr = document.createElement("tr");
    headers.forEach((th, index) => {
        const cell = document.createElement("th");
        cell.textContent = th;
        if (hideMobileColumns.includes(index)) cell.classList.add("hide-mobile");
        theadTr.append(cell);
    });
    thead.append(theadTr);

    const tbody = document.createElement("tbody");

    function visibleRows() {
        return data.filter((row) => {
            const q = state.search.trim().toLowerCase();
            const matchSearch = q === "" || searchFields.some((f) => String(row[f]).toLowerCase().includes(q));
            const matchFilter = state.status === "all" || row[state.filterKey] === state.status;
            return matchSearch && matchFilter;
        });
    }

    function renderBody() {
        tbody.innerHTML = "";
        const rows = visibleRows();

        if (rows.length === 0) {
            const emptyTr = document.createElement("tr");
            const emptyTd = document.createElement("td");
            emptyTd.colSpan = headers.length;
            emptyTd.textContent = emptyText;
            emptyTd.classList.add("empty-state");
            emptyTr.append(emptyTd);
            tbody.append(emptyTr);
            return;
        }

        rows.forEach((row) => {
            const tr = buildRow(row);
            tr.querySelectorAll("td").forEach((td, index) => {
                if (hideMobileColumns.includes(index)) td.classList.add("hide-mobile");
                td.dataset.label = headers[index];
            });
            tbody.append(tr);
        });
    }

    searchInput.addEventListener("input", () => {
        state.search = searchInput.value;
        renderBody();
    });

    filterSelect.addEventListener("change", () => {
        state.status = filterSelect.value;
        renderBody();
    });

    renderBody();

    table.append(thead, tbody);
    container.append(header, toolbar, table);
    dashboardContainer.append(container);
}

let inventoryState = { search: "", status: "all", filterKey: "status" };

function renderInventoryPage() {
    renderDataTablePage({
        title: "Inventory",
        desc: "Track product stock levels",
        searchPlaceholder: "Search inventory...",
        data: products.map((p) => ({ ...p, reorderLevel: 5 })),
        state: inventoryState,
        filterOptions: ["in-stock", "low-stock", "out-of-stock"],
        searchFields: ["name", "category"],
        headers: ["Product", "Category", "Stock", "Reorder Level", "Status", "Actions"],
        emptyText: "No inventory found",
        hideMobileColumns: [1, 3, 4],
        buildRow: (product) => {
            const tr = document.createElement("tr");

            const nameTd = document.createElement("td");
            nameTd.classList.add("product-name-img-container");
            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;
            img.loading = "lazy";
            img.classList.add("product-img");
            const name = document.createElement("h4");
            name.textContent = product.name;
            nameTd.append(img, name);

            const catTd = document.createElement("td");
            catTd.textContent = product.category;

            const stockTd = document.createElement("td");
            stockTd.textContent = product.stock;

            const reorderTd = document.createElement("td");
            reorderTd.textContent = product.reorderLevel;

            const statusTd = document.createElement("td");
            const statusSpan = document.createElement("span");
            statusSpan.classList.add("status", product.status);
            statusSpan.textContent = product.status;
            statusTd.append(statusSpan);

            const actionsTd = document.createElement("td");
            const actions = productAction({
                onView: () => showItemDetails(product.name, {
                    Category: product.category,
                    Stock: product.stock,
                    "Reorder Level": product.reorderLevel,
                    Status: product.status
                }, product.image),
                onEdit: () => openEditModal(product),
                onDelete: () => deleteProduct(product, renderInventoryPage)
            });
            actionsTd.append(actions);

            tr.append(nameTd, catTd, stockTd, reorderTd, statusTd, actionsTd);
            return tr;
        }
    });
}

// discounts page -------------------------------------------------

const discounts = [
    { id: 1, code: "SAVE10", type: "Percentage", value: 10, validUntil: "2026-12-31", status: "active" },
    { id: 2, code: "SUMMER50", type: "Fixed", value: 50, validUntil: "2026-09-01", status: "active" },
    { id: 3, code: "VIP20", type: "Percentage", value: 20, validUntil: "2026-08-15", status: "expired" },
    { id: 4, code: "WELCOME15", type: "Percentage", value: 15, validUntil: "2027-01-01", status: "active" },
    { id: 5, code: "FLASH30", type: "Percentage", value: 30, validUntil: "2026-08-20", status: "active" },
    { id: 6, code: "OLDCODE", type: "Fixed", value: 25, validUntil: "2026-05-01", status: "expired" }
];

let discountsState = { search: "", status: "all", filterKey: "status" };

function renderDiscountsPage() {
    renderDataTablePage({
        title: "Discounts",
        desc: "Manage promotional codes and offers",
        searchPlaceholder: "Search discounts...",
        data: discounts,
        state: discountsState,
        filterOptions: ["active", "expired"],
        searchFields: ["code", "type"],
        headers: ["Code", "Type", "Value", "Valid Until", "Status", "Actions"],
        emptyText: "No discounts found",
        hideMobileColumns: [1, 3, 4],
        buildRow: (discount) => {
            const tr = document.createElement("tr");

            const codeTd = document.createElement("td");
            const code = document.createElement("h4");
            code.textContent = discount.code;
            codeTd.append(code);

            const typeTd = document.createElement("td");
            typeTd.textContent = discount.type;

            const valueTd = document.createElement("td");
            valueTd.textContent = discount.type === "Percentage" ? `${discount.value}%` : `$${discount.value}`;

            const validTd = document.createElement("td");
            validTd.textContent = discount.validUntil;

            const statusTd = document.createElement("td");
            const statusSpan = document.createElement("span");
            statusSpan.classList.add("order-status", discount.status);
            statusSpan.textContent = discount.status;
            statusTd.append(statusSpan);

            const actionsTd = document.createElement("td");
            const actions = productAction({
                onView: () => showItemDetails(`Discount ${discount.code}`, {
                    Type: discount.type,
                    Value: discount.type === "Percentage" ? `${discount.value}%` : `$${discount.value}`,
                    "Valid Until": discount.validUntil,
                    Status: discount.status
                }),
                onEdit: () => editDiscount(discount),
                onDelete: () => deleteDiscount(discount)
            });
            actionsTd.append(actions);

            tr.append(codeTd, typeTd, valueTd, validTd, statusTd, actionsTd);
            return tr;
        }
    });
}

function editDiscount(discount) {
    Swal.fire({
        title: "Edit Discount",
        html: `
            <input id="swal-code" class="swal2-input" placeholder="Code" value="${discount.code}">
            <select id="swal-type" class="swal2-input">
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
            </select>
            <input id="swal-value" class="swal2-input" type="number" min="0" placeholder="Value" value="${discount.value}">
            <input id="swal-valid" class="swal2-input" type="date" placeholder="Valid Until" value="${discount.validUntil}">
        `,
        showCancelButton: true,
        confirmButtonColor: "#3B82F6",
        cancelButtonColor: "#393755",
        confirmButtonText: "Save",
        background: "#292844",
        color: "#fff",
        didOpen: () => {
            document.getElementById("swal-type").value = discount.type;
        },
        preConfirm: () => {
            const code = document.getElementById("swal-code").value.trim();
            const value = Number(document.getElementById("swal-value").value);
            if (!code || value < 0) {
                Swal.showValidationMessage("Please fill all fields correctly");
                return false;
            }
            return {
                code,
                type: document.getElementById("swal-type").value,
                value,
                validUntil: document.getElementById("swal-valid").value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Object.assign(discount, result.value);
            showToast("Discount updated successfully");
            dashboardContainer.innerHTML = "";
            renderDiscountsPage();
        }
    });
}

function deleteDiscount(discount) {
    Swal.fire({
        title: "Delete discount?",
        text: `Code "${discount.code}" will be removed permanently.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#3B82F6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        background: "#292844",
        color: "#fff"
    }).then((result) => {
        if (result.isConfirmed) {
            const index = discounts.findIndex((d) => d.id === discount.id);
            if (index !== -1) {
                discounts.splice(index, 1);
            }
            dashboardContainer.innerHTML = "";
            renderDiscountsPage();
            Swal.fire({
                title: "Deleted!",
                text: "Discount deleted successfully.",
                icon: "success",
                confirmButtonColor: "#3B82F6",
                background: "#292844",
                color: "#fff"
            });
        }
    });
}

// reviews page -------------------------------------------------

const reviews = [
    { id: 1, customer: "Ahmed Hassan", product: "MacBook Pro 14", rating: 5, comment: "Outstanding performance and battery life.", date: "2026-08-18", status: "approved" },
    { id: 2, customer: "Sara Ali", product: "iPhone 15 Pro", rating: 4, comment: "Great camera, a bit heavy.", date: "2026-08-16", status: "approved" },
    { id: 3, customer: "Omar Khaled", product: "Sony WH-1000XM5", rating: 5, comment: "Best noise cancelling I've tried.", date: "2026-08-14", status: "pending" },
    { id: 4, customer: "Layla Mostafa", product: "iPad Air", rating: 3, comment: "Good tablet, screen could be brighter.", date: "2026-08-12", status: "approved" },
    { id: 5, customer: "Youssef Adel", product: "Logitech MX Master 3S", rating: 5, comment: "Perfect ergonomic mouse.", date: "2026-08-10", status: "pending" },
    { id: 6, customer: "Nour El-Deen", product: "Samsung Galaxy S24", rating: 4, comment: "Fast and smooth, good value.", date: "2026-08-08", status: "approved" }
];

let reviewsState = { search: "", status: "all", filterKey: "status" };

function starRating(rating) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
        html += i <= rating ? '<i class="fa-solid fa-star star-filled"></i>' : '<i class="fa-regular fa-star"></i>';
    }
    return html;
}

function renderReviewsPage() {
    renderDataTablePage({
        title: "Reviews",
        desc: "Review customer feedback",
        searchPlaceholder: "Search reviews...",
        data: reviews,
        state: reviewsState,
        filterOptions: ["approved", "pending"],
        searchFields: ["customer", "product", "comment"],
        headers: ["Customer", "Product", "Rating", "Comment", "Date", "Status", "Actions"],
        emptyText: "No reviews found",
        hideMobileColumns: [1, 3, 4, 5],
        buildRow: (review) => {
            const tr = document.createElement("tr");

            const customerTd = document.createElement("td");
            customerTd.textContent = review.customer;

            const productTd = document.createElement("td");
            productTd.textContent = review.product;

            const ratingTd = document.createElement("td");
            ratingTd.innerHTML = starRating(review.rating);
            ratingTd.classList.add("rating-cell");

            const commentTd = document.createElement("td");
            commentTd.textContent = review.comment;
            commentTd.classList.add("comment-cell");

            const dateTd = document.createElement("td");
            dateTd.textContent = review.date;

            const statusTd = document.createElement("td");
            const statusSpan = document.createElement("span");
            statusSpan.classList.add("order-status", review.status);
            statusSpan.textContent = review.status;
            statusTd.append(statusSpan);

            const actionsTd = document.createElement("td");
            const actions = productAction({
                onView: () => showItemDetails(`Review by ${review.customer}`, {
                    Product: review.product,
                    Rating: `${review.rating} / 5`,
                    Comment: review.comment,
                    Date: review.date,
                    Status: review.status
                }),
                onDelete: () => deleteReview(review)
            });
            actionsTd.append(actions);

            tr.append(customerTd, productTd, ratingTd, commentTd, dateTd, statusTd, actionsTd);
            return tr;
        }
    });
}

function deleteReview(review) {
    Swal.fire({
        title: "Delete review?",
        text: `Review by ${review.customer} will be removed permanently.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#3B82F6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        background: "#292844",
        color: "#fff"
    }).then((result) => {
        if (result.isConfirmed) {
            const index = reviews.findIndex((r) => r.id === review.id);
            if (index !== -1) {
                reviews.splice(index, 1);
            }
            dashboardContainer.innerHTML = "";
            renderReviewsPage();
            Swal.fire({
                title: "Deleted!",
                text: "Review deleted successfully.",
                icon: "success",
                confirmButtonColor: "#3B82F6",
                background: "#292844",
                color: "#fff"
            });
        }
    });
}

// users page -------------------------------------------------

const users = [
    { id: 1, name: "Mahmoud", email: "mahmoud@example.com", role: "Admin", status: "active" },
    { id: 2, name: "Sara Ali", email: "sara@example.com", role: "Editor", status: "active" },
    { id: 3, name: "Omar Khaled", email: "omar@example.com", role: "Viewer", status: "active" },
    { id: 4, name: "Layla Mostafa", email: "layla@example.com", role: "Editor", status: "inactive" },
    { id: 5, name: "Youssef Adel", email: "youssef@example.com", role: "Viewer", status: "inactive" }
];

let usersState = { search: "", status: "all", filterKey: "status" };

function renderUsersPage() {
    renderDataTablePage({
        title: "Users",
        desc: "Manage system users and roles",
        searchPlaceholder: "Search users...",
        data: users,
        state: usersState,
        filterOptions: ["active", "inactive"],
        searchFields: ["name", "email", "role"],
        headers: ["User", "Email", "Role", "Status", "Actions"],
        emptyText: "No users found",
        hideMobileColumns: [1, 3],
        buildRow: (user) => {
            const tr = document.createElement("tr");

            const nameTd = document.createElement("td");
            nameTd.classList.add("customer-name-container");
            const avatar = document.createElement("div");
            avatar.classList.add("customer-avatar");
            avatar.textContent = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
            const name = document.createElement("h4");
            name.textContent = user.name;
            nameTd.append(avatar, name);

            const emailTd = document.createElement("td");
            emailTd.textContent = user.email;

            const roleTd = document.createElement("td");
            roleTd.textContent = user.role;

            const statusTd = document.createElement("td");
            const statusSpan = document.createElement("span");
            statusSpan.classList.add("customer-status", user.status);
            statusSpan.textContent = user.status;
            statusTd.append(statusSpan);

            const actionsTd = document.createElement("td");
            const actions = productAction({
                onView: () => showItemDetails(user.name, {
                    Email: user.email,
                    Role: user.role,
                    Status: user.status
                }),
                onEdit: () => editUser(user),
                onDelete: () => deleteUser(user)
            });
            actionsTd.append(actions);

            tr.append(nameTd, emailTd, roleTd, statusTd, actionsTd);
            return tr;
        }
    });
}

function editUser(user) {
    Swal.fire({
        title: "Edit User",
        html: `
            <input id="swal-name" class="swal2-input" placeholder="Name" value="${user.name}">
            <input id="swal-email" class="swal2-input" placeholder="Email" value="${user.email}">
            <select id="swal-role" class="swal2-input">
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
            </select>
        `,
        showCancelButton: true,
        confirmButtonColor: "#3B82F6",
        cancelButtonColor: "#393755",
        confirmButtonText: "Save",
        background: "#292844",
        color: "#fff",
        didOpen: () => {
            document.getElementById("swal-role").value = user.role;
        },
        preConfirm: () => {
            const name = document.getElementById("swal-name").value.trim();
            const email = document.getElementById("swal-email").value.trim();
            if (!name || !email) {
                Swal.showValidationMessage("Please fill all fields correctly");
                return false;
            }
            return { name, email, role: document.getElementById("swal-role").value };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Object.assign(user, result.value);
            showToast("User updated successfully");
            dashboardContainer.innerHTML = "";
            renderUsersPage();
        }
    });
}

function deleteUser(user) {
    Swal.fire({
        title: "Delete user?",
        text: `${user.name} will be removed permanently.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#3B82F6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        background: "#292844",
        color: "#fff"
    }).then((result) => {
        if (result.isConfirmed) {
            const index = users.findIndex((u) => u.id === user.id);
            if (index !== -1) {
                users.splice(index, 1);
            }
            dashboardContainer.innerHTML = "";
            renderUsersPage();
            Swal.fire({
                title: "Deleted!",
                text: "User deleted successfully.",
                icon: "success",
                confirmButtonColor: "#3B82F6",
                background: "#292844",
                color: "#fff"
            });
        }
    });
}

// settings page -------------------------------------------------

function renderSettingsPage() {
    const container = document.createElement("section");
    container.classList.add("recent-products");

    const header = document.createElement("div");
    header.classList.add("product-header");
    const titleWrap = document.createElement("div");
    const h = document.createElement("h3");
    h.textContent = "Settings";
    const p = document.createElement("p");
    p.textContent = "Manage your store preferences and security";
    titleWrap.append(h, p);
    header.append(titleWrap);

    const panel = document.createElement("div");
    panel.classList.add("settings-panel");

    const form = document.createElement("form");
    form.id = "settings-form";

    const grid = document.createElement("div");
    grid.classList.add("settings-grid");

    // general information
    const generalSection = document.createElement("div");
    generalSection.classList.add("settings-section");
    const generalTitle = document.createElement("h4");
    generalTitle.innerHTML = '<i class="fa-solid fa-store"></i> General Information';
    generalSection.append(generalTitle);

    const nameField = makeSettingsField("Store Name", "input", "text", "ProductHub");
    const emailField = makeSettingsField("Support Email", "input", "email", "support@producthub.com");
    const phoneField = makeSettingsField("Phone Number", "input", "tel", "+1 234 567 890");
    const addressField = makeSettingsField("Address", "input", "text", "123 Market Street, NYC");

    const row1 = document.createElement("div");
    row1.classList.add("form-row");
    row1.append(nameField, emailField);

    const row2 = document.createElement("div");
    row2.classList.add("form-row");
    row2.append(phoneField, addressField);

    generalSection.append(row1, row2);

    // preferences
    const prefSection = document.createElement("div");
    prefSection.classList.add("settings-section");
    const prefTitle = document.createElement("h4");
    prefTitle.innerHTML = '<i class="fa-solid fa-sliders"></i> Store Preferences';
    prefSection.append(prefTitle);

    const currencyField = makeSettingsField("Currency", "select", "", "USD", ["USD", "EUR", "EGP"]);
    const languageField = makeSettingsField("Language", "select", "", "English", ["English", "Arabic", "French"]);
    const timezoneField = makeSettingsField("Timezone", "select", "", "(GMT+2) Cairo", ["(GMT+2) Cairo", "(GMT+0) London", "(GMT-5) New York"]);
    const dateField = makeSettingsField("Date Format", "select", "", "MM/DD/YYYY", ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]);

    const row3 = document.createElement("div");
    row3.classList.add("form-row");
    row3.append(currencyField, languageField);

    const row4 = document.createElement("div");
    row4.classList.add("form-row");
    row4.append(timezoneField, dateField);

    prefSection.append(row3, row4);

    // notifications
    const notifSection = document.createElement("div");
    notifSection.classList.add("settings-section");
    const notifTitle = document.createElement("h4");
    notifTitle.innerHTML = '<i class="fa-solid fa-bell"></i> Notifications';
    notifSection.append(notifTitle);

    const notif1 = makeToggleField("Email notifications", "email-notif");
    const notif2 = makeToggleField("Low stock alerts", "stock-alert");
    const notif3 = makeToggleField("Order updates", "order-update");
    const notif4 = makeToggleField("Promotional emails", "promo-email");

    const notifWrapper = document.createElement("div");
    notifWrapper.classList.add("notifications-list");
    notifWrapper.append(notif1, notif2, notif3, notif4);
    notifSection.append(notifWrapper);

    // security
    const securitySection = document.createElement("div");
    securitySection.classList.add("settings-section");
    const securityTitle = document.createElement("h4");
    securityTitle.innerHTML = '<i class="fa-solid fa-lock"></i> Change Password';
    securitySection.append(securityTitle);

    const currentPassField = makeSettingsField("Current Password", "input", "password", "");
    currentPassField.querySelector("input").placeholder = "Enter current password";
    const newPassField = makeSettingsField("New Password", "input", "password", "");
    newPassField.querySelector("input").placeholder = "Enter new password";
    const confirmPassField = makeSettingsField("Confirm Password", "input", "password", "");
    confirmPassField.querySelector("input").placeholder = "Confirm new password";

    const passRow1 = document.createElement("div");
    passRow1.classList.add("form-row");
    passRow1.append(currentPassField);

    const passRow2 = document.createElement("div");
    passRow2.classList.add("form-row");
    passRow2.append(newPassField, confirmPassField);

    securitySection.append(passRow1, passRow2);

    grid.append(generalSection, prefSection, notifSection, securitySection);

    const actionsRow = document.createElement("div");
    actionsRow.classList.add("settings-actions");

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.classList.add("cancel-btn");
    resetBtn.textContent = "Reset";

    const saveBtn = document.createElement("button");
    saveBtn.type = "submit";
    saveBtn.classList.add("save-product-btn");
    saveBtn.textContent = "Save Changes";

    actionsRow.append(resetBtn, saveBtn);

    form.append(grid, actionsRow);
    panel.append(form);
    container.append(header, panel);
    dashboardContainer.append(container);

    resetBtn.addEventListener("click", () => {
        form.reset();
        showToast("Settings reset");
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const newPass = newPassField.querySelector("input").value;
        const confirmPass = confirmPassField.querySelector("input").value;

        if (newPass && newPass.length < 6) {
            Swal.fire({
                title: "Weak password",
                text: "Password must be at least 6 characters.",
                icon: "warning",
                confirmButtonColor: "#3B82F6",
                background: "#292844",
                color: "#fff"
            });
            return;
        }

        if (newPass && newPass !== confirmPass) {
            Swal.fire({
                title: "Password mismatch",
                text: "New password and confirmation do not match.",
                icon: "error",
                confirmButtonColor: "#3B82F6",
                background: "#292844",
                color: "#fff"
            });
            return;
        }

        showToast("Settings saved successfully");
        form.reset();
    });
}

function makeSettingsField(labelText, type, inputType = "text", value = "", options = []) {
    const field = document.createElement("div");
    field.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = labelText;

    let control;
    if (type === "select") {
        control = document.createElement("select");
        options.forEach((opt) => {
            const option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            control.append(option);
        });
        if (value) control.value = value;
    } else {
        control = document.createElement("input");
        control.type = inputType;
        control.value = value;
    }

    field.append(label, control);
    return field;
}

function makeToggleField(labelText, id) {
    const field = document.createElement("div");
    field.classList.add("toggle-field");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", id);

    const toggle = document.createElement("label");
    toggle.classList.add("switch");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.checked = true;

    const slider = document.createElement("span");
    slider.classList.add("slider");

    toggle.append(checkbox, slider);
    field.append(label, toggle);
    return field;
}

// logout -------------------------------------------------

function logoutUser() {
    Swal.fire({
        title: "Logout?",
        text: "You will be returned to the login screen.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#3B82F6",
        confirmButtonText: "Logout",
        cancelButtonText: "Cancel",
        background: "#292844",
        color: "#fff"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Logged out!",
                text: "See you soon.",
                icon: "success",
                confirmButtonColor: "#3B82F6",
                background: "#292844",
                color: "#fff"
            });
        }
    });
}

// current page tracking -------------------------------------------------

let currentPage = "home";

function renderCurrentPage() {
    switch (currentPage) {
        case "home": renderHome(); break;
        case "products": renderProductsPage(); break;
        case "orders": renderOrdersPage(); break;
        case "customers": renderCustomersPage(); break;
        case "inventory": renderInventoryPage(); break;
        case "discounts": renderDiscountsPage(); break;
        case "reviews": renderReviewsPage(); break;
        case "settings": renderSettingsPage(); break;
        case "users": renderUsersPage(); break;
    }
}

// nav link 
function goToPage(index) {
    navLinks.forEach((l) => {
        l.classList.remove("active");
    });
    navLinks[index].classList.add("active");
    document.querySelector("#page-title").textContent = navLinks[index].querySelector("span").textContent;
    document.body.classList.remove("sidebar-open");
    dashboardContainer.innerHTML = "";

    switch (index) {
        case 0:
            currentPage = "home";
            renderHome();
            break;

        case 1:
            currentPage = "products";
            renderProductsPage();
            break;

        case 2:
            currentPage = "orders";
            renderOrdersPage();
            break;

        case 3:
            currentPage = "customers";
            renderCustomersPage();
            break;

        case 4:
            currentPage = "inventory";
            renderInventoryPage();
            break;

        case 5:
            currentPage = "discounts";
            renderDiscountsPage();
            break;

        case 6:
            currentPage = "reviews";
            renderReviewsPage();
            break;

        case 7:
            currentPage = "settings";
            renderSettingsPage();
            break;

        case 8:
            currentPage = "users";
            renderUsersPage();
            break;

        case 9:
            logoutUser();
            break;
    }
}

let navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link, i) => {
    link.addEventListener("click", () => goToPage(i));
});


// profile dropdown 
const profileMenu = document.querySelector("#profile-menu");
const profileDropdown = document.querySelector("#profile-dropdown");
const profileChevron = document.querySelector("#profile-chevron");

function closeProfileDropdown() {
    profileDropdown.classList.remove("open");
    profileChevron.classList.remove("rotate");
}

profileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    const action = e.target.closest(".dropdown-item")?.dataset.action;

    if (action) {
        closeProfileDropdown();
        if (action === "profile") {
            openProfileModal();
        } else if (action === "settings") {
            goToPage(7);
        } else if (action === "logout") {
            logoutUser();
        }
        return;
    }

    profileDropdown.classList.toggle("open");
    profileChevron.classList.toggle("rotate");
});

document.addEventListener("click", closeProfileDropdown);

function openProfileModal() {
    Swal.fire({
        title: "My Profile",
        html: `
            <div class="profile-modal">
                <img src="assets/images/photo_2026-07-12_09-52-53.jpg" alt="profile-img">
                <h3>Mahmoud</h3>
                <p class="profile-role">Admin</p>
                <div class="detail-list">
                    <div class="detail-row"><span>Email</span><strong>mahmoud@producthub.com</strong></div>
                    <div class="detail-row"><span>Role</span><strong>Administrator</strong></div>
                    <div class="detail-row"><span>Joined</span><strong>January 2026</strong></div>
                    <div class="detail-row"><span>Total Orders</span><strong>128</strong></div>
                    <div class="detail-row"><span>Total Revenue</span><strong>$45,231</strong></div>
                </div>
            </div>
        `,
        confirmButtonText: "Edit Profile",
        showCancelButton: true,
        cancelButtonText: "Close",
        cancelButtonColor: "#393755",
        confirmButtonColor: "#3B82F6",
        background: "#292844",
        color: "#fff",
        width: 440
    }).then((result) => {
        if (result.isConfirmed) {
            goToPage(7);
        }
    });
}


// mobile sidebar toggle 
const menuToggle = document.querySelector("#menu-toggle");
const sidebarBackdrop = document.querySelector("#sidebar-backdrop");

menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-open");
});

sidebarBackdrop.addEventListener("click", () => {
    document.body.classList.remove("sidebar-open");
});

window.addEventListener("resize", () => {
    if (salesChart) salesChart.resize();
});


// add / edit product 
const productModal = document.querySelector(".product-modal");
const modalTitle = document.querySelector(".modal-header h2");
const submitBtn = document.querySelector(".save-product-btn");

let editingProductId = null;

function openAddModal() {
    editingProductId = null;
    addProductForm.reset();
    modalTitle.textContent = "Add New Product";
    submitBtn.textContent = "Add Product";
    productModal.classList.add("active");
}

function openEditModal(product) {
    editingProductId = product.id;
    document.querySelector("#product-name").value = product.name;
    document.querySelector("#product-category").value = product.category;
    document.querySelector("#product-price").value = product.price;
    document.querySelector("#product-stock").value = product.stock;
    document.querySelector("#product-image").value = product.image;
    modalTitle.textContent = "Edit Product";
    submitBtn.textContent = "Save Changes";
    productModal.classList.add("active");
}

document.addEventListener("click", (e) => {
    if (e.target.closest(".btn")) {
        openAddModal();
    }
});

const closeModalBtn = document.querySelector(".close-modal");
const cancelBtn = document.querySelector(".cancel-btn");
const modalOverlay = document.querySelector(".modal-overlay");

function closeModal() {
    productModal.classList.remove("active");
    editingProductId = null;
}

closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

const addProductForm = document.querySelector("#add-product-form");

function renderProductsPage() {
    currentPage = "products";
    dashboardContainer.innerHTML = "";
    navLinks.forEach((l) => {
        l.classList.remove("active");
    });
    navLinks[1].classList.add("active");
    renderProducts(products);
}

addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#product-name").value;
    const category = document.querySelector("#product-category").value;
    const price = Number(document.querySelector("#product-price").value);
    const stock = Number(document.querySelector("#product-stock").value);
    const image = document.querySelector("#product-image").value;

    if (editingProductId !== null) {
        const product = products.find((p) => p.id === editingProductId);
        if (product) {
            product.name = name;
            product.category = category;
            product.price = price;
            product.stock = stock;
            product.status = getProductStatus(stock);
            product.image = image;
        }

        showToast("Product updated successfully");
    } else {
        const newProduct = {
            id: Math.max(...products.map((p) => p.id), 0) + 1,
            name,
            category,
            price,
            stock,
            status: getProductStatus(stock),
            image
        };

        products.push(newProduct);

        showToast("Product added successfully");
    }

    saveProducts();
    renderCurrentPage();
    closeModal();
    addProductForm.reset();
    modalTitle.textContent = "Add New Product";
    submitBtn.textContent = "Add Product";
});

function deleteProduct(product, afterDelete = renderProductsPage) {
    Swal.fire({
        title: "Delete product?",
        text: `"${product.name}" will be removed permanently.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#3B82F6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        background: "#292844",
        color: "#fff"
    }).then((result) => {
        if (result.isConfirmed) {
            const index = products.findIndex((p) => p.id === product.id);
            if (index !== -1) {
                products.splice(index, 1);
                saveProducts();
                afterDelete();
            }

            Swal.fire({
                title: "Deleted!",
                text: "Product deleted successfully.",
                icon: "success",
                confirmButtonColor: "#3B82F6",
                background: "#292844",
                color: "#fff"
            });
        }
    });
}

function showToast(message) {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 2000,
        background: "#292844",
        color: "#fff"
    });
}

function getProductStatus(stock) {

    if (stock === 0) {
        return "out-of-stock";
    }

    if (stock <= 10) {
        return "low-stock";
    }

    return "in-stock";
}