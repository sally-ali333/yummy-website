import { Details } from "./details-module.js"

export class Home {
  async getHomeMeals() {
    $("#loading").fadeIn(200)
    const response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s`)
    const finalresponse = await response.json()
    document.getElementById("HomeData").innerHTML = this.displayMeals(finalresponse.meals);
    this.getMealID()
    $("#loading").fadeOut(200)
  }

  displayMeals(meals) {
    let box = ``;
    for (let i = 0; i < meals.length; i++) {
      box += `
            <div class="col" data-id="${meals[i].idMeal}">
            <div
              class="maincontent pointer rounded-2 position-relative overflow-hidden"
            >
              <img src="${meals[i].strMealThumb}" alt="home" class="w-100" />
              <div class="layer rounded-2 text-center">
                <h3 class="mt-5 text-center">${meals[i].strMeal}</h3>
              </div>
            </div>
          </div>   `
    }
    return box;
  }

  getMealID() {
    let col = $("#HomeData .col");
    for (let i = 0; i < col.length; i++) {
      col.eq(i).click(() => {
        const id = col.eq(i).attr("data-id")
        $("#home").css("display", "none")
        $("#Details").css("display", "block")
        new Details().getMealDetails(id)
      })
    }
  }
}






