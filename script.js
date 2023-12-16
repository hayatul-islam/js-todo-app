document.addEventListener("DOMContentLoaded", function () {
  const bookList = document.getElementById("bookList");
  const bookForm = document.getElementById("bookForm");

  //submission for adding a book
  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const dob = document.getElementById("dob").value;
    const fullName = document.getElementById("fullName").value;
    const nickname = document.getElementById("nickname").value;

    if (dob && fullName && nickname) {
      addBook(dob, fullName, nickname);
      $("#bookModal").modal("hide");
      bookForm.reset();
    }
  });

  // Handler on the book list
  bookList.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("mark-as-done")) {
      markBookAsDone(target.closest(".list-group-item"));
    } else if (target.classList.contains("delete-task")) {
      deleteBook(target.closest(".list-group-item"));
    }
  });

  // add a book to the list
  function addBook(dob, fullName, nickname) {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "border-top",
      "pt-3"
    );

    listItem.innerHTML = `
    <div>
    <h4 class="fw-semibold">${fullName}</h4>
    <div class="d-flex gap-1 align-items-center text-secondary">
      <p>${dob}</p> 
      <p>| ${nickname}</p>
    </div>
  </div>
  <div class="dropdown d-flex align-items-center">
    <button class="btn fs-4 text-primary border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i class="fas fa-ellipsis-v"></i>
    </button>
    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item mark-as-done" href="#">Mark as done</a>
      <a class="dropdown-item delete-task" href="#">Delete</a>
    </div>
  </div>
    `;

    bookList.appendChild(listItem);
  }

  // mark a book as done
  function markBookAsDone(bookItem) {
    const dropdown = bookItem.querySelector(".dropdown");
    const markAsDone = bookItem.querySelector(".mark-as-done");
    if (dropdown.querySelector(".fa-check-circle")) {
      dropdown.querySelector(".fa-check-circle").remove();
      const dropdownToggle = bookItem.querySelector(".dropdown-toggle");
      dropdownToggle.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
      markAsDone.innerHTML = `<a class="dropdown-item mark-as-done px-0" href="#">Mark as done</a>`;
    } else {
      const checkIcon = document.createElement("i");
      checkIcon.classList.add(
        "fas",
        "fa-check-circle",
        "me-2",
        "text-primary",
        "fs-4"
      );
      dropdown.insertBefore(checkIcon, dropdown.firstChild);
      const dropdownToggle = bookItem.querySelector(".dropdown-toggle");
      dropdownToggle.innerHTML = '<i class="fas fa-ellipsis-v"></i> ';
      markAsDone.innerHTML = `<a class="dropdown-item mark-as-done px-0" href="#">Unmark as done</a>`;
    }
  }

  // remove a book from the list
  function deleteBook(bookItem) {
    bookItem.remove();
  }
});
