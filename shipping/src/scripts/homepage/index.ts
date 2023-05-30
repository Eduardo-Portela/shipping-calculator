import { createModal } from "../global/modal"
import {  IcreateUserResponse, deleteUserRequest, getUserRequest, shippingCalculatorRequest } from "../global/requests"

const getUserByUserName = async () => {
    const renderUserDiv: HTMLElement | null = document.querySelector(".render-user")
    const form: HTMLFormElement | null = document.querySelector(".form-search")

    form!.addEventListener("submit", async (e)=> {
        renderUserDiv?.classList.add("card")
        renderUserDiv!.innerHTML = ""
        e.preventDefault()
        const inputUser: HTMLInputElement = document.querySelector(".inputSearch")!
        await getUserRequest(inputUser.value)
        renderUser(inputUser.value, renderUserDiv!)
    })
}

getUserByUserName()

const deleteUser = async () => {
    const form: HTMLFormElement | null = document.querySelector(".form-delete")

    form!.addEventListener("submit", async (e)=> {
        e.preventDefault()
        const inputUser: HTMLInputElement = document.querySelector(".input-delete")!
        await deleteUserRequest(inputUser.value)
    })
}

deleteUser()

const renderUser = async (inputUser: string, renderUserDiv: HTMLElement) => {
    const userInfos: IcreateUserResponse| undefined = await getUserRequest(inputUser)

    const notFound = document.createElement("h4")
    notFound.classList.add("mt-3", "text-center") 
    notFound.innerText = "Usuário não encontrado! Verifique se o username está escrito corretamente."
    if(!userInfos){
        renderUserDiv.classList.remove("card")
        return createModal("Usuário não encontrado! Verifique se o username está escrito corretamente.")
    }

    const id = document.createElement("h5")
    id.innerText = `Id => ${userInfos!.id}`
    const userName = document.createElement("h5")
    userName.innerText = `Username => ${userInfos!.username}`
    const firstName = document.createElement("h5")
    firstName.innerText = `First name => ${userInfos!.firstName}`
    const lastName = document.createElement("h5")
    lastName.innerText = `Last name => ${userInfos!.lastName}`
    const email = document.createElement("h5")
    email.innerText = `Email => ${userInfos!.email}`
    const phone = document.createElement("h5")
    phone.innerText = `Telefone => ${userInfos!.phone}`
    const userStatus = document.createElement("h5")
    userStatus.innerText = `User status => ${userInfos!.userStatus}`



    renderUserDiv?.append(id, userName, firstName, lastName, email, phone, userStatus)
}

const renderShippings = async () => {
    const form: HTMLFormElement | null = document.querySelector(".form-shipping")
    const elements: any = [...form!.elements]
    console.log(elements)

    const body: any = {}
    const dimensions: any = {}

    form!.addEventListener("submit", async(e)=> {
        e.preventDefault()

        elements.forEach((element: HTMLInputElement) => {
            if(element.tagName == "INPUT" && element.name){
                if(element.name === "width" || element.name === "heigth" || element.name === "length"){
                    dimensions[element.name] = element.value
                }else{
                    body[element.name] = element.value
                }
            }
        })
        const newBody = {
            ...body,
            dimension: dimensions
        }
        console.log(newBody)
        await shippingCalculatorRequest(newBody)
    })
}

renderShippings()