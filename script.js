let myLibrary = []

const container = document.getElementById("card-container")

var modal = document.getElementById("modal")
var addbook = document.getElementById("btn")
var span = document.getElementsByClassName("close")[0]
var submit = document.getElementById("submit")

var title = document.getElementById("title")
var author = document.getElementById("author")
var pages = document.getElementById("pages")
var yes = document.getElementById("yes")
var no = document.getElementById("no")
var readstatus = ""

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

function addBookToLibrary(Book) {
    myLibrary.push(Book)
}

function displayLibrary() {
    container.replaceChildren()
    for (let i=0; i<myLibrary.length; i++) {
        displayBook(myLibrary[i])
    }
}

function displayBook(Book) {
    const card = document.createElement("div")
    card.className = "card"
    card.setAttribute("index", myLibrary.indexOf(Book))

    const remove = document.createElement("span")
    remove.innerHTML = "&times"
    remove.className = "remove"
    remove.setAttribute("index", remove)
    card.appendChild(remove)

    const title = document.createElement("p")
    title.innerHTML = "<b>Title: </b>"
    card.appendChild(title)

    const booktitle = document.createElement("p")
    booktitle.innerHTML = Book.title
    card.appendChild(booktitle)

    const author = document.createElement("p")
    author.innerHTML = "<b>Author: </b>"
    card.appendChild(author)

    const bookauthor = document.createElement("p")
    bookauthor.innerHTML = Book.author
    card.appendChild(bookauthor)

    const pages = document.createElement("p")
    pages.innerHTML = "<b>Pages: </b>"
    card.appendChild(pages)

    const bookpages = document.createElement("p")
    bookpages.innerHTML = Book.pages
    card.appendChild(bookpages)

    const read = document.createElement("p")
    read.innerHTML = "<b>Status: </b>"
    card.appendChild(read)

    const bookread = document.createElement("button")
    bookread.innerHTML = Book.read
    bookread.className = "read"
    if (Book.read == "Not Read") {
        bookread.style.color = "red"
    }
    card.appendChild(bookread)

    container.appendChild(card)
        
    remove.addEventListener("click", () => {
        myLibrary.splice(myLibrary.indexOf(Book), 1)
        displayLibrary()
    })

    bookread.addEventListener("click", () => {
        if (bookread.innerHTML === "Not Read") {
            bookread.innerHTML = "Read"
            bookread.style.color = "green"
        }
        else {
            bookread.innerHTML = "Not Read"
            bookread.style.color = "red"
        }
    })
}

addbook.addEventListener("click", () => {
    modal.style.display = "block"
})

span.addEventListener("click", () => {
    modal.style.display = "none"
})

window.addEventListener("click", () => {
    if (event.target == modal) {
        modal.style.display = "none"
    }
})

function readStatus() {
    if (yes.checked === true) {
        readstatus = yes.value
    }
    else if (no.checked === true) {
        readstatus = no.value
    }
}

function formReset() {
    title.value = ""
    author.value = ""
    pages.value = ""
    yes.checked = false
    no.checked = false
}

submit.addEventListener("click", (e) => {
    e.preventDefault()
    modal.style.display = "none"
    readStatus()
    const newbook = new Book(title.value, author.value, pages.value, readstatus)
    addBookToLibrary(newbook)
    displayLibrary()
    formReset()
})

const prideAndPrejudice = new Book("Pride and Prejudice", "Jane Austen", 432, "Read")
const janeEyre = new Book("Jane Eyre", "Charlotte Bronte", 536, "Not Read")

addBookToLibrary(prideAndPrejudice)
addBookToLibrary(janeEyre)
displayLibrary()
