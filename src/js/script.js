const select = {
  templateOf: {
    book: '#template-book',
  },
  dom: {
    image: 'book__image',
    list: '.books-list',
  },
};

class BookList {
  constructor() {
    const thisBookList = this;
    thisBookList.initData();
    thisBookList.getElements();
    thisBookList.render();

    thisBookList.initActions();
  }
  initData() {
    const thisBookList = this;
    this.data = dataSource.books;
    console.log(thisBookList);
  }
  render() {
    const thisBookList = this;

    for (const book in this.data) {
      const rating = this.data[book].rating;
      console.log(rating);
      const ratingBgc = thisBookList.determineRatingBgc(rating);
      console.log(ratingBgc);
      const ratingWidth = rating * 10;
      console.log(ratingWidth);

      const bookData = {
        /*name: this.data[book].name,
        price: this.data[book].price,
        rating: this.data[book].rating,
        image: this.data[book].image,
        id: this.data[book].id,*/
        ...this.data[book], //operator destrukturyzacji
        ratingWidth, //obiekt short hand notation
        ratingBgc,
      };

      //generated HTML based on template
      thisBookList.templates = Handlebars.compile(
        document.querySelector(select.templateOf.book).innerHTML
      );

      const generatedHTML = thisBookList.templates(bookData);
      console.log(generatedHTML);
      /* create element DOM using utils.createElementFromHTML*/

      thisBookList.element = utils.createDOMFromHTML(generatedHTML);
      console.log(thisBookList.element);

      /* add created element to booksList container*/
      /*const booksListContainer = document.querySelector('.books-list');
      console.log(booksListContainer);*/

      thisBookList.booksListContainer.appendChild(thisBookList.element);
    }
  }
  getElements() {
    const thisBookList = this;

    thisBookList.filtersContainer = document.querySelector('.filters');

    thisBookList.booksListContainer = document.querySelector(select.dom.list);
  }

  initActions() {
    const thisBookList = this;
    /*const imageElements = thisBookList.imageElement;
    console.log(imageElements);*/
    const favoriteBooks = [];
    //for (let elem of imageElements) {
    //const elemId = imageElements[data - id];
    //console.log(elemId);
    //console.log(imageElements);
    thisBookList.booksListContainer.addEventListener('click', function (event) {
      event.preventDefault();
      let elemId = event.target.offsetParent.getAttribute('data-id');

      if (
        !favoriteBooks.includes(elemId) &&
        event.target.offsetParent.classList.contains(select.dom.image)
      ) {
        console.log(favoriteBooks[elemId]);
        console.log(event);
        event.target.offsetParent.classList.add('favorite');

        favoriteBooks.push(elemId);
        console.log(favoriteBooks);
      } else if (
        favoriteBooks.includes(elemId) &&
        event.target.offsetParent.classList.contains(select.dom.image)
      ) {
        event.target.offsetParent.classList.remove('favorite');
        const indexOf = favoriteBooks.indexOf(event.target.offsetParent);
        favoriteBooks.splice(indexOf, 1);
      }
    });

    const filters = [];
    /*const filtersContainer = document.querySelector('.filters');
    console.log(filters);
    console.log(filtersContainer);*/

    thisBookList.filtersContainer.addEventListener('click', function (event) {
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
      thisBookList.filterBooks(filters);
    });
  }

  filterBooks(filters) {
    for (let book in this.data) {
      let shouldBeHidden = false;
      const bookId = this.data[book].id;
      console.log(bookId);
      for (const filter of filters) {
        console.log(filter);
        if (!this.data[book].details[filter]) {
          console.log(this.data[book].details[filter]);
          shouldBeHidden = true;
          break;
        }
      }

      const imageElement = document.querySelector(`[data-id="${bookId}"]`);

      if (shouldBeHidden == true) {
        imageElement.classList.add('hidden');
      } else {
        imageElement.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    const thisBookList = this;
    console.log(thisBookList);
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
}

const app = new BookList();
