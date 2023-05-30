export const createModal = (message: string) => {
    const body = document.querySelector("body")
    const modal = document.createElement("dialog")
    const buttonClose = document.createElement("button")
    buttonClose.innerText = ("X")
    buttonClose.onclick = function() {
        modal.close()
        modal.remove()
    }
    const modalMessage = document.createElement("p")
    modalMessage.innerText = message

    modal.append(modalMessage, buttonClose)
    body?.appendChild(modal)

    modal.showModal()
}