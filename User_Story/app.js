//Traemos el boton con id fetch-posts y agregamos un evento click, el cual cuando se dispara ejecuta la funcion fetchPosts(); 
document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});

//Esta es la función fetchPost la cual se encarga de hacer la petición fetch a la url de jsonplaceholder mediante una promesa
const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    //En el primer then de la promesa, obtenemos la respuesta y damos manejo a los posibles errores 
        .then(response => {
            // !response.ok, quiere decir que si la respuesta no fue exitosa arroje un error para que sea mas claro
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            //Se retorna la respuesta recibida formateandola a json para poderla utilizar correctamente
            return response.json();
        }) 
    //En el segundo then, mediante la variable posts recibimos el response.json que retorna el anterior then y se lo pasamos por parametro a la función displayPosts que nos ayudara a pintar el contenido
        .then(posts => {
            displayPosts(posts);
        })
    //En el caso del catch llamamos otra funcion displayError que nos ayuda a mostrar en la pagina el error establecido
        .catch(error => {
            displayError(error);
        });
};

//Funcion que ayuda a pintar el contenido de la respuesta a la API en nuestra pagina web
const displayPosts = (posts) => {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${post.title}`;
        postList.appendChild(listItem);
    });
};

//Funcion que nos ayuda a pintar el error en caso de que la respuesta a la API no sea exitosa.
const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};