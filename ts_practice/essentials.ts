let title = document.querySelector('#title')
/** Narrowing */
if (title != null) {
  title.innerHTML = 'HELLO'
}

/** instanceof */
if (title instanceof Element) {
  title.innerHTML = 'HELLO'
}

/** fake narrowing with as....  */
let btn = document.querySelector('button') as Element
btn.innerHTML = 'Button'

let link = document.querySelector('.link')
if (link instanceof HTMLAnchorElement) {
  link.href = 'https://github.com'
}

/**
 * HTMLAnchorElement
 * HTMLButtonElement
 * HTMLHeaderElement
 * ....
 */

/** Add event listener */
let newBtn = document.querySelector('#button')
newBtn?.addEventListener("click", () => {
  console.log("Button clicked")
})