import { updateUserRequest } from "../global/requests.js"

const updateUser = () => {
    const form = document.querySelector(".form-update")
    const userNameRequest = document.querySelector("#userNameRequestInput")
    const elements = [...form.elements]
    
    const body = {}
    
    form.addEventListener("submit", async (e)=> {
        e.preventDefault()
        const userName = userNameRequest.value

        elements.forEach((element) => {
            if(element.tagName == "INPUT" && element.id != "userNameRequestInput"){
                body[element.name] = element.value
            }
        })
        await updateUserRequest(body, userName)
    })
} 

updateUser()

