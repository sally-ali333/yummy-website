
import { Home } from "./home-module.js";
import { Details } from "./details-module.js";

export class SearchNameFLetter {

    async searchByName(value) {
        $("#loading").fadeIn(200)

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
        const finalresponse = await response.json()
        if (value != `` && finalresponse.meals != null) {
            document.getElementById("searchData").innerHTML = new Home().displayMeals(finalresponse.meals);
        } else {
            document.getElementById("searchData").innerHTML = ``
        }
        this.getSearchMealId();

        $("#loading").fadeOut(200)

    }

    async searchByFLetter(value) {
        $("#loading").fadeIn(200)
        if (value != ``) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
            const finalresponse = await response.json()

            if (finalresponse.meals != null) {
                document.getElementById("searchData").innerHTML = new Home().displayMeals(finalresponse.meals);
                this.getSearchMealId();

            } else {
                document.getElementById("searchData").innerHTML = ``;
            }
        } else {
            document.getElementById("searchData").innerHTML = ``;
        }

        $("#loading").fadeOut(200)

    }


    getSearchMealId() {
        let col = $("#searchData .col");
        for (let i = 0; i < col.length; i++) {
            col.eq(i).click(() => {
                const id = col.eq(i).attr("data-id")
                $("#search").css("display", "none")
                $("#Details").css("display", "block")
                new Details().getMealDetails(id)
            })
        }
    }
}