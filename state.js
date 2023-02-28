const keyLocalStorage = "myBookmarksExtension";

const storage = localStorage.getItem(keyLocalStorage);

class AppState {
  constructor() {
    this.bookmarks = JSON.parse(storage) || [];
    this.opendCategory = null;
  }

  getState() {
    return this;
  }

  clearState() {
    if (storage) {
      localStorage.removeItem(keyLocalStorage);
      this.bookmarks = [];
    }
  }

  addToState(element) {
    if (!storage) {
      localStorage.setItem(keyLocalStorage, JSON.stringify([element]));

      return;
    }

    localStorage.setItem(
      keyLocalStorage,
      JSON.stringify([...JSON.parse(this.bookmarks), element])
    );
  }

  removeFromState(id) {
    const arr = JSON.parse(storage) || [];

    if (arr.length) {
      const filteredStorage = arr.filter((el) => el.id !== id);

      localStorage.setItem(keyLocalStorage, JSON.stringify(filteredStorage));

      this.bookmarks = filteredStorage;
    }

    this.handeleCloseCategory();
  }

  handleOpenCategory(el) {
    this.opendCategory = el;
  }

  handeleCloseCategory() {
    this.opendCategory = null;
  }
}

export default AppState;
