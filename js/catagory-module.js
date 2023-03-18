import { Details } from "./details-module.js"
import { Home } from "./home-module.js"


export class Catagory {
  async getCatagory() {
    $("#loading").fadeIn(200)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const finalresponse = await response.json()
    this.displayCatagory(finalresponse.categories)
    this.getCatagoryMealsType()
    $("#loading").fadeOut(200)
  }

  displayCatagory(meals) {
    let box = ``;
    for (let i = 0; i < meals.length; i++) {
      box += ` <div class="col" data-cat='${meals[i].strCategory}'>
            <div
              class="maincontent pointer rounded-2 position-relative overflow-hidden"
            >
              <img src="${meals[i].strCategoryThumb}" alt="catagory" class="w-100" />
              <div class="layer rounded-2 text-center">
                <h3>${meals[i].strCategory}</h3>
                <p>${meals[i].strCategoryDescription}
                </p>
              </div>
            </div>
          </div>
                 `
    }
    document.getElementById("catagoryData").innerHTML = box;
  }

  getCatagoryMealsType() {
    let col = $("#catagoryData .col");
    for (let i = 0; i < col.length; i++) {
      col.eq(i).click(() => {
        const catagory = col.eq(i).attr("data-cat")
        document.getElementById("catagoryData").innerHTML = ``;
        this.getCatagoryMeals(catagory)
      })
    }
  }

  async getCatagoryMeals(catagorytype) {
    $("#loading").fadeIn(200)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catagorytype}`)
    const finalresponse = await response.json()
    document.getElementById("catagoryData").innerHTML = new Home().displayMeals(finalresponse.meals);
    this.getcatMealID()
    $("#loading").fadeOut(200)
  }

  getcatMealID() {
    let col = $("#catagoryData .col");
    for (let i = 0; i < col.length; i++) {
      col.eq(i).click(() => {
        const id = col.eq(i).attr("data-id")
        $("#catagory").css("display", "none")
        $("#Details").css("display", "block")
        new Details().getMealDetails(id)
      })
    }
  }

}