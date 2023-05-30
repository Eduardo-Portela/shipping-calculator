import { createModal } from "../global/modal"
import {  IcreateUserResponse, deleteUserRequest, getUserRequest, shippingCalculatorRequest } from "../global/requests"

export interface IShippingRequest  {
        zipCodeSource: string,
        zipCodeDestination: string,
        weight: number,
        dimension: {
          width: number,
          heigth: number,
          length: number
      }
}
export interface IShippingResponse {
        sessionId: string,
        quotations: [
          {
            shippingServiceCode: string,
            shippingServiceName: string,
            platformShippingPrice: number,
            deliveryTime: number,
            carrier: string,
            carrierCode: string,
            shippingPrice: number,
            shippingCompetitorPrice: number,
            services: {
              declaredValue: boolean,
              receiptNotification: boolean,
              ownHand: boolean
            },
            error: boolean,
            msg: string
          }
        ]
      }

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

    const notFound: HTMLElement = document.createElement("h4")
    notFound.classList.add("mt-3", "text-center") 
    notFound.innerText = "Usuário não encontrado! Verifique se o username está escrito corretamente."
    if(!userInfos){
        renderUserDiv.classList.remove("card")
        return createModal("Usuário não encontrado! Verifique se o username está escrito corretamente.")
    }

    const id: HTMLElement = document.createElement("h5")
    id.innerText = `Id => ${userInfos!.id}`
    const userName: HTMLElement = document.createElement("h5")
    userName.innerText = `Username => ${userInfos!.username}`
    const firstName: HTMLElement = document.createElement("h5")
    firstName.innerText = `First name => ${userInfos!.firstName}`
    const lastName: HTMLElement = document.createElement("h5")
    lastName.innerText = `Last name => ${userInfos!.lastName}`
    const email: HTMLElement = document.createElement("h5")
    email.innerText = `Email => ${userInfos!.email}`
    const phone: HTMLElement = document.createElement("h5")
    phone.innerText = `Telefone => ${userInfos!.phone}`
    const userStatus: HTMLElement = document.createElement("h5")
    userStatus.innerText = `User status => ${userInfos!.userStatus}`



    renderUserDiv?.append(id, userName, firstName, lastName, email, phone, userStatus)
}

const getShippings = async () => {
    const form: HTMLFormElement | null = document.querySelector(".form-shipping")
    const elements: any = [...form!.elements]

    const body: any = {}
    const dimensions: any = {}

    form!.addEventListener("submit", async(e)=> {
        e.preventDefault()

        elements.forEach((element:HTMLInputElement) => {
            if(element.tagName == "INPUT" && element.name){
                if(element.name === "width" || element.name === "heigth" || element.name === "length"){
                    dimensions[element.name] = element.value
                }else{
                    body[element.name] = element.value
                }
            }
        })
        const newBody: any = {
            ...body,
            dimension: dimensions
        }
        const response: IShippingResponse | undefined = await shippingCalculatorRequest(newBody)
        renderShippings(response!.quotations)
    })
}

getShippings()

const renderShippings = async (quotations: any) => {
    const renderShippingDiv: HTMLElement | null = document.querySelector(".render-shippings")

    quotations.sort(function(a:any,b:any) {
        if(a.platformShippingPrice < b.platformShippingPrice){
            return -1
        }else{
            return true
        }
    })

    quotations.forEach((ele: any)=> {
        const divShippingsInfos: HTMLElement = document.createElement("div")
        divShippingsInfos.classList.add("card", "card-ship")
        const carrier: HTMLElement = document.createElement("h5")
        carrier.innerText = `${ele!.carrier}`
        const deliveryTime: HTMLElement = document.createElement("h5")
        deliveryTime.innerText = `Prazo => ${ele!.deliveryTime} dias`
        const platShipPrice: HTMLElement = document.createElement("h5")
        platShipPrice.innerText = `Preço => R$ ${ele!.platformShippingPrice}`

        divShippingsInfos.append(carrier,deliveryTime, platShipPrice)
        renderShippingDiv?.appendChild(divShippingsInfos)
    })
}