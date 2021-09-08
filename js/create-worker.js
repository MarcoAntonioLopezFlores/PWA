let trabajadores = localStorage.getItem("trabajadores") !== null ? JSON.parse(localStorage.getItem("trabajadores")) : new Array()
    renderizeWorkers = () => {

        let mainContainer = document.getElementById("registros")
        mainContainer.replaceChildren()
        trabajadores.map((element, index) => {
            let myDiv = document.createElement("div");
            myDiv.setAttribute("class", "card col-sm-4 col-md-4 mb-4 me-2")
            myDiv.setAttribute("style", "width: 22rem;")
            let cardElement =
                `                    
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text" style="font-size: 18px;">${element.job}</p>
                        <p class="card-text" style="font-size: 14px;">última mod. ${element.createdAt !== null && element.createdAt !== undefined ? element.createdAt: element.updatedAt}</p>
                        <button type="button" onclick="getDetailsWorker(${index}, ${element.id})" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalActualizacion">
                            <i class="bi bi-pencil-fill"></i>
                        </button>                        
                        <button type="button" onclick="deleteWorker(${index}, ${element.id})" class="btn btn-danger btn-sm">
                            <i class="bi bi-trash-fill"></i>
                        </button>                        
                    </div>
                    `;
            myDiv.innerHTML = cardElement
            mainContainer.appendChild(myDiv)
        })
    }

    renderizeWorkers()

    createWorker = () => {

        const nombre = document.getElementById("nombre").value
        const trabajo = document.getElementById("trabajo").value

        const data = {
            name: nombre,
            job: trabajo
        }

        fetch('https://reqres.in/api/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .catch(error => {
                let container = document.getElementById("container-alert")
                const alertDiv = document.createElement("div")
                alertDiv.setAttribute("class", "alert alert-error alert-dismissible fade show")
                alertDiv.setAttribute("role", "alert")

                alertDiv.innerHTML = '<strong>Ocurrió un error al registrar el último trabajador!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                container.replaceChildren(alertDiv)
            })
            .then((json) => {

                let container = document.getElementById("container-alert")
                const alertDiv = document.createElement("div")
                alertDiv.setAttribute("class", "alert alert-success alert-dismissible fade show")
                alertDiv.setAttribute("role", "alert")

                alertDiv.innerHTML = '<strong>El último trabajador fue registrado exitosamente!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                container.replaceChildren(alertDiv)
                trabajadores.push(json)
                document.getElementById("nombre").value = ""
                document.getElementById("trabajo").value = ""

                renderizeWorkers()

                localStorage.setItem("trabajadores", JSON.stringify(trabajadores))

            });

    }


    getDetailsWorker = (ind, id) => {        
        document.getElementById("nombreActualizacion").value = trabajadores[ind].name
        document.getElementById("trabajoActualizacion").value = trabajadores[ind].job

        document.getElementById("idActualizacion").value = id
        document.getElementById("indActualizacion").value = ind
    }

    updateWorker = ()=>{
        const nombre = document.getElementById("nombreActualizacion").value
        const trabajo = document.getElementById("trabajoActualizacion").value

        const data = {
            name: nombre,
            job: trabajo
        }

        fetch(`https://reqres.in/api/users/${document.getElementById("idActualizacion").value}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .catch(error => {
                let container = document.getElementById("container-alert")
                const alertDiv = document.createElement("div")
                alertDiv.setAttribute("class", "alert alert-error alert-dismissible fade show")
                alertDiv.setAttribute("role", "alert")

                alertDiv.innerHTML = '<strong>Ocurrió un error al actualizar el trabajador!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                container.replaceChildren(alertDiv)
            })
            .then((json) => {
                console.log(json)
                let container = document.getElementById("container-alert")
                const alertDiv = document.createElement("div")
                alertDiv.setAttribute("class", "alert alert-success alert-dismissible fade show")
                alertDiv.setAttribute("role", "alert")

                alertDiv.innerHTML = '<strong>El trabajador seleccionado fue actualizado exitosamente!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                container.replaceChildren(alertDiv)
                trabajadores[document.getElementById("indActualizacion").value] = json
                

                localStorage.setItem("trabajadores", JSON.stringify(trabajadores))
                renderizeWorkers()

            });
   
    }

    deleteWorker = (ind, id) => {      
        fetch(`https://reqres.in/api/users/${id}`, {
            method: 'DELETE',            
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {console.log(data);data.json()})
            .catch(error => {
                let container = document.getElementById("container-alert")
                const alertDiv = document.createElement("div")
                alertDiv.setAttribute("class", "alert alert-error alert-dismissible fade show")
                alertDiv.setAttribute("role", "alert")

                alertDiv.innerHTML = '<strong>Ocurrió un error al eliminar el trabajador!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                container.replaceChildren(alertDiv)
            })
            .then((json) => {                
                let container = document.getElementById("container-alert")
                const alertDiv = document.createElement("div")
                alertDiv.setAttribute("class", "alert alert-success alert-dismissible fade show")
                alertDiv.setAttribute("role", "alert")

                alertDiv.innerHTML = '<strong>El trabajador seleccionado fue eliminado exitosamente!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                container.replaceChildren(alertDiv)
                trabajadores.splice(ind, 1)

                localStorage.setItem("trabajadores", JSON.stringify(trabajadores))
                renderizeWorkers()

            });
    }