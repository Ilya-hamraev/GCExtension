import { toggleHideClasses } from "./utils/helpers.js";
import Category from "./components/Category.js";
import Bookmark from "./components/Bookmark.js";
import Form from "./components/Form.js";
import {
  btnShowFormCrateCategory,
  btnCreateCategory,
  formCreateCategory,
  sectionCategories,
  sectionBookmarks,
  btnShowFormCrateBookmark,
  formCreateBookmark,
  btnCreateBookmark,
  btnBack,
  appState,
  listCategories,
  listBookmarks,
} from "./utils/constants.js";

const state = appState.getState();

function createBookmark(name, link) {
  return new Bookmark({ name, link }, ".list-bookmarks__item");
}

function createCategory(props) {
  return new Category(props, ".list-categories__item");
}

function createForm(props) {
  return new Form(props);
}

state.bookmarks.forEach((el) => {
  const category = createCategory(el);
  const categoryElement = category.generateCategory();

  listCategories.append(categoryElement);
});

const handleCreateCategory = () => {
  const form = createForm(formCreateCategory);
  const { name } = form.getValues();
  const category = createCategory({ name });
  const categoryInfo = category.getInfo();
  const categoryElement = category.generateCategory();

  listCategories.append(categoryElement);
  appState.addToState(categoryInfo);
  toggleHideClasses(formCreateCategory);
};

const handleCreateBookmark = () => {
  const form = createForm(formCreateBookmark);
  const { name, link } = form.getValues();
  const opendCategory = state.opendCategory;

  const bookmark = createBookmark(name, link);
  const infoBookmark = bookmark.getInfo();
  const bookmarkElement = bookmark.generateBookmark();

  const category = {
    ...opendCategory,
    values: opendCategory.values.length
      ? [...opendCategory.values, infoBookmark]
      : [infoBookmark],
  };

  listBookmarks.append(bookmarkElement);
  appState.updateStateCategory(category);
  toggleHideClasses(formCreateBookmark);
};

const handleBack = () => {
  state.handeleCloseCategory();
  toggleHideClasses(sectionCategories, sectionBookmarks);
};

btnShowFormCrateCategory.addEventListener("click", () =>
  toggleHideClasses(formCreateCategory)
);
btnShowFormCrateBookmark.addEventListener("click", () =>
  toggleHideClasses(formCreateBookmark)
);
btnCreateBookmark.addEventListener("click", handleCreateBookmark);
btnCreateCategory.addEventListener("click", handleCreateCategory);
btnBack.addEventListener("click", handleBack);
