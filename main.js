const $cards = document.querySelector(".cards");

fetch("./data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    jsonData.forEach((item) => {
      const cardDiv = document.createElement("div");

      if (item.new && item.featured) {
        cardDiv.classList.add("card");
      } else if (item.new && !item.featured) {
        cardDiv.classList.add("card-only-new");
      } else {
        cardDiv.classList.add("card-not-featured");
      }

      const positionArray = item.position.split(" ");
      let positionSpans = "";
      positionArray.forEach((word) => {
        positionSpans += `<span><strong>${word}</strong></span> `;
      });
      let gridRowContent = `<span>${item.role}</span><span>${item.level}</span>`;
      for (
        let i = 0;
        i < Math.max(item.languages.length, item.tools.length);
        i++
      ) {
        if (item.languages[i]) {
          gridRowContent += `<span>${item.languages[i]}</span>`;
        }
        if (item.tools[i]) {
          gridRowContent += `<span>${item.tools[i]}</span>`;
        }
      }

      const htmlContent = `
      <div class="first-row">
            <span class="blue-span">${item.company}</span>
           ${item.new ? "<span>NEW!</span>" : ""}
      ${item.featured ? "<span>FEATURED</span>" : ""}
          </div>
          <div class="second-row">
           ${positionSpans}
          </div>
          <div class="third-row">
            <span>${item.postedAt}</span>
            &#8226;
            <span>${item.contract}</span>
            &#8226;
            <span>${item.location}</span>
          </div>
          <div class="bar hide"></div>
          <div class="grid-row">
           ${gridRowContent}
        </div>
      `;

      cardDiv.innerHTML = htmlContent;

      $cards.appendChild(cardDiv);
    });
  });
