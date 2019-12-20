// Get nodes for manipulation
const cardCatalogue = document.querySelector(".card-catalogue");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalCheckbox = document.querySelector("#m-checkbox");

// Array containing all the books
let myLibrary = [];
// String for local storage
let myLocalLibrary;

// Handle edit, delete and checkbox click events
const clickEventHandler = (() => {
    // Add event listeners
    window.addEventListener("click", function (e) {
        if (e.target === modal && modal.classList.contains("show-modal")) {
            CloseModal.close();
        }
    });
    window.addEventListener("keydown", function (e) {
        if (modal.classList.contains("show-modal")) {
            switch (e.key) {
                case 'Escape':
                case 'Clear':
                    CloseModal.close();
                    break;
            }
        }
    });
    modalContent.addEventListener('keydown', function (e) {
        SubmitModal.keyDownEventHandler(e);
    });
    document.body.addEventListener("click", (e) => {
        const id = e.target.id;
        if (id === "add-btn") {
            OpenModal.open();
        } else if (id.substring(0, 9) === "edit-btn-") {
            EditBtnHandler.edit(id.substring(9));
        } else if (id.substring(0, 11) === "delete-btn-") {
            DeleteBtnHandler.delete(e.target);
        } else if (id.substring(0, 10) === "check-box-") {
            EditCheckBox.toggle(e.target);
        } else if (id === "m-checkbox") {
            NewCheckBox.toggle(e.target);
        } else if (id === "m-submit") {
            SubmitBook.submit();
        } else if (id === "m-cancel") {
            CloseModal.close();
        } else {
            // console.log("uncaught event with id string: " + id);
        }
    })
})();

// Object constructor and function declarations for book prototype
class Book {
    constructor(title, author, pages, year, read, desc, cover, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.year = year;
        this.read = read; // Bool. Has book been finished
        this.desc = desc;
        this.cover = cover; // URL to cover image
        this.id = id;
    }

    info() {
        return "Book ID " + id + ": " + title + " by " + author + ", " + pages + " pages, year " + year + ", Read?: " + read
            + ", Desc: " + desc;
    }
}

// Add book to library array
class AddBookToLibrary {
    static add(book) {
        myLibrary.push(book);
    }
}

// Sample books to populate the start page
const sampleBooks = (() => {
    const theHungerGames = new Book("The Hunger Games", "Suzanne Collins", 374, 2008, true
        , "Could you survive on your own, in the wild, with everyone out to make sure you don't live to see the morning?"
        , "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1447303603l/2767052.jpg");
    const harryPotter = new Book("Harry Potter and the Order of the Phoenix"
        , "J.K. Rowling", 870, 2004, false
        , "There is a door at the end of a silent corridor. And it’s haunting Harry Potter’s dreams."
        , "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546910265l/2.jpg");
    const toKillAMockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 324, 2006, true
        , "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it."
        , "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg");
    const prideAndPrejudice = new Book("Pride and Prejudice"
        , "Jane Austen", 279, 2000, false
        , "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language."
        , "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885.jpg");
    const twilight = new Book("Twilight", "Stephenie Meyer", 501, 2006, true
        , "Deeply seductive and extraordinarily suspenseful, Twilight is a love story with bite."
        , "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1361039443l/41865.jpg");
    const theBookThief = new Book("The Book Thief", "Markus Zusak", 552, 2006, false
        , "It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will be busier still."
        , "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522157426l/19063._SY475_.jpg");
    const animalFarm = new Book("Animal Farm", "George Orwell", 122, 2003, true
        , "George Orwell's timeless and timely allegorical novel—a scathing satire on a downtrodden society’s blind march towards totalitarianism."
        , "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1424037542l/7613.jpg");
    const theChroniclesOfNarnia = new Book("The Chronicles of Narnia"
        , "C.S. Lewis", 767, 2002, false
        , "Journeys to the end of the world, fantastic creatures, and epic battles between good and evil—what more could any reader ask for in one book?"
        , "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1449868701l/11127._SY475_.jpg");
    const theHobbit = new Book("The Hobbit (Middle-earth Universe)"
        , "J.R.R. Tolkien", 365, 1998, true
        , "In a hole in the ground there lived a hobbit. It was a hobbit-hole, and that means comfort."
        , "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347244628l/838638.jpg");
    const goneWithTheWind = new Book("Gone with the Wind", "Margaret Mitchell", 1037, 1999, false
        , "Margaret Mitchell's monumental epic of the South won a Pulitzer Prize, gave rise to the most popular motion picture of our time."
        , "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1551144577l/18405._SY475_.jpg");

    // Load books from sessionStorage or add sample books to the library
    class LoadSamples {
        static load() {
            const samples = [theHungerGames, harryPotter, toKillAMockingbird, prideAndPrejudice, twilight, theBookThief, animalFarm
                , theChroniclesOfNarnia, theHobbit, goneWithTheWind];
            if (sessionStorage.getItem(myLocalLibrary)) {
                console.log("loading library from sessionStorage");
                myLibrary = JSON.parse(sessionStorage.getItem(myLocalLibrary));
            } else {
                console.log("loading sample books");
                for (const book of samples) {
                    AddBookToLibrary.add(book);
                }
            }
        }
    }

    LoadSamples.load();
})();

