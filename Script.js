let myLib = [];
let counter = 0;

const addButton = document.getElementById("add");
const form = document.getElementById("mainForm");
const mainDiv = document.getElementById("mainDiv");
addButton.addEventListener("click", addBook);

function book(_title, _author, _pages, _hasRead, _index){
    self = this;
    this.title = _title || "unknown";
    this.author = _author || "unknown";
    this.pages = _pages || "unknown";
    this.hasRead = _hasRead;
    this.index = _index;
    this.card = document.createElement('div');
    this.deleteButton = document.createElement("button");
    this.toggleButton = document.createElement("button");

    this.hasReadLogic = function(){
        if (this.hasRead){
            return "I have read this book";
        }
        return "I have not read this book";
    }
    
    this.toCard = function(){
        return (`${this.title.toString()},${this.author.toString()},${this.pages.toString()},${this.hasReadLogic()}`.split(","));
    }

    this.buttonAppender = function(){
        this.card.append(this.deleteButton, this.toggleButton);
        let ps = []
        let rawCard = this.toCard();
        for(let x = 0; x<4; x++){
            ps[x]= document.createElement('p');
            ps[x].classList.add("bookCard");
            ps[x].innerText = rawCard[x];
            this.card.append(ps[x]);
            }
        this.card.classList.add("bookCard");
        mainDiv.append(this.card);
        
        this.buttonLogic(this.deleteButton, this.toggleButton);
    }
    this.buttonAppender()
}

book.prototype.readToggle = function(e){
    e.preventDefault()
    this.hasRead = !this.hasRead;
}

book.prototype.buttonLogic = function(deleteButton, toggleButton){
    deleteButton.addEventListener("click", () => {

        mainDiv.removeChild(this.card);
        myLib.splice(this.index, 1);  
        counter--;
        storeLocally();
        refresh();
        });
    toggleButton.addEventListener("click", () =>{
        this.hasRead = !this.hasRead;
        this.card.childNodes[5].innerText = this.hasReadLogic();
    });
    self.deleteButton.innerText = "Delete";
    self.toggleButton.innerText = "Read/Unread";
}

function addBook(){
    for(let x = 0; x<4; x++){
        if (form.elements[x].value == ''){
            alert("Error: Please enter a value for all fields!");
            return;
        }
    }

    let read = form.elements[3].checked;
    if (form.elements[0] == ""){form.elements[0] = undefined};
    let newBook = new book(form.elements[0].value, form.elements[1].value, form.elements[2].value, read, counter);
    myLib[counter] = (newBook);
    storeLocally();
    counter++;
}

function storeLocally(){
    for(let x = 0; x<counter; x++){
        localStorage.setItem(`myLib[${x}]`, myLib[x]);
        localStorage.setItem(`myLib[${x}].title`, myLib[x].title);
        localStorage.setItem(`myLib[${x}].author`, myLib[x].author);
        localStorage.setItem(`myLib[${x}].pages`, myLib[x].pages);
        localStorage.setItem(`myLib[${x}].hasRead`, myLib[x].hasRead);
        localStorage.setItem(`myLib[${x}].index`, myLib[x].index);
    }
    localStorage.setItem(`counter`, counter);
    localStorage.setItem("myLibrary", JSON.stringify(myLib));
}

function refresh(){
    for(let x = 0; x <counter; x++){
        myLib[x].index = x;
    }
}

function loadLocal(){
    counter = parseInt(localStorage.getItem("counter"));
    for(let x = 0; x<counter; x++){
        let newBook = new book( localStorage.getItem(`myLib[${x}].title`),  localStorage.getItem(`myLib[${x}].author`), 
        localStorage.getItem(`myLib[${x}].pages`),  localStorage.getItem(`myLib[${x}].hasRead`), x);
        myLib[x] = newBook;
    }
}

loadLocal();