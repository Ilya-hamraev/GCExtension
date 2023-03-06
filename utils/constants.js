import AppState from "../components/State.js";

const configClasses = {
  hidden: "hidden",
};

const appState = new AppState();

const btnShowFormCrateCategory = document.querySelector(".button_add_category");
const btnShowFormCrateBookmark = document.querySelector(".button_add_bookmark");
const formCreateCategory = document.querySelector(".create-form-category");
const formCreateBookmark = document.querySelector(".create-form-bookmark");
const btnCreateCategory = document.querySelector(".button_create_category");
const btnCreateBookmark = document.querySelector(".button_create_bookmark");
const listCategories = document.querySelector(".list-categories");
const listBookmarks = document.querySelector(".list-bookmarks");
const sectionCategories = document.querySelector(".section.categories");
const sectionBookmarks = document.querySelector(".section.bookmarks");
const subtitleBookmarks = document.querySelector(".subtitle__bookmarks");
const btnBack = document.querySelector(".button_back");
const btnRemoveCategory = document.querySelector(".button_remove_category");

export {
  btnBack,
  appState,
  configClasses,
  btnShowFormCrateCategory,
  btnShowFormCrateBookmark,
  formCreateCategory,
  formCreateBookmark,
  btnCreateCategory,
  btnCreateBookmark,
  listCategories,
  listBookmarks,
  sectionCategories,
  sectionBookmarks,
  subtitleBookmarks,
  btnRemoveCategory,
};
