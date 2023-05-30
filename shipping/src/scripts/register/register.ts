import { createUserRequest } from "../global/requests"

const createUser = () => {
    const form: HTMLFormElement | null = document.querySelector(".form-register")
    const elements: any = [...form!.elements]
    console.log(elements)

    const body: any = {}

    form!.addEventListener("submit", async(e)=> {
        e.preventDefault()

        elements.forEach((element: HTMLInputElement) => {
            if(element.tagName == "INPUT"){
                body[element.name] = element.value
            }
        })
        await createUserRequest(body)
    })
} 

createUser()