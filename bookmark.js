import { uuid } from "./helpers.js";
import { appState } from "./constants.js";

class Bookmark {
  constructor({ name = "", link = "", id = uuid() }) {
    this.name = name;
    this.link = link;
    this.id = id;
  }

  createHTMLElement() {
    const liElement = document.createElement("li");
    liElement.classList.add("list-bookmarks__item");
    liElement.setAttribute("data-id", this.id);
    const link = document.createElement("a");
    link.innerHTML = this.name;
    link.classList.add("list-bookmarks__link");
    link.setAttribute("href", this.link);
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

    return liElement;
  }

  _remove() {
    const state = appState.getState();
    const category = state.opendCategory;
    const updatedCatrgory = {
      ...category,
      values: category.values.length
        ? category.values.filter((el) => el.id !== this.id)
        : category.values,
    };

    appState.updateStateCategory(updatedCatrgory);
  }

  _edit() {
    console.log("edit", this);
  }
}

export default Bookmark;
