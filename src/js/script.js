const templatesBooks = Handlebars.compile(
  document.querySelector('#template-book').innerHTML
);
console.log(templatesBooks);

/* find books list container */

const booksListContainer = document.querySelector('.books-list');
console.log(booksListContainer);

function render() {
  for (const book in dataSource.books) {
    /*const bookRatingFil = bookElement.querySelector('.book__rating__fill');
    console.log(bookRatingFil);*/

    const rating = dataSource.books[book].rating;
    console.log(rating);
    const ratingBgc = determineRatingBgc(rating);
    console.log(ratingBgc);
    const ratingWidth = rating * 10;
    console.log(ratingWidth);
    /*const bookRatingPercent = bookRating * 10;
    console.log(bookRatingPercent);
    const bookRatingPercentBla = bookRatingPercent + '%';
    console.log(bookRatingPercentBla);
    bookRatingFil.setAttribute(
      'style',
      `background: linear-gradient(to right, green , white , ${bookRatingPercentBla});`
    );*/

    const bookData = {
      name: dataSource.books[book].name,
      price: dataSource.books[book].price,
      rating: dataSource.books[book].rating,
      image: dataSource.books[book].image,
      id: dataSource.books[book].id,
      ratingWidth: ratingWidth,
      ratingBgc: ratingBgc,
    };

    //generated HTML based on template
    const generatedHTML = templatesBooks(bookData);
    console.log(generatedHTML);
    /* create element DOM using utils.createElementFromHTML*/

    const bookElement = utils.createDOMFromHTML(generatedHTML);
    console.log(bookElement);

    /* add created element to booksList*/

    booksListContainer.appendChild(bookElement);

    // const dom for adding style
  }
}

function determineRatingBgc(rating) {
  if (rating < 6) {
    const bgc =
      'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    return bgc;
  }
  if (rating > 6 && rating <= 8) {
    const bgc =
      'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    return bgc;
  }
  if (rating > 8 && rating <= 9) {
    const bgc =
      'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    return bgc;
  }
  if (rating > 9) {
    const bgc =
      'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    return bgc;
  }
}

//const bookList = document.querySelector('.book');

function initActions() {
  const imageElements = document.querySelectorAll('.book__image');
  console.log(imageElements);
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

  const filters = [];
  const filtersContainer = document.querySelector('.filters');
  console.log(filters);
  console.log(filtersContainer);

  filtersContainer.addEventListener('click', function (event) {
    console.log(event);
    if (
      event.target.tagName == 'INPUT' &&
      event.target.type == 'checkbox' &&
      event.target.name == 'filter'
    ) {
      console.log(event.target.value);

      if (event.target.checked == true) {
        filters.push(event.target.value);
      } else if (event.target.checked == false) {
        const indexOf = filters.indexOf(event.target.value);
        filters.splice(indexOf, 1);
      }
    }
    console.log(filters);
    filterBooks();
  });

  function filterBooks() {
    for (let book in dataSource.books) {
      let shouldBeHidden = false;
      const bookId = dataSource.books[book].id;
      console.log(bookId);
      for (const filter of filters) {
        console.log(filter);
        if (!dataSource.books[book].details[filter]) {
          console.log(dataSource.books[book].details[filter]);
          shouldBeHidden = true;
          break;
        }
      }

      const imageElement = document.querySelector(`[data-id="${bookId}"]`);
      /*const imageElementId = imageElement.getAttribute('data-id');
      console.log(imageElementId);*/

      //generateTitleLinks('[data-tags~="' + tag + '"]');

      if (shouldBeHidden == true) {
        imageElement.classList.add('hidden');
      } else {
        imageElement.classList.remove('hidden');
      }
      /*const imageElementId = document.querySelector(
        '.book__image [data-id=${book.id}]'
      );*/

      //if (filters.includes(dataSource.books.details)
    }
  }
}

render();
initActions();
