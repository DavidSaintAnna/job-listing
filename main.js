const $cards = document.querySelector(".cards");
const $modal = document.querySelector(".modal");

const triggerModal = (event) => {
  $modal.setAttribute("style", "display:block");
};

fetch("./data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    jsonData.forEach((item) => {
      const cardDiv = document.createElement("div");

      const firstRow = document.createElement("div");
      const secondRow = document.createElement("div");
      const thirdRow = document.createElement("div");
      const grayLine = document.createElement("div");
      const gridRow = document.createElement("div");
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
      thirdRow.appendChild(document.createTextNode("\u2022"));
      contractData(item.contract);
      thirdRow.appendChild(document.createTextNode("\u2022"));
      contractData(item.location);

      const createTag = (innerText) => {
        const tag = document.createElement("span");
        tag.innerText = innerText;
        tag.addEventListener("click", triggerModal);
        gridRow.appendChild(tag);
      };

      if (item.new && item.featured) {
        cardDiv.classList.add("card");
      } else if (item.new && !item.featured) {
        cardDiv.classList.add("card-only-new");
      } else {
        cardDiv.classList.add("card-not-featured");
      }

      const strong = document.createElement("strong");
      strong.innerText = item.position;
      secondRow.appendChild(strong);

      createTag(item.role);
      createTag(item.level);

      for (
        let i = 0;
        i < Math.max(item.languages.length, item.tools.length);
        i++
      ) {
        if (item.languages[i]) {
          cardDiv.classList.add(`language-${item.languages[i]}`);
          createTag(item.languages[i]);
        }
        if (item.tools[i]) {
          cardDiv.classList.add(`tool-${item.tools[i]}`);
          createTag(item.tools[i]);
        }
      }

      cardDiv.appendChild(firstRow);
      cardDiv.appendChild(secondRow);
      cardDiv.appendChild(thirdRow);
      cardDiv.appendChild(grayLine);
      cardDiv.appendChild(gridRow);

      $cards.appendChild(cardDiv);
    });
  });
