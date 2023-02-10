const configClasses = {
  hidden: "hidden",
};

const initialBookmarks = [];

const btnShow = document.querySelector(".button_show");
const createForm = document.querySelector(".create-form");

const toggleShowHide = (node) => {
  const classList = node.classList;
  const arrayClassList = Array.from(classList);

  if (arrayClassList.includes(configClasses.hidden)) {
    classList.remove(configClasses.hidden);
    return;
  }
  classList.add(configClasses.hidden);
};

btnShow.addEventListener("click", () => toggleShowHide(createForm));
