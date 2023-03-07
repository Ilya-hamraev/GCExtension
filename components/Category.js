import { uuid, getFirstSymbol, toggleHideClasses } from "../utils/helpers.js";
import Bookmark from "./Bookmark.js";
import appState from "./State.js";
import {
  sectionCategories,
  sectionBookmarks,
  subtitleBookmarks,
  listBookmarks,
} from "../utils/constants.js";

class Category {
  constructor({ name = "", id = uuid(), values = [] }, templateSelector) {
    this._name = name;
    this._id = id;
    this._values = values;
    this._templateSelector = templateSelector;
  }

  getInfo() {
    return {
      name: this._name,
      id: this._id,
      values: this._values,
    };
  }

  _getTemplate() {
    const template = document.querySelector(".category-template");
    const categoryElement = template.content
      .querySelector(this._templateSelector)
      .cloneNode(true);

    return categoryElement;
  }

  generateCategory() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".list-categories__item_title").textContent =
      getFirstSymbol(this._name);

    return this._element;
  }

  _templateRemoveButton() {
    const templateRemoveBtn = document.createElement("button");
    templateRemoveBtn.innerHTML = "Remove Category";
    templateRemoveBtn.classList.add("button");

    return templateRemoveBtn;
  }

  _setEventListeners() {
    this._element.addEventListener("click", () => this._handleOpenCategory());
  }

  _handleOpenCategory() {
    const removeBtn = this._templateRemoveButton();
    this._removeButton = removeBtn;
    removeBtn.addEventListener("click", () => this._handleRemoveCategory());

    subtitleBookmarks.innerHTML = `Category ${this._name}`;
    subtitleBookmarks.append(removeBtn);

    appState.handleOpenCategory({
      name: this._name,
      id: this._id,
      values: this._values,
    });

    toggleHideClasses(sectionCategories, sectionBookmarks);

    if (this._values.length) {
      this._values.map((el) => {
        const bookmark = new Bookmark(el, ".list-bookmarks__item");
        const bookmarkElement = bookmark.generateBookmark();

        listBookmarks.append(bookmarkElement);
      });
    }
  }

  _handleRemoveCategory() {
    this._element.remove();
    appState.handleRemoveCategory(this._id);
    toggleHideClasses(sectionCategories, sectionBookmarks);
  }
}

export default Category;
