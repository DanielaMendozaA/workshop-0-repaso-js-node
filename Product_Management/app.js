class Utilities {
    static async renderPage(responseApi) {
            console.log(responseApi);
            // const data = await responseApi;
            const $container = document.getElementById('container');
            $container.innerHTML = `
                <table id="table-products">
                    <tr>
                        <td>Product Name</td>
                        <td id="description-td">Description</td>
                        <td>Price</td>
                        <td>Image</td>
                    </tr>
                </table>             
            `;
            // const $containerImage = document.getElementById('container-image')
            const $tableProducts = document.getElementById('table-products');
            responseApi.slice(1,10).forEach(product => {
                $tableProducts.innerHTML += /*html*/`
                 <tr>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td><img style="width:50px" src="${product.image}" alt="product"></td>
                 </tr>
                `;
            });

            // console.log("datos" + responseApi);
    }
} // Utilities

const fetchApi = async function (url) {
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('API not found: ' + response.status);
        }
        const resJson = await response.json();
        return resJson;
    }catch(error){
        console.error('Error fetching data:', error);
    }
};

const executeApi = async () => {
    const respApi = await fetchApi('https://fakestoreapi.com/products');
    console.log(respApi);
    Utilities.renderPage(respApi);
};

executeApi();


