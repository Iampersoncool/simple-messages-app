import { appClient } from './app'

const messagesDiv = document.getElementById('messages') as HTMLDivElement

const response = await appClient.messages.$get()
const { messages } = await response.json()

//@ts-ignore
messages.forEach(message => {
  messagesDiv.innerHTML += `
    <div style="background-color: ${message.color}" class="message">
      <p style="color: white">${message.content}</p>
    </div>
  `
})
