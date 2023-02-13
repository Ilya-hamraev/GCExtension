import { getFirstSymbol } from "./helpers.js";

// let state = {
//   opendNameCategory: '',

// };

let opendNameCategory = "";

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
const subtitle = document.querySelector(".subtitle");

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

const reRender = () => {
  if (opendNameCategory) {
    subtitle.innerHTML = opendNameCategory;
    const category = bookmarks.find((el) => el.category === opendNameCategory);
    if (category) {
      listLinks.innerHTML = category?.values
        .map((link) => createLink(link))
        .join("");
    }
  } else {
    categories.innerHTML = bookmarks
      .map((el) => createCategory(el.category))
      .join("");
  }
};

reRender();

const handleBack = () => {
  opendNameCategory = "";
  toggleHideClasses(
    categories,
    btnShowFormCrateCategory,
    btnShowFormCrateBookmark,
    btnBack,
    subtitle,
    listLinks
  );

  reRender();
};

const addCategory = (category) => {
  bookmarks.push(category);
  localStorage.setItem("myBookmarksExtension", JSON.stringify(bookmarks));
  reRender();
};

const handleCreateCategory = (event) => {
  event.preventDefault;
  const formData = new FormData(formCreateCategory);
  const { name, icon } = Object.fromEntries(formData);
  const newCategory = { category: name, icon };

  addCategory(newCategory);
  toggleHideClasses(formCreateCategory);
  clearInputsValues();
};

const handleCreateBookmark = (event) => {
  event.preventDefault;
  const formData = new FormData(formCreateBookmark);
  const { name, link } = Object.fromEntries(formData);

  const newState = bookmarks.map((el) => {
    const isValues = el.values !== undefined;
    const values = isValues
      ? el.category === opendNameCategory
        ? [...el.values, { name, link }]
        : [...el.values]
      : [];

    return { ...el, values };
  });

  bookmarks = newState;

  reRender();
};

const handleOpenCategory = (event) => {
  const target = event.target;

  if (target.tagName === "LI") {
    const category = target.getAttribute("data-category");
    opendNameCategory = category;
    toggleHideClasses(
      categories,
      btnShowFormCrateCategory,
      btnShowFormCrateBookmark,
      btnBack,
      subtitle,
      listLinks
    );
    reRender();
  }
};

btnShowFormCrateCategory.addEventListener("click", () =>
  toggleHideClasses(formCreateCategory)
);

btnShowFormCrateBookmark.addEventListener("click", () =>
  toggleHideClasses(formCreateBookmark)
);

categories.addEventListener("click", handleOpenCategory);

btnCreateCategory.addEventListener("click", handleCreateCategory);

btnCreateBookmark.addEventListener("click", handleCreateBookmark);

btnBack.addEventListener("click", handleBack);
