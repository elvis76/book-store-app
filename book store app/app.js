const bookStore = [
    {
        id: '001',
        title: 'sands of time',
        author: 'Robrert Dillinger',
        noOfPages: 403,
        price: 250,
        isAvailable: true,
        reviews: [],
        genre: 'fiction',
        Image: 'some-img-url'
    },
    {
        id: '002',
        title: 'ocean Eyes ',
        author: 'Billie Ellish',
        noOfPages: 467,
        price: 320,
        isAvailable: true,
        reviews: [],
        genre: 'horror',
        Image: 'some-img-url'
    },
    {
        id: '003',
        title: 'Chronicles of jollof rice',
        author: 'Chux',
        noOfPages: 1467,
        price: 899.9999,
        isAvailable: false,
        reviews: [],
        genre: 'nutrition',
        Image: 'some-img-url'
    },
]

// listing our books
let bookListContainer = document.querySelector('#books');

function showBooks (key,searchMode) {

    let books = [];
    if (key === 'all') {
        books = bookStore
    // } else if (genre) {
    //     books = bookStore.filter(book => book.genre === genre)
    // }
    }else if (key) {
        books = bookStore.filter(book => book.genre === key)
    }

    if (searchMode === true) {
        books = bookStore.filter(book => {
            for (let val in book) {
                if (book[val].toString().toLowerCase().includes(key)) {
                    return true
                }
            }
            return false
        })
    }

let bookList = books.map(book => {
    let color = book.isAvailable ? 'dodgerblue' : 'tomato'
    return (
        `<li class ="book" id="${book.id}">
            <h3>Title: ${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>price: <b>${book.price}</b></P>
            <button class="buy">Buy Now</button>
            <button class="add">Add to wishlists</button>
            <button class="rent" style ="background-color: ${color}">Rent this book!</button>
        </li>`
    )
  })

  if (bookList.length) {
    bookListContainer.innerHTML = bookList.join('')
  }else {
    bookListContainer.innerHTML = `<p>We do not have books in that category</p>`
  }

}

showBooks('all')

let allTabs = document.querySelectorAll('.tab')
allTabs.forEach(tab => {
    tab.onclick = () => {
        allTabs.forEach(tab => tab.classList.remove('active'))
        tab.classList.add('active')
            showBooks(tab.innerHTML.toLowerCase())
        
    }
})

let searchInput = document.querySelector('#search-input');
searchInput.oninput = (evt) => {
    showBooks(evt.target.value, true)
}

// Get all rent buttons
let rentBtns = document.querySelectorAll('.rent')
rentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let bookId = btn.parentElement.id;
        let book = bookStore.find(book => book.id ===bookId)
    let otherBooks = bookStore.filter(book => book.id !== bookId)
        if (book.isAvailable) {
            alert('This book is available. you may borrow the book.')
            book.isAvailable = false
            bookStore.concat(otherBooks, book)
            btn.style.background = 'tomato'
        } else {
            alert('this book is not available at the moment. please check back later')
        }
    })
})

// adding to wishlist
let wishlist = [];
let allAddBtns = document.querySelectorAll('.add');
allAddBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.innerHTML.includes('Add to wishlist')) {
           btn.innerHTML = 'Added to your wishlist'
        } else {
           btn.innerHTML = 'Add to wishlist'
        }
    })
})