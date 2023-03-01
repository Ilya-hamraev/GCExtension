import { toggleHideClasses } from "./helpers.js";
import Category from "./category.js";
import Bookmark from "./bookmark.js";
import {
  btnShowFormCrateCategory,
  btnCreateCategory,
  formCreateCategory,
  listCategories,
  sectionCategories,
  sectionBookmarks,
  btnRemoveCategory,
  btnShowFormCrateBookmark,
  formCreateBookmark,
  btnCreateBookmark,
  btnBack,
  appState,
} from "./constants.js";

const state = appState.getState();

function createBookmark(name, link) {
  return new Bookmark({ name, link });
}

function createCategory(props) {
  return new Category(props);
}

function createFormData(props) {
  return new FormData(props);
}

state.bookmarks.forEach((el) => {
  const category = createCategory(el);
  const elementCategory = category.createHTMLElement(el);

  listCategories.append(elementCategory);
});

const handleCreateCategory = () => {
  const formData = createFormData(formCreateCategory);
  const { name } = Object.fromEntries(formData);
  const category = createCategory({ name });

  appState.addToState(category);
  toggleHideClasses(formCreateCategory);
};

const handleCreateBookmark = () => {
  const formData = createFormData(formCreateBookmark);
  const { name, link } = Object.fromEntries(formData);
  const category = {
    ...state.opendCategory,
    values: state.opendCategory.values.length
      ? [...state.opendCategory.values, createBookmark(name, link)]
      : [createBookmark(name, link)],
  };

  appState.updateStateCategory(category);
  toggleHideClasses(formCreateBookmark);
};

const handleBack = () => {
  state.handeleCloseCategory();
  toggleHideClasses(sectionCategories, sectionBookmarks);
};

const handleRemoveCategory = () => {
  const idCategory = state.opendCategory.id;

  state.removeFromState(idCategory);
  handleBack();
};

btnShowFormCrateCategory.addEventListener("click", () =>
  toggleHideClasses(formCreateCategory)
);
btnShowFormCrateBookmark.addEventListener("click", () =>
  toggleHideClasses(formCreateBookmark)
);
btnCreateBookmark.addEventListener("click", handleCreateBookmark);
btnRemoveCategory.addEventListener("click", handleRemoveCategory);
btnCreateCategory.addEventListener("click", handleCreateCategory);
btnBack.addEventListener("click", handleBack);
