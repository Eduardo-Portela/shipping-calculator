export const createModal = (message: string) => {
    const body: HTMLElement | null = document.querySelector("body")
    const modal: HTMLDialogElement = document.createElement("dialog")
    const buttonClose: HTMLButtonElement = document.createElement("button")
    buttonClose.innerText = ("X")
    buttonClose.onclick = function() {
        modal.close()
        modal.remove()
    }
    const modalMessage: HTMLElement = document.createElement("p")
    modalMessage.innerText = message

    modal.append(modalMessage, buttonClose)
    body?.appendChild(modal)

    modal.showModal()
}