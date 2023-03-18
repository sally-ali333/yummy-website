import { Details } from "./details-module.js";
import { Home } from "./home-module.js";

export class Ingredient {

    async getIngredient() {
        $("#loading").fadeIn(200)
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        const finalresponse = await response.json()
        this.displayIngredient(finalresponse.meals.slice(0, 20))
        this.getIngredientType()
        $("#loading").fadeOut(200)
    }

    displayIngredient(data) {
        let box = ``;
        for (let i = 0; i < data.length; i++) {

            box += `  <div class="col" data-type="${data[i].strIngredient}">
            <div class="pointer text-center">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${data[i].strIngredient}</h3>
              <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
          </div>  `

        }
        document.getElementById("ingredientData").innerHTML = box;
    }

    getIngredientType() {
        let col = $("#ingredientData .col");
        for (let i = 0; i < col.length; i++) {
            col.eq(i).click(() => {
                const type = col.eq(i).attr("data-type")
                document.getElementById("ingredientData").innerHTML = ``;
                this.getIngerdientMeals(type)
            })
        }
    }

    async getIngerdientMeals(ingredientType) {
        $("#loading").fadeIn(200)
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientType}`)
        const finalresponse = await response.json()
        document.getElementById("ingredientData").innerHTML = new Home().displayMeals(finalresponse.meals);
        this.getIngMealID()
        $("#loading").fadeOut(200)
    }

    getIngMealID() {
        let col = $("#ingredientData .col");
        for (let i = 0; i < col.length; i++) {
            col.eq(i).click(() => {
                const id = col.eq(i).attr("data-id")
                $("#ingredient").css("display", "none")
                $("#Details").css("display", "block")
                new Details().getMealDetails(id)
            })
        }
    }
}