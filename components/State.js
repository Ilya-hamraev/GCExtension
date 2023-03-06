const keyLocalStorage = "myBookmarksExtension";

const storage = localStorage.getItem(keyLocalStorage);

class AppState {
  constructor() {
    this.bookmarks = JSON.parse(storage) || [];
    this.opendCategory = null;
    this._setItemStorage = (props) => {
      localStorage.setItem(keyLocalStorage, JSON.stringify(props));
    };
    this._clearStorage = () => {
      localStorage.removeItem(keyLocalStorage);
    };
  }

  getState() {
    return this;
  }

  clearState() {
    if (storage) {
      this._clearStorage();
      this.bookmarks = [];
    }
  }

  addToState(element) {
    if (!storage) {
      this._setItemStorage([element]);
      return;
    }

    this._setItemStorage([...this.bookmarks, element]);
  }

  removeFromState(id) {
    const arr = JSON.parse(storage) || [];

    if (arr.length) {
      const filteredStorage = arr.filter((el) => el.id !== id);
      this._setItemStorage(filteredStorage);
      this.bookmarks = filteredStorage;
    }

    this.handeleCloseCategory();
  }

  updateStateCategory(element) {
    const updatedCategory = this.bookmarks.map((category) =>
      category.id === element.id ? element : category
    );

    this._updateState(updatedCategory);
  }

  handleOpenCategory(el) {
    this.opendCategory = el;
  }

  handeleCloseCategory() {
    this.opendCategory = null;
  }

  _updateState(bookmarks) {
    this._setItemStorage(bookmarks);

    this.bookmarks = bookmarks;
  }
}

export default AppState;
