import { uuid, toggleHideClasses } from "../utils/helpers.js";
import { formCreateBookmark } from "../utils/constants.js";
import appState from "./State.js";

class Bookmark {
  constructor(
    { name = "", link = "", id = uuid() },
    templateSelector = ".list-bookmarks__item"
  ) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._templateSelector = templateSelector;
  }

  getInfo() {
    return {
      name: this._name,
      link: this._link,
      id: this._id,
    };
  }

  _getTemplate() {
    const template = document.querySelector(".bookmark-template");
    const bookmarkElement = template.content
      .querySelector(this._templateSelector)
      .cloneNode(true);

    return bookmarkElement;
  }

  generateBookmark() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const link = this._element.querySelector(".list-bookmarks__link");
    link.textContent = this._name;
    link.setAttribute("href", this._link);
    link.setAttribute("target", "_blank");

    this._element.querySelector(".bookmark_remove").textContent = "Remove";
    this._element.querySelector(".bookmark_edit").textContent = "Edit";

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".bookmark_remove")
      .addEventListener("click", () => this._remove());
    this._element
      .querySelector(".bookmark_edit")
      .addEventListener("click", () => this._edit());
  }

  _remove() {
    const state = appState.getState();
    const category = state.opendCategory;
    const updatedCatrgory = {
      ...category,
      values: category.values.length
        ? category.values.filter((el) => el.id !== this._id)
        : category.values,
    };

    this._element.remove();
    appState.handleUpdateCategory(updatedCatrgory);
  }

  _edit() {
    toggleHideClasses(formCreateBookmark);
    formCreateBookmark.name.value = this._name;
    formCreateBookmark.link.value = this._link;
  }
}

export default Bookmark;
