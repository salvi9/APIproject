const apiKey = "e17d8736d2530500fa57de9f4e20a015";
const appId = "68110ced";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${apiKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const userSearch = document.querySelector("#userSearch");
const btnSearch = document.querySelector(".searchButton");

btnSearch.addEventListener("click", (e) => {
  const userValue = userSearch.value;
  renderRecipe(userValue);
});

function renderRecipe(type = "beef") {
  const url = baseUrl + `&q=${type}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      loadRecipes(data.hits);
    })
    .catch((error) => console.log(error));
}

renderRecipe();

const loadRecipes = (recipeList = []) => {
  recipeContainer.innerHTML = "";
  recipeList.forEach((recipeObj) => {
    const {
      label: recipeTitle,
      ingredientLines,
      image: recipeImage,
      uri: recipeUri,
    } = recipeObj.recipe;

    const recipeId = encodeURIComponent(recipeUri.split("#recipe_")[1]);

    const htmlStr = `
      <div class="recipe">
        <div class="title-container">
          <a href="/APIproject/details.html?id=${recipeId}">
            <div class="recipe-img">
              <img src=${recipeImage}>
            </div>
            <div class="recipe-title"><h4>${recipeTitle}</h4></div>
          </a>
        </div>
      </div>
    `;
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
  });
};

{
  /* <div class="recipe-text">
                <ul>
                    ${ingredientLines
                      .map(
                        (ingredient) =>
                          `<li  class="list-style">${ingredient}</li>`
                      )
                      .join("")}
                </ul>
            </div> */
}
