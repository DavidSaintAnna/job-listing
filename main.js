const cards = document.querySelector(".cards");
const modal = document.querySelector(".modal");
const arrayOfTags = [];

const filterItems = () => {
  const filteredElements = document.getElementsByClassName("job");

  for (let j = 0; j < filteredElements.length; j++) {
    let display = true;
    for (const tag of arrayOfTags) {
      if (!filteredElements[j].classList.contains("filter-" + tag)) {
        display = false;
        break;
      }
    }
    filteredElements[j].setAttribute(
      "style",
      display ? "display:grid" : "display:none"
    );
  }
};

const triggerModal = (event) => {
  modal.setAttribute("style", "display:block");
  if (arrayOfTags.includes(event.target.innerText)) {
    return;
  }
  const span = document.createElement("span");
  const removeSpan = document.createElement("span");
  span.innerText = event.target.innerText;
  arrayOfTags.push(event.target.innerText);

  span.appendChild(removeSpan);
  modal.firstElementChild.firstElementChild.appendChild(span);
  filterItems();
  removeSpan.addEventListener("click", () => {
    modal.firstElementChild.firstElementChild.removeChild(span);
    arrayOfTags.splice(arrayOfTags.indexOf(span.innerText), 1);
    filterItems();
  });
};

modal.firstElementChild.children[1].addEventListener("click", () => {
  if (arrayOfTags.length === 0) {
    return;
  }
  arrayOfTags.splice(0, arrayOfTags.length);
  const tags = modal.firstElementChild.firstElementChild;
  while (tags.firstChild) {
    tags.removeChild(tags.firstChild);
  }
  filterItems();
});

fetch("./data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    jsonData.forEach((item) => {
      const cardDiv = document.createElement("div");
      const logo = document.createElement("img");
      const firstRow = document.createElement("div");
      const secondRow = document.createElement("div");
      const thirdRow = document.createElement("div");
      const grayLine = document.createElement("div");
      const gridRow = document.createElement("div");

      logo.setAttribute("src", item.logo);
      logo.setAttribute("alt", item.company);

      firstRow.classList.add("first-row");
      secondRow.classList.add("second-row");
      thirdRow.classList.add("third-row");
      grayLine.classList.add("bar", "hide");
      gridRow.classList.add("grid-row");

      const company = document.createElement("span");
      company.classList.add("blue-span");
      company.innerText = item.company;
      firstRow.appendChild(company);

      if (item.new) {
        const newSpan = document.createElement("span");
        newSpan.innerText = "NEW!";
        firstRow.appendChild(newSpan);
      }

      if (item.featured) {
        const newSpan = document.createElement("span");
        newSpan.innerText = "FEATURED";
        firstRow.appendChild(newSpan);
      }

      const contractData = (innerText) => {
        const tag = document.createElement("span");
        tag.innerText = innerText;
        thirdRow.appendChild(tag);
      };

      contractData(item.postedAt);
      thirdRow.appendChild(document.createTextNode(" \u2022 "));
      contractData(item.contract);
      thirdRow.appendChild(document.createTextNode(" \u2022 "));
      contractData(item.location);

      const createTag = (innerText) => {
        const div = document.createElement("div");
        const tag = document.createElement("span");
        div.appendChild(tag);
        tag.innerText = innerText;
        cardDiv.classList.add(`filter-${innerText}`);
        tag.addEventListener("click", triggerModal);
        gridRow.appendChild(div);
      };

      if (item.new && item.featured) {
        cardDiv.classList.add("card", "job");
      } else if (item.new && !item.featured) {
        cardDiv.classList.add("card-only-new", "job");
      } else {
        cardDiv.classList.add("card-not-featured", "job");
      }

      const strong = document.createElement("strong");
      strong.innerText = item.position;
      secondRow.appendChild(strong);

      createTag(item.role);
      createTag(item.level);

      item.languages.forEach(createTag);
      item.tools.forEach(createTag);

      cardDiv.appendChild(logo);
      cardDiv.appendChild(firstRow);
      cardDiv.appendChild(secondRow);
      cardDiv.appendChild(thirdRow);
      cardDiv.appendChild(grayLine);
      cardDiv.appendChild(document.createElement("div"));
      cardDiv.appendChild(gridRow);
      cardDiv.appendChild(document.createElement("div"));

      cards.appendChild(cardDiv);
    });
  });
