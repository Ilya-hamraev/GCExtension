import { uuid } from "./helpers.js";

class Bookmark {
  constructor({ name = "", link = "", id = uuid() }) {
    this.name = name;
    this.link = link;
    this.id = id;
  }

  createLayout() {
    const liElement = document.createElement("li");
    liElement.classList.add("list-bookmarks__item");
    liElement.setAttribute("data-id", id);
    const link = document.createElement("a");
    link.innerHTML = this.name;
    link.setAttribute("href", this.link);
    liElement.append(link);

    return liElement;
  }
}

export default Bookmark;
