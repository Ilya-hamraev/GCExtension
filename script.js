import { toggleHideClasses } from "./helpers.js";
import Category from "./category.js";
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

state.bookmarks.forEach((el) => {
  const category = new Category(el);

  const elementCategory = category.createLayout(el);
  listCategories.append(elementCategory);
});

const handleCreateCategory = (event) => {
  event.preventDefault;
  const formData = new FormData(formCreateCategory);
  const { name } = Object.fromEntries(formData);
  const category = new Category({ name });
  appState.addToState(category);

  toggleHideClasses(formCreateCategory);
};

const handleCreateBookmark = (event) => {
  event.preventDefault;
  const formData = new FormData(formCreateBookmark);
  const { name, link } = Object.fromEntries(formData);

  console.log(name, link);

  toggleHideClasses(formCreateBookmark);
};

const handleBack = () => {
  toggleHideClasses(sectionCategories, sectionBookmarks);
};

const handleRemoveCategory = () => {
  const id = state.opendCategory.id;
  state.removeFromState(id);
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
