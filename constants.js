import AppState from "./state.js";

const configClasses = {
  hidden: "hidden",
};

const appState = new AppState();

const btnShowFormCrateCategory = document.querySelector(".button_add_category");
const formCreateCategory = document.querySelector(".create-form-category");
const btnCreateCategory = document.querySelector(".button_create_category");
const listCategories = document.querySelector(".list-categories");
const sectionCategories = document.querySelector(".section.categories");
const sectionBookmarks = document.querySelector(".section.bookmarks");
const subtitleBookmarks = document.querySelector(".subtitle__bookmarks");
const btnBack = document.querySelector(".button_back");
const btnRemoveCategory = document.querySelector(".button_remove_category");
const btnShowFormCrateBookmark = document.querySelector(".button_add_bookmark");
const formCreateBookmark = document.querySelector(".create-form-bookmark");
const listBookmarks = document.querySelector(".list-bookmarks");
const btnCreateBookmark = document.querySelector(".button_create_bookmark");

export {
  appState,
  configClasses,
  btnShowFormCrateCategory,
  formCreateCategory,
  btnCreateCategory,
  listCategories,
  sectionCategories,
  sectionBookmarks,
  subtitleBookmarks,
  btnBack,
  btnRemoveCategory,
  btnShowFormCrateBookmark,
  formCreateBookmark,
  listBookmarks,
  btnCreateBookmark,
};
