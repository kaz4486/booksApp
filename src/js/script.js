const templatesBooks = Handlebars.compile(
  document.querySelector('#template-book').innerHTML
);
console.log(templatesBooks);

/* find books list container */

const booksListContainer = document.querySelector('.books-list');
console.log(booksListContainer);

function render() {
  for (const book in dataSource.books) {
    //generated HTML based on template

    const generatedHTML = templatesBooks(dataSource.books[book]);
    console.log(generatedHTML);
    /* create element DOM using utils.createElementFromHTML*/

    const bookElement = utils.createDOMFromHTML(generatedHTML);
    console.log(bookElement);

    /* add created element to booksList*/

    booksListContainer.appendChild(bookElement);
  }
}

//const bookList = document.querySelector('.book');

function initActions() {
  /*const imageElements = document.querySelectorAll('.book__image');
  console.log(imageElements);*/
  const favoriteBooks = [];
  //for (let elem of imageElements) {
  //const elemId = imageElements[data - id];
  //console.log(elemId);
  //console.log(imageElements);
  booksListContainer.addEventListener('click', function (event) {
    event.preventDefault();
    let elemId = event.target.offsetParent.getAttribute('data-id');

    if (
      !favoriteBooks.includes(elemId) &&
      event.target.offsetParent.classList.contains('book__image')
    ) {
      console.log(favoriteBooks[elemId]);
      console.log(event);
      event.target.offsetParent.classList.add('favorite');

      favoriteBooks.push(elemId);
      console.log(favoriteBooks);
    } else if (
      favoriteBooks.includes(elemId) &&
      event.target.offsetParent.classList.contains('book__image')
    ) {
      event.target.offsetParent.classList.remove('favorite');
      const indexOf = favoriteBooks.indexOf(event.target.offsetParent);
      favoriteBooks.splice(indexOf, 1);
    }
  });
}

render();
initActions();
