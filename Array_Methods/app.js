
//Objects Array
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 0 }
];

const renderProducts = function (array) {
        const $tableProducts = document.getElementById('table-products');
        $tableProducts.innerHTML = "";
        const totalPrice = array.reduce((acum, product) => acum + product.price, 0)    
        array.forEach(product => {
            $tableProducts.innerHTML += ` 
                <tr>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.price}</td>
                    <td>${product.stock}</td>
                </tr>
            `;
        });
        // Agregar la fila del precio total
        $tableProducts.innerHTML += ` 
            <tr>
                <td>Total Price</td>
                <td></td>
                <td>${totalPrice}</td>
                <td></td>
            </tr>
        `;
}

//Category filter
const uniqueCategory = [... new Set(products.map(product => product.category))];
console.log(uniqueCategory);

document.addEventListener('DOMContentLoaded', () => {
    const $categoryTh = document.getElementById('category-th');
    $categoryTh.innerHTML = `
        <select id="category-select">
            <option value="categories" selected>All Categories</option>
            ${uniqueCategory.map(category => `<option value="${category}">${category}</option>`).join('')}
        </select>
    `;

    const $categorySelect = document.getElementById('category-select');
    let filteredProducts;
    
    function updateTable(selectedCategory) {
        if(selectedCategory === 'categories'){
            filteredProducts = products  
        }else{
            filteredProducts = products.filter(product => product.category === selectedCategory);
        }
        
        renderProducts(filteredProducts);

    }


    updateTable("categories");

    // Agregar el evento change para actualizar la tabla automáticamente
    $categorySelect.addEventListener('change', () => {
        const selectedCategory = $categorySelect.value;
        console.log("hola hola " + selectedCategory);
        updateTable(selectedCategory);
    });

    const filterByName = (name) => {
        name = name.toLowerCase();
        return filteredProducts = products.filter((product) => product.name.toLowerCase().includes(name))
    };

    const $buttonSearch = document.getElementById('button-search-name');
    $buttonSearch.addEventListener('click', () => {
        const $inputSearch = document.getElementById('input-search');
        renderProducts(filterByName($inputSearch.value));
    });

    const $buttonAviability = document.getElementById('button-availability');
    $buttonAviability.addEventListener('click', () => {
        const isAllProdAvailable = products.every(product => product.stock > 0);
        if(isAllProdAvailable){
            alert("All products available")
        }else{
            alert("Not all products are available")
        }

    });

    const productNamesArray = products.map(product => product.name)
    const $containerDiv = document.getElementById('container');
    const $NamesList = document.createElement('UL')
    productNamesArray.forEach(name => {
        const $nameLi = document.createElement('LI');
        $nameLi.innerHTML = `
            <p>${name}</p>
        
        `;
        $NamesList.append($nameLi)
    });


    $containerDiv.appendChild($NamesList)

});
