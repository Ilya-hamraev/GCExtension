import { uuid, getFirstSymbol, toggleHideClasses } from "./helpers.js";
import Bookmark from "./bookmark.js";
import {
  appState,
  sectionCategories,
  sectionBookmarks,
  listBookmarks,
  subtitleBookmarks,
} from "./constants.js";

class Category {
  constructor({ name = "", id = uuid(), values = [] }) {
    this.name = name;
    this.id = id;
    this.values = values;
  }

  remove(id) {
    appState.removeFromState(id);
  }

  createLayout({ name, id }) {
    const elementCategory = document.createElement("li");
    elementCategory.classList.add("list-categories__item");
    elementCategory.setAttribute("data-id", id);
    const elementCategoryTitle = document.createElement("h4");
    elementCategoryTitle.innerHTML = getFirstSymbol(name);
    elementCategory.append(elementCategoryTitle);
    elementCategory.addEventListener("click", this._handleClick.bind(this));

    return elementCategory;
  }

  _handleClick() {
    subtitleBookmarks.innerHTML = this.name;
    appState.handleOpenCategory(this);
    toggleHideClasses(sectionCategories, sectionBookmarks);

    if (this.values.length) {
      this.values.map((el) => {
        const bookmark = new Bookmark(el);
        const elementLi = bookmark.createLayout(el);
        listBookmarks.append(elementLi);
      });
    }
  }
}

export default Category;