// Save myLibrary from memory to sessionStorage
class SaveToSessionStorage {
    static save() {
        sessionStorage.setItem(myLocalLibrary, JSON.stringify(myLibrary));
    }
}

// Display books to the page
class Render {
    static display(library) {
        cardCatalogue.innerHTML = "";
        for (let bookID in library) {
            let checkStatus;
            myLibrary[bookID].read === true ? checkStatus = 'checked="checked"' : checkStatus = "blah";
            let pages;
            parseInt(myLibrary[bookID].pages) > 1 ? pages = myLibrary[bookID].pages + " pages " : pages = " ";
            let year;
            (parseInt(myLibrary[bookID].pages) > 1 && parseInt(myLibrary[bookID].year) >= 0) ? year = ", "
                + myLibrary[bookID].year : year = myLibrary[bookID].year;
            let frag = document.createRange().createContextualFragment(`    
            <article class="card" id="${bookID}">
                <div class="book-cover"
                     style="background-image: url(${myLibrary[bookID].cover})">
                </div>
                <div class="overlay">
                    <h2 class="title">${myLibrary[bookID].title}</h2>
                    <h3 class="author">${myLibrary[bookID].author}</h3>
                    <p class="description">${myLibrary[bookID].desc}</p>
                    <p class="book-stats">${pages} ${year}</p>
                    <div class="buttons">
                        <button class="btn" id="edit-btn-${bookID}">Edit</button>
                        <button class="btn" id="delete-btn-${bookID}">Delete</button>
                        <label class="checkbox">
                            <input id="check-box-${bookID}" type="checkbox" ${checkStatus}>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
            </article>`);
            cardCatalogue.appendChild(frag);
        }
        SaveToSessionStorage.save();
        AddPhantomElements.ghostFill();
    }
}

// Add hidden books to last row to "align" books to the left
class AddPhantomElements {
    static ghostFill() {
        for (let i = 0; i < GetNumPhantoms.numGhosts(); i++) {
            let frag = document.createRange().createContextualFragment(`    
            <article class="card phantom">
            </article>`);
            cardCatalogue.appendChild(frag);
        }
    }
}

