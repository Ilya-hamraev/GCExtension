const configClasses = {
  hidden: "hidden",
};

// function init() {
//     const fromStorage = localStorage.getItem("myBookmarksExtension");
//     if (fromStorage) {
//       document.querySelector(".todo__items").innerHTML = fromStorage;
//     }
//     document
//       .querySelector(".todo__options")
//       .addEventListener("change", this.update);
//     document.addEventListener("click", this.action.bind(this));
//   }

// methods.init()

const initialBookmarks = [
  {
    category: "test",
    icon: "",
    values: [{ name: "", link: "" }],
  },

  {
    category: "feff",
    icon: "",
    values: [{ name: "", link: "" }],
  },
];

const btnShow = document.querySelector(".button_show");
const btnCreateBookmarks = document.querySelector(".button_create");
const formCreateBookmarks = document.querySelector(".create-form");
const categories = document.querySelector(".categories");
const inputName = document.querySelector(".create-form__input-name");
const inputIcon = document.querySelector(".create-form__input-icon");

const getFirstSymbol = (string) => string.slice(0, 1);

const createCategory = (name, icon) => {
  return `<li class='category'>${getFirstSymbol(name)}</li>`;
};

const clearInputsValues = () => {
  inputName.value = "";
  inputIcon.value = "";
};

const update = () => {
  categories.innerHTML = initialBookmarks
    .map((el) => createCategory(el.category))
    .join("");
};

update();

const toggleShowHide = (node) => {
  const classList = node.classList;
  const arrayClassList = Array.from(classList);

  if (arrayClassList.includes(configClasses.hidden)) {
    classList.remove(configClasses.hidden);
    return;
  }
  classList.add(configClasses.hidden);
};

const handelSubmit = (e) => {
  e.preventDefault;
  const formData = new FormData(formCreateBookmarks);
  const { name, icon } = Object.fromEntries(formData);
  const newCategory = { category: name, icon };

  initialBookmarks.push(newCategory);
  toggleShowHide(formCreateBookmarks);
  update();
  clearInputsValues();
};

btnShow.addEventListener("click", () => toggleShowHide(formCreateBookmarks));
btnCreateBookmarks.addEventListener("click", handelSubmit);
