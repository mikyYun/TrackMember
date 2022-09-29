var title = document.querySelector('#title');
/** Narrowing */
if (title != null) {
    title.innerHTML = 'HELLO';
}
/** instanceof */
if (title instanceof Element) {
    title.innerHTML = 'HELLO';
}
/** fake narrowing with as....  */
var btn = document.querySelector('button');
btn.innerHTML = 'Button';
var link = document.querySelector('.link');
if (link instanceof HTMLAnchorElement) {
    link.href = 'https://github.com';
}
/**
 * HTMLAnchorElement
 * HTMLButtonElement
 * HTMLHeaderElement
 * ....
 */
/** Add event listener */
var btn = document.querySelector('#button');
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
    console.log("Button clicked");
});
