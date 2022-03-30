function toast(message) {
  const elem = document.createElement('div')
  elem.className = 'toast'
  elem.innerText = message
  document.body.appendChild(elem)

  setTimeout(function () {
    elem.remove()
  }, 3000)
}