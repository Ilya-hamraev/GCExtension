const configClasses = {
  hidden: "hidden",
};

let bookmarks = [
  //   {
  //     category: "test",
  //     icon: "",
  //     values: [{ name: "", link: "" }],
  //   },
  //   {
  //     category: "feff",
  //     icon: "",
  //     values: [{ name: "", link: "" }],
  //   },
];

const btnShow = document.querySelector(".button_show");
const btnCreateBookmarks = document.querySelector(".button_create");
const formCreateBookmarks = document.querySelector(".create-form");
const categories = document.querySelector(".categories");
const listLinks = document.querySelector(".list-links");
const inputName = document.querySelector(".create-form__input-name");
const inputIcon = document.querySelector(".create-form__input-icon");

function init() {
  const fromStorage = localStorage.getItem("myBookmarksExtension");

  if (fromStorage) {
    bookmarks = JSON.parse(fromStorage);
  }
}

init();

const getFirstSymbol = (string) => string.slice(0, 1);

const createCategory = (name, icon) => {
  return `<li class='category' data-category=${name}>${getFirstSymbol(
    name
  )}</li>`;
};

const createLink = ({ link, name }) => {
  return `<li class='list-links__link'>
    <a href=${link} target='_blank'>${name}</a>
  </li>`;
};

const clearInputsValues = () => {
  inputName.value = "";
  inputIcon.value = "";
};

const update = () => {
  categories.innerHTML = bookmarks
    .map((el) => createCategory(el.category))
    .join("");
};

update();

const toggleShowHide = (node) => {
  const classList = node.classList;
  const arrayClassList = Array.from(classList);

  if (arrayClassList.includes(configClasses.hidden)) {
    classList.remove(configClasses.hidden);
    return;
  }
  classList.add(configClasses.hidden);
};

const addCategory = (category) => {
  bookmarks.push(category);
  localStorage.setItem("myBookmarksExtension", JSON.stringify(bookmarks));
  update();
};

const handelSubmit = (event) => {
  event.preventDefault;
  const formData = new FormData(formCreateBookmarks);
  const { name, icon } = Object.fromEntries(formData);
  const newCategory = { category: name, icon };

  addCategory(newCategory);
  toggleShowHide(formCreateBookmarks);
  clearInputsValues();
};

const handleOpenCategory = (event) => {
  let target = event.target;

  if (target.tagName != "LI") return;

  showLinksCategory(target);
};

const showLinksCategory = (category) => {
  const getCategory = category.getAttribute("data-category");
  const filteredList = bookmarks.find((el) => el.category === getCategory);

  if (filteredList) {
    listLinks.innerHTML = filteredList.values
      .map((link) => createLink(link))
      .join("");
  }
};

btnShow.addEventListener("click", () => toggleShowHide(formCreateBookmarks));
categories.addEventListener("click", handleOpenCategory);
btnCreateBookmarks.addEventListener("click", handelSubmit);
