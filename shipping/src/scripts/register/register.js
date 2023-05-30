import { createUserRequest } from "../global/requests.js"

const createUser = () => {
    const form = document.querySelector(".form-register")
    const elements = [...form.elements]

    const body = {}

    form.addEventListener("submit", async(e)=> {
        e.preventDefault()

        elements.forEach((element) => {
            if(element.tagName == "INPUT"){
                body[element.name] = element.value
            }
        })
        await createUserRequest(body)
    })
} 

createUser()