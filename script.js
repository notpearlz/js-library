const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.color = getRandomColor();
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
    console.log("added once");
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

}

function removeBookFromLibrary(bookIndex){
    myLibrary.splice(bookIndex, 1);
}


function clearBooks(){
    const books = document.querySelectorAll(".book-space");

    books.forEach((book) => {
        book.remove();
    });

}

function loadLibrary() {
    clearBooks();

    const library = document.querySelector("#library");


    //create book space
    for(bookIndex in myLibrary){
        const bookSpace = document.createElement("div");
        bookSpace.classList.add("book-space");

        // delete book button
        const deleteBookBtn = document.createElement("button");
        deleteBookBtn.classList.add("delete-book-btn");
        deleteBookBtn.textContent = "X";

        deleteBookBtn.addEventListener("click", (event) => {
            const book = event.target.parentElement

            removeBookFromLibrary(book.getAttribute("data-index"));


            loadLibrary();
        });


        // create book
        const book = document.createElement("ul");
        book.classList.add("book");
        book.setAttribute("data-index", bookIndex)

        for(detail in myLibrary[bookIndex]){
            const li = document.createElement("li");



            if(detail == "read") {
                const changeReadBtn = document.createElement("button");
                changeReadBtn.textContent = myLibrary[bookIndex][detail]? "Read" : "Not Read Yet";
                changeReadBtn.classList.add("book-" + detail + "-btn");


                
                changeReadBtn.addEventListener("click", (event) => {
                    const readBookIndex = event.target.parentElement.parentElement.getAttribute("data-index");

                    myLibrary[readBookIndex].read = !myLibrary[readBookIndex].read
                    loadLibrary();
                });

                li.append(changeReadBtn);

            } else if(detail == "color"){
                book.style.backgroundColor = myLibrary[bookIndex][detail];
            } else if(detail == "pages"){
                li.textContent = myLibrary[bookIndex][detail] + " pages";
            }
            else {
                li.textContent = myLibrary[bookIndex][detail];

            }
            li.classList.add("book-" + detail);
            book.append(li);
        }

        book.append(deleteBookBtn);
        bookSpace.append(book);
        library.append(bookSpace);
    }

}


function getRandomColor() {
    var letters = '6789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 10)];
    }
    return color;
}


// Open new book form

document.querySelector("#new-book-btn").addEventListener(("click"), (event) => {
    const dialog = document.querySelector("#new-book-dialog")

    // Close new book form
    document.querySelector("#new-book-close-btn").addEventListener(("click"), (event) => {

        dialog.close();
    });

    dialog.showModal();
});



// Submit new book form
document.querySelector("#new-book-form").addEventListener(("submit"), (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const bookTitle = formData.get("title");
    const bookAuthor = formData.get("author");
    const bookPages= formData.get("pages");
    const bookRead = formData.get("read");

    addBookToLibrary(bookTitle,bookAuthor,bookPages,bookRead);
    console.log(myLibrary);

    loadLibrary();
});



const book1 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
const book2 = new Book("1984", "George Orwell", 328, false);
const book3 = new Book("Pride and Prejudice", "Jane Austen", 279, true);
const book4 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
const book5 = new Book("Moby Dick", "Herman Melville", 585, false);
const book6 = new Book("The Catcher in the Rye", "J.D. Salinger", 214, false);
const book7 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
const book8 = new Book("Fahrenheit 451", "Ray Bradbury", 194, false);
const book9 = new Book("Crime and Punishment", "Fyodor Dostoevsky", 671, false);
const book10 = new Book("The Alchemist", "Paulo Coelho", 208, true);
myLibrary.push(book1, book2, book3, book4, book5, book6, book7, book8, book9, book10);

loadLibrary();