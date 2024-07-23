import { appClient } from './app'

const resultsDiv = document.getElementById('results') as HTMLDivElement

const messagesForm = document.getElementById('messagesForm') as HTMLFormElement

messagesForm.onsubmit = async e => {
  e.preventDefault()

  const target = e.target as HTMLFormElement | null
  if (!target) return

  const colorInput = document.getElementById('color') as HTMLInputElement
  const contentInput = document.getElementById('content') as HTMLInputElement

  const response = await appClient.messages.$post({
    form: {
      color: colorInput.value,
      content: contentInput.value,
    },
  })

  const json = await response.json()
  resultsDiv.innerHTML += `
    <p>${json.message}</p>
  `

  location.reload()
}
