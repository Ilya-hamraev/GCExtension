import { uuid, getFirstSymbol, toggleHideClasses } from "./helpers.js";
import Bookmark from "./bookmark.js";
import {
  appState,
  sectionCategories,
  sectionBookmarks,
  listCategories,
  subtitleBookmarks,
} from "./constants.js";

class Category {
  constructor({ name = "", id = uuid(), values = [] }) {
    this._name = name;
    this._id = id;
    this._values = values;
  }

  getInfo() {
    return {
      name: this._name,
      id: this._id,
      values: this._values,
    };
  }

  createElement() {
    const elementCategory = document.createElement("li");
    elementCategory.classList.add("list-categories__item");
    const elementCategoryTitle = document.createElement("h4");
    elementCategoryTitle.innerHTML = getFirstSymbol(this._name);
    elementCategory.append(elementCategoryTitle);
    elementCategory.addEventListener("click", this._handleClick.bind(this));

    this._elementHTML = elementCategory;
    listCategories.append(elementCategory);
  }

  _handleClick() {
    const btnRemoveCategory = document.createElement("button");
    btnRemoveCategory.innerHTML = "Remove Category";
    btnRemoveCategory.classList.add("button");
    btnRemoveCategory.addEventListener("click", this._remove.bind(this));

    subtitleBookmarks.innerHTML = `Category ${this._name}`;
    subtitleBookmarks.append(btnRemoveCategory);

    appState.handleOpenCategory({
      name: this._name,
      id: this._id,
      values: this._values,
    });

    toggleHideClasses(sectionCategories, sectionBookmarks);

    if (this._values.length) {
      this._values.map((el) => {
        const bookmark = new Bookmark(el);
        bookmark.createElement(el);
      });
    }
  }

  _remove() {
    this._elementHTML.remove();
    appState.removeFromState(this._id);
    toggleHideClasses(sectionCategories, sectionBookmarks);
  }
}

export default Category;
