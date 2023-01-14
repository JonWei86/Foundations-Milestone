//maintain an array of objects representing all of the user's added bookmarks
//Re-render the entire list of bookmarks anytime a bookmark is added or removed
//use map tp map the bookmark array to DOM elements

/*
Here are some guiding questions:

1.What event listeners do you need to start off with?
2.Can you correctly add bookmarks?
3.What UI element allows a user to remove a previously added bookmark?
4.How can you make sure that the correct bookmark is removed?
*/

class Book {
    constructor(title, author, subject, language, comment){
      this.title = title;
      this.author = author;
      this.subject = subject;
      this.language = language;
      this.comment = comment;
    }
  }
 
// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');

      const commentInput = document.createElement('tr');

      
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.subject}</td>
        <td>${book.language}</td>
        <td>${book.comment}</td>
        <td><a href="#" class="delete">❌</a></td>
      `;

      commentInput.innerHTML = `
      <td class="comment-section"> Add a Comment:</td>
      <td>
        <div class="comments-section" id="comment-box">
        <input type="text" id="comment">
        </div>
      </td>
      <td>
      <input type="submit" value="Add Comment" class="comment-section" id="add-comment-btn">
      </td>
      `;
  
      list.appendChild(row);
      list.appendChild(commentInput);
    }

    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.nextSibling.remove();
        el.parentElement.parentElement.remove();
      }
    }

    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#subject').value = '';
      document.querySelector('#language').value = '';
    }
  
    static clearFields() {
      document.querySelector('#comment').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(language) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.language === language) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  //Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  //Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const subject = document.querySelector('#subject').value;
    const language = document.querySelector('#language').value;
  
    // Validate
    if(title === '' || author === '' || subject === '' || language === '') {
      return console.log("error")
    } else {
      const book = new Book(title, author, subject, language);
  
      UI.addBookToList(book);

      Store.addBook(book);

      UI.clearFields();
    }

 
  });
  
  //Add a Comment
  document.querySelector('#comment-section').addEventListener('submit',(e) => {
    e.preventDefault();

    const comment = document.querySelector('#comment').value;

    if(comment === '') {
      return console.log("error")
    } else {
      const comment = Book(comment);
    }

  });

  //delete ebook
  document.querySelector('#book-list').addEventListener('click', (e) => {

    UI.deleteBook(e.target);
  
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
  });
