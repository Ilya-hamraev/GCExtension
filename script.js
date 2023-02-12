import { getFirstSymbol } from "./helpers.js";

let opendCategory = "";

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
const btnBack = document.querySelector(".button_back");
const btnShowFormCrateCategory = document.querySelector(".button_add_category");
const btnShowFormCrateBookmark = document.querySelector(".button_add_bookmark");
const btnCreateCategory = document.querySelector(".button_create_category");
const btnCreateBookmark = document.querySelector(".button_create_bookmark");
const formCreateCategory = document.querySelector(".create-form-category");
const formCreateBookmark = document.querySelector(".create-form-bookmark");
const categories = document.querySelector(".categories");
const listLinks = document.querySelector(".list-links");
const inputNameCategory = document.querySelector(
  ".create-form-category__input-name"
);
const inputIconCategory = document.querySelector(
  ".create-form-category__input-icon"
);

const init = () => {
  const fromStorage = localStorage.getItem("myBookmarksExtension");

  if (fromStorage) {
    bookmarks = JSON.parse(fromStorage);
  }
};

init();

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
  inputNameCategory.value = "";
  inputIconCategory.value = "";
};

const updateListLinks = (arr) => {
  listLinks.innerHTML = arr.map((link) => createLink(link)).join("");
};

const updateCategories = () => {
  categories.innerHTML = bookmarks
    .map((el) => createCategory(el.category))
    .join("");
};

updateCategories();

const toggleShowForm = (node) => {
  const classList = node.classList;
  const arrayClassList = Array.from(classList);

  if (arrayClassList.includes(configClasses.hidden)) {
    classList.remove(configClasses.hidden);
    return;
  }
  classList.add(configClasses.hidden);
};

const handleBack = () => {
  opendCategory = "";
};

const addCategory = (category) => {
  bookmarks.push(category);
  localStorage.setItem("myBookmarksExtension", JSON.stringify(bookmarks));
  updateCategories();
};

const addBookmark = (bookamark) => {
  console.log(bookamark);
};

const handleCreateCategory = (event) => {
  event.preventDefault;
  const formData = new FormData(formCreateCategory);
  const { name, icon } = Object.fromEntries(formData);
  const newCategory = { category: name, icon };

  addCategory(newCategory);
  toggleShowForm(formCreateCategory);
  clearInputsValues();
};

const handleCreateBookmark = (event) => {
  event.preventDefault;
  const formData = new FormData(formCreateBookmark);
  const { name, link } = Object.fromEntries(formData);

  console.log(name, link);
};

const handleOpenCategory = (event) => {
  const target = event.target;

  if (target.tagName === "LI") {
    const category = target.getAttribute("data-category");
    opendCategory = category;
    showLinksCategory(category);
  }
};

const showLinksCategory = (category) => {
  const filteredList = bookmarks.find((el) => el.category === category);

  if (filteredList.values) {
    updateListLinks(filteredList.values);
  }
};

btnShowFormCrateCategory.addEventListener("click", () =>
  toggleShowForm(formCreateCategory)
);

btnShowFormCrateBookmark.addEventListener("click", () =>
  toggleShowForm(formCreateBookmark)
);

categories.addEventListener("click", handleOpenCategory);

btnCreateCategory.addEventListener("click", handleCreateCategory);

btnCreateBookmark.addEventListener("click", handleCreateBookmark);

btnBack.addEventListener("click", handleBack);
