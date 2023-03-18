import { Details } from "./details-module.js";
import { Home } from "./home-module.js";

export class Area {

    async getArea() {
        $("#loading").fadeIn(200)
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        const finalresponse = await response.json()
        this.displayArea(finalresponse.meals)
        this.getAreaMealType()
        $("#loading").fadeOut(200)
    }

    displayArea(area) {
        let box = ``;
        for (let i = 0; i < area.length; i++) {
            box += `   <div class="col" data-area="${area[i].strArea}">
            <div class="pointer text-center">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h3>${area[i].strArea}</h3>
            </div>
          </div> `
        }
        document.getElementById("areaData").innerHTML = box;
    }

    getAreaMealType() {
        let col = $("#areaData .col");
        for (let i = 0; i < col.length; i++) {
            col.eq(i).click(() => {
                const area = col.eq(i).attr("data-area")
                document.getElementById("areaData").innerHTML = ``;
                this.getAreaMeals(area)
            })
        }
    }

    async getAreaMeals(areaName) {
        $("#loading").fadeIn(200)
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
        const finalresponse = await response.json()

        document.getElementById("areaData").innerHTML = new Home().displayMeals(finalresponse.meals);
        this.getAreaMealID()
        $("#loading").fadeOut(200)
    }

    getAreaMealID() {
        let col = $("#areaData .col");
        for (let i = 0; i < col.length; i++) {
            col.eq(i).click(() => {
                const id = col.eq(i).attr("data-id")
                $("#area").css("display", "none")
                $("#Details").css("display", "block")
                new Details().getMealDetails(id)
            })
        }
    }
}