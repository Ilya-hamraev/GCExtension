import { uuid, getFirstSymbol } from "./helpers.js";

const initialState = {
  opendNameCategory: "",
  id: "",
};

let state = {
  opendNameCategory: "",
  id: "",
};

const configClasses = {
  hidden: "hidden",
};

let bookmarks = [
  //   {
  //     category: "test",
  //     id: "c9f56b53-b2a6-43f8-8456-04c2eafaf4f6"
  //     icon: "",
  //     values: [{ name: "", link: "" }],
  //   },
];

const btnBack = document.querySelector(".button_back");
const btnRemoveCategory = document.querySelector(".button_remove_category");
const btnShowFormCrateCategory = document.querySelector(".button_add_category");
const btnShowFormCrateBookmark = document.querySelector(".button_add_bookmark");
const btnCreateCategory = document.querySelector(".button_create_category");
const btnCreateBookmark = document.querySelector(".button_create_bookmark");
const sectionCategories = document.querySelector(".section.categories");
const sectionBookmarks = document.querySelector(".section.bookmarks");
const subtitleBookmarks = document.querySelector(".subtitle__bookmarks");
const formCreateCategory = document.querySelector(".create-form-category");
const formCreateBookmark = document.querySelector(".create-form-bookmark");
const listCategories = document.querySelector(".list-categories");
const listBookmarks = document.querySelector(".list-bookmarks");
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

const updateState = ({ name = "", id = "" }) => {
  state = {
    opendNameCategory: name,
    id,
  };
};

const createCategory = (name, icon) => {
  console.log("createCategory");
  return `<li class='list-categories__item' data-category=${name} data-id=${uuid()}>${getFirstSymbol(
    name
  )}</li>`;
};

const createLink = ({ link, name }) => {
  return `<li class='list-bookmarks__item'>
    <a href=${link} target='_blank'>${name}</a>
  </li>`;
};

const reRender = () => {
  localStorage.setItem("myBookmarksExtension", JSON.stringify(bookmarks));

  if (state.opendNameCategory) {
    subtitleBookmarks.innerHTML = `List bookmarks from ${state.opendNameCategory}`;
    const category = bookmarks.find((el) => el.id === state.id);

    if (category) {
      listBookmarks.innerHTML = category?.values
        .map((link) => createLink(link))
        .join("");
    }
  } else {
    listCategories.innerHTML = bookmarks
      .map((el) => createCategory(el.category))
      .join("");
  }
};

reRender();

const addCategory = (category) => {
  bookmarks.push(category);
  reRender();
};

const clearInputsValues = (form) => {
  //TODO reset values from inputs
};

const toggleHideClasses = (...node) => {
  node.forEach((el) => {
    const classList = el.classList;
    const arrayClassList = Array.from(classList);

    if (arrayClassList.includes(configClasses.hidden)) {
      classList.remove(configClasses.hidden);
      return;
    }
    classList.add(configClasses.hidden);
  });
};

const handleOpenCategory = (event) => {
  const target = event.target;

  if (target.tagName === "LI") {
    const categoryName = target.getAttribute("data-category");
    const categoryId = target.getAttribute("data-id");

    updateState({ name: categoryName, id: categoryId });
    toggleHideClasses(sectionCategories, sectionBookmarks);
    reRender();
  }
};

const handleCreateCategory = (event) => {
  event.preventDefault;
  const formData = new FormData(formCreateCategory);
  const { name, icon } = Object.fromEntries(formData);
  const newCategory = { id: uuid(), category: name, icon };

  addCategory(newCategory);
  toggleHideClasses(formCreateCategory);
  clearInputsValues(formCreateCategory);
};

const handleCreateBookmark = (event) => {
  event.preventDefault;
  const formData = new FormData(formCreateBookmark);
  const { name, link } = Object.fromEntries(formData);

  const newState = bookmarks.map((el) => {
    const isValues = el.values === undefined;
    // const values = isValues
    //   ? el.id === state.id
    //     ? [...el.values, { name, link }]
    //     : [...el.values]
    //   : [];

    // const values = isValues
    //   ? el.id === state.id
    //     ? [...el.values, { name, link }]
    //     : [...el.values]
    //   : [];

    // const values = isValues
    //   ? [{ name, link, id: uuid() }]
    //   : el.id === state.id
    //   ? [...el.values, { name, link }]
    //   : [...el.values];

    // console.log(isValues);

    console.log(el, state.id);

    return { ...el, values: [] };
  });

  bookmarks = newState;

  toggleHideClasses(formCreateBookmark);
  reRender();
};

const handleRemoveCategory = (event) => {
  const target = event.target;
};

const handleBack = () => {
  // opendNameCategory = "";
  updateState(initialState);
  toggleHideClasses(sectionCategories, sectionBookmarks);
};

btnShowFormCrateCategory.addEventListener("click", () =>
  toggleHideClasses(formCreateCategory)
);

btnShowFormCrateBookmark.addEventListener("click", () =>
  toggleHideClasses(formCreateBookmark)
);

btnBack.addEventListener("click", handleBack);

btnCreateCategory.addEventListener("click", handleCreateCategory);

btnCreateBookmark.addEventListener("click", handleCreateBookmark);

listCategories.addEventListener("click", handleOpenCategory);

btnRemoveCategory.addEventListener("click", handleRemoveCategory);
