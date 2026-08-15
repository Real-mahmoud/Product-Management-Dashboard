// nav link 
let navLinks= document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
    link.addEventListener("click", function() {
        navLinks.forEach((l) => {
            l.classList.remove("active");
        });
        this.classList.add("active");
    });
});

// chart 
const ctx = document.getElementById("myChart").getContext("2d");

const massPopChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [
            "Aug 1",
            "Aug 6",
            "Aug 11",
            "Aug 16",
            "Aug 21",
            "Aug 26",
            "Aug 31"
        ],
        datasets: [
            {
                label: "Revenue",
                data: [12000, 19000, 21000, 25000, 23000, 30000, 35000],
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


const products = [
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

let recentProductTable = document.querySelector(".recent-products-table");

function renderProducts(products) {
    products.forEach(product=>{
        let tr=document.createElement("tr")
        let ProductNameAndImage= document.createElement("td");
        ProductNameAndImage.classList.add("product-name-img-container");


        const productName = document.createElement("h4");
        productName.textContent = product.name;

        const productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt = product.name;
        productImg.classList.add("product-img")

        const category = document.createElement("td");
        category.textContent = product.category;

        const price = document.createElement("td");
        price.textContent = `$${product.price}`;

        const stock = document.createElement("td");
        stock.textContent = product.stock;

        const status = document.createElement("td");
        status.textContent = product.status;

       
        ProductNameAndImage.append(productImg,productName)
        tr.append(ProductNameAndImage,category,price,stock,status)
        recentProductTable.append(tr)

    })
}

renderProducts(products);