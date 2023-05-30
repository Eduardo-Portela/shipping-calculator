import { createModal } from "./modal"

const baseUrl: string = "https://frontend-test.frenet.dev/v1"

export interface IcreateUser {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    userStatus: number
}
export interface IcreateUserResponse extends IcreateUser{
    id: number
}

export interface IShippingRequest {
        zipCodeSource: string,
        zipCodeDestination: string,
        weight: number,
        dimension: {
          width: number,
          heigth: number,
          length: number
        }
}

export const createUserRequest = async(body: IcreateUser)=> {
    try {
        const request = await fetch(`${baseUrl}/user`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            const response: IcreateUserResponse = await request.json()
            createModal("Usuário criado com sucesso!")
            setTimeout(()=> {
                window.location.assign("../../index.html")
            },2000)
            return response
        } else{
            createModal("Ops!!! Algo deu Errado!!")
        }


    } catch(error) {
        console.log(error)
    }
}

export const getUserRequest = async(userName: string)=> {
    try {
        const request = await fetch(`${baseUrl}/user/${userName}`, {})
        if(request.ok){
            const response: IcreateUserResponse = await request.json()
            return response
        }


    } catch(error) {
        console.log(error)
    }
}

export const updateUserRequest = async(body: IcreateUser, userName: string)=> {
    try {
        const request = await fetch(`${baseUrl}/user/${userName}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            const response: IcreateUserResponse = await request.json()
                createModal("Usuario editado com sucesso!")
                return response
            }else{
                createModal("Ops! Algo deu errado!")
            }
    } catch(error) {
        console.log(error)
    }
}

export const deleteUserRequest = async (userName: string) => {
    try {
        const request = await fetch(`${baseUrl}/user/${userName}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if(request.ok){
            createModal("Usuario deletado com sucesso!")
        }else{
                createModal("Opss!!! Algo deu errado!")
            }

    } catch(error) {
        console.log(error)
    }
}

export const shippingCalculatorRequest = async(body: IShippingRequest) => {
    try {
        const request = await fetch(`${baseUrl}/quote`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            const response = await request.json()
            console.log(response)
            return response
        }


    } catch(error) {
        console.log(error)
    }
}