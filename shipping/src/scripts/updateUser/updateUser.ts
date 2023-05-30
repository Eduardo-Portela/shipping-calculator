import { createModal } from "../global/modal"
import { updateUserRequest } from "../global/requests"

const updateUser = () => {
    const form: HTMLFormElement | null = document.querySelector(".form-update")
    const userNameRequest: HTMLInputElement | null = document.querySelector("#userNameRequestInput")
    const elements: any = [...form!.elements]
    
    const body: any = {}
    
    form!.addEventListener("submit", async (e)=> {
        e.preventDefault()
        const userName: string | undefined = userNameRequest!.value

        elements.forEach((element: HTMLInputElement) => {
            if(element.tagName == "INPUT" && element.id != "userNameRequestInput"){
                body[element.name] = element.value
            }
        })
        await updateUserRequest(body, userName!)
    })
} 

updateUser()

