getMoreUsers = (page) => {
    fetch("https://reqres.in/api/users?page=" + page)
        .then(data => data.json())
        .then((json) => {
            let container = document.getElementById("registros")
            let pagination = document.getElementById("pagination")
            json.data.map(element => {
                let myDiv = document.createElement("div");
                myDiv.setAttribute("class", "card col-sm-6 col-md-4 mb-4")
                myDiv.setAttribute("style", "width: 22rem;")
                let cardElement =
                    `
                <img src=${element.avatar} class="card-img-top" alt=${element.name}>
                <div class="card-body">
                    <h5 class="card-title">${element.first_name + ' ' + element.last_name}</h5>
                    <p class="card-text" style="font-size: 14px;">${element.email}</p>
                    <button type="button" onclick="getDetailsUser(${element.id})" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Detalles
                    </button>
                    
                </div>
                `;
                myDiv.innerHTML = cardElement
                container.append(myDiv)
            });
            if (page == 2) {
                let liElement = `<li class="page-item"><a class="btn btn-primary btn-sm"
                        onclick="getLessUsers()">Volver</a></li>`
                pagination.innerHTML = liElement
            }

        });

}

getMoreUsers(1)

getDetailsUser = (id) => {
    let container = document.getElementById("modal-body")
            let myDiv = document.createElement("div");
            myDiv.setAttribute("class", "card col-sm-12 col-md-12 mb-4")
            myDiv.innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status">
                                 <span class="visually-hidden">Cargando...</span>
                            </div></div>`
            container.replaceChildren(myDiv)

    fetch("https://reqres.in/api/users/"+id)
        .then(data => data.json())
        .then((json) => {              
            let cardElement =
                    `
                <img src=${json.data.avatar} class="card-img-top" alt=${json.data.name}>
                <div class="card-body">
                    <h5 class="card-title">${json.data.first_name + ' ' + json.data.last_name}</h5>
                    <p class="card-text" style="font-size: 14px;">${json.data.email}</p>                        
                </div>
                `;
            myDiv.innerHTML = cardElement
            container.replaceChildren(myDiv)
        });

}

getLessUsers = () => {
    window.location.reload()
}