class GetNumPhantoms {
    /**
     * @param {Integer} numElements The number of elements you're displaying.
     * @param {Number} element Width Width, in pixels, of each element.
     * @param {Number} margin Width, in pixels. Your minimum target margin between items. 2x the margin on each individual item.
     * @param {Number} containerWidth Width, in pixels, of the containing element.
     */
    static numGhosts() {
        const getNumPhantomElements = ({numElements, elementWidth, margin, containerWidth}) => {
            const elementsPerRow = Math.floor(containerWidth / (elementWidth + margin));
            const elementsInLastRow = numElements % elementsPerRow;
            const numPhantomElements = elementsPerRow - elementsInLastRow;
            return numPhantomElements;
        };
        const containerWidth = document.querySelector('.card-catalogue').offsetWidth;
        const elementWidth = document.querySelector('.card').offsetWidth;
        const numPhantomElements = getNumPhantomElements({
            numElements: myLibrary.length,
            elementWidth,
            margin: 5,
            containerWidth
        });
        return numPhantomElements;
    }
}

Render.display(myLibrary);

// ---------- Functions for add, edit, delete and read buttons
class SubmitBook {
    static submit() {
        const title = document.getElementById("m-title").value;
        const author = document.getElementById("m-author").value;
        const desc = document.getElementById("m-description").value;
        const pages = document.getElementById("m-pages").value;
        const year = document.getElementById("m-year").value;
        let read = (/true/i).test(document.getElementById("m-checkbox").value);
        const cover = document.getElementById("m-image-url").value;
        if (modalContent.id != "") {
            myLibrary[modalContent.id] = new Book(title, author, pages, year, read, desc, cover);
        } else {
            AddBookToLibrary.add(new Book(title, author, pages, year, read, desc, cover));
        }
        Render.display(myLibrary);
        CloseModal.close();
    }
}

class EditBtnHandler {
    static edit(bookID) {
        const book = myLibrary[bookID];
        document.querySelector(".modal-content").setAttribute("id", bookID);
        document.getElementById("m-title").value = book.title;
        document.getElementById("m-author").value = book.author;
        document.getElementById("m-description").value = book.desc;
        document.getElementById("m-pages").value = book.pages;
        document.getElementById("m-year").value = book.year;
        document.getElementById("m-image-url").value = book.cover;
        let read = document.getElementById("m-read").value = book.read;
        if (read == true || read == "true") {
            modalCheckbox.click();
        }
        OpenModal.open();
    }
}

class DeleteBtnHandler {
    static delete(target) {
        const id = target.id.substr(11);
        // if (window.confirm(`Delete book "${myLibrary[id].title}"?`)) {
        document.getElementById(id).remove();
        myLibrary = myLibrary.filter(function (value, index) {
            return index != id;
        });
        // }
        Render.display(myLibrary);
        SaveToSessionStorage.save();
    }
}

class OpenModal {
    static open() {
        modal.classList.add("show-modal");
    }
}

class CloseModal {
    static close() {
        modal.classList.remove("show-modal");
        ClearForm.clear();
    }
}

class ClearForm {
    static clear() {
        let inputIDs = ["m-title", "m-author", "m-description", "m-pages", "m-year", "m-image-url"];
        for (const input of inputIDs) {
            document.getElementById(input).value = "";
        }
        modalContent.id = "";
        modalCheckbox.checked = false;
        modalCheckbox.value = false;
        modalCheckbox.removeAttribute("checked");
    }
}

class EditCheckBox {
    static toggle(target) {
        const id = target.id.substr(10);
        if (target.getAttribute("checked") == "checked") {
            target.value = false;
            target.removeAttribute("checked");
            myLibrary[id].read = false;
        } else {
            target.value = true;
            target.setAttribute("checked", "checked");
            myLibrary[id].read = true;
        }
        SaveToSessionStorage.save();
    }
}

class NewCheckBox {
    static toggle(target) {
        if (target.value == "true" || target.value == true) {
            target.value = false;
            target.removeAttribute("checked");
        } else {
            target.value = true;
            target.setAttribute("checked", "checked");
        }
    }
}

class SubmitModal {
    static keyDownEventHandler(keydownEvent) {
        switch (keydownEvent.key) {
            case 'Escape':
            case 'Clear':
                CloseModal.close();
                break;
            case 'Enter':
                SubmitBook.submit();
                break;
            default:
                break;
        }
    }
}
