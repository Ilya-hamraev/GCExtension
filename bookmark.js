import { uuid, toggleHideClasses } from "./helpers.js";
import { appState, formCreateBookmark, listBookmarks } from "./constants.js";

class Bookmark {
  constructor({ name = "", link = "", id = uuid() }) {
    this._name = name;
    this._link = link;
    this._id = id;
  }

  getInfo() {
    return {
      name: this._name,
      link: this._link,
      id: this._id,
    };
  }

  createElement() {
    const liElement = document.createElement("li");
    liElement.classList.add("list-bookmarks__item");
    const link = document.createElement("a");
    link.innerHTML = this._name;
    link.classList.add("list-bookmarks__link");
    link.setAttribute("href", this._link);
    link.setAttribute("target", "_blank");

    const controllersWrap = document.createElement("div");
    controllersWrap.classList.add("list-bookmarks__controllers");

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "Remove";
    removeBtn.classList.add("button");
    removeBtn.addEventListener("click", this._remove.bind(this));

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("button");
    editBtn.addEventListener("click", this._edit.bind(this));

    controllersWrap.append(removeBtn, editBtn);
    liElement.append(link, controllersWrap);

    this._element = liElement;

    listBookmarks.append(liElement);
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

    appState.updateStateCategory(updatedCatrgory);

    this._element.remove();
  }

  _edit() {
    toggleHideClasses(formCreateBookmark);
    formCreateBookmark.name.value = this._name;
    formCreateBookmark.link.value = this._link;
  }
}

export default Bookmark;
