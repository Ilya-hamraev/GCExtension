const keyLocalStorage = "myBookmarksExtension";

const storage = localStorage.getItem(keyLocalStorage);

class State {
  constructor() {
    this._categories = null;
    this._opendCategory = null;
  }

  init() {
    this._categories = JSON.parse(storage) || [];
    this._clearStorage = () => localStorage.removeItem(keyLocalStorage);
    this._updateStorage = (nextState) => {
      localStorage.setItem(keyLocalStorage, JSON.stringify(nextState));
    };
  }

  getState() {
    return {
      opendCategory: this._opendCategory,
      categories: this._categories,
    };
  }

  _updateCategories(categories) {
    this._categories = categories;
    this._updateStorage(categories);
  }

  handleUpdateCategory(category) {
    const idxItem = this._categories.findIndex((el) => el.id === category.id);

    if (idxItem !== -1) {
      const newState = [...this._categories];
      newState[idxItem] = category;

      this._updateCategories(newState);
    }
  }

  handleAddCategory(newCategory) {
    const newState = [...this._categories, newCategory];

    this._updateCategories(newState);
  }

  handleRemoveCategory(id) {
    const newState = this._categories.filter((category) => category.id !== id);

    this._updateCategories(newState);
  }

  handleOpenCategory(category) {
    this._opendCategory = category;
  }

  handleCloseCategory() {
    this._opendCategory = null;
  }
}

const appState = new State();

appState.init();

export default appState;
