const apiKey = "e17d8736d2530500fa57de9f4e20a015";
const appId = "68110ced";
const baseUrl = `https://api.edamam.com/api/recipes/v2`;
const loadingMessage = document.querySelector("#loadingMessage");

const recipeDetailsContainer = document.querySelector(
  "#recipe-details-container"
);

window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");
  console.log(recipeId);
  if (recipeId) {
    const recipeDetails = await fetchRecipeDetails(recipeId);
    console.log(recipeDetails);
  }
});

async function fetchRecipeDetails(id) {
  const url = `${baseUrl}/${id}?type=public&app_id=${appId}&app_key=${apiKey}`;
  loadingMessage.style.display = "block";
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      displayRecipeDetails(data.recipe);
      loadingMessage.style.display = "none";
      return data.recipe;
    } else {
      console.log("No recipe details found.");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

function displayRecipeDetails(recipe) {
  const {
    label: recipeTitle,
    ingredientLines,
    image: recipeImage,
    calories,
    totalTime,
    cuisineType,
    mealType,
  } = recipe;

  const htmlStr = `
    <div class="recipe-details">
      <h2>${recipeTitle}</h2>
      <div id="details-container">
      <div id="images"><img src="${recipeImage}" alt="${recipeTitle}" loading="lazy"></div>
      <div id="details">
      <p><strong>Calories:</strong> ${calories.toFixed(2)}</p>
      <p><strong>Total Time:</strong> ${totalTime} minutes</p>
      <p><strong>Cuisine Type:</strong> ${cuisineType.join(", ")}</p>
      <p><strong>Meal Type:</strong> ${mealType.join(", ")}</p>
      <h3>Ingredients:</h3>
      <ul>
        ${ingredientLines
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}
      </ul>
      </div>
      </div>
      
      
    </div>
  `;

  recipeDetailsContainer.innerHTML = htmlStr;
}
