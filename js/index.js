
import { Home } from "./home-module.js";
import { Catagory } from "./catagory-module.js";
import { Area } from "./area-module.js";
import { Ingredient } from "./ingredient-module.js";
import { SearchNameFLetter } from "./search-module.js";
import { Contact } from "./contact-module.js";

$("document").ready(function () {
    $("#loading").fadeOut(300);
    $("body").css("overflow", "auto")
})


let widthMenu = $("aside .menu").innerWidth();
let menuLinks = $(".menu li")

$("aside").css("left", -widthMenu)


function openMenu() {
    $("aside").animate({ left: '0px' }, 700, function () {
        $("#menuIcon").css("display", "none")
        $("#closeIcon").css("display", "block")
        for (let i = 0; i < menuLinks.length; i++) {
            menuLinks.eq(i).animate({ top: 0 }, (i + 2) * 100).click(function (e) {
                let idtarget = $(e.target).attr("data-link"); //search 
                openSection(idtarget)
            })
        }
    })
}


function openSection(idName) {
    let section = $("body section");
    for (let i = 0; i < section.length; i++) {
        if (section.eq(i).attr("id") == idName) {
            section.css("display", "none")
            $("#Details").css("display", "none")
            section.eq(i).css("display", "block")
            closeMenu()
        }
    }
}

function closeMenu() {
    $("aside").animate({ left: -widthMenu }, 700, function () {
        $("#menuIcon").css("display", "block")
        $("#closeIcon").css("display", "none")
        menuLinks.css("top", "250px")
    });
}

$("#menuIcon").click(openMenu)

$("#closeIcon").click(closeMenu)


new Home().getHomeMeals()

$("li[data-link = 'catagory']").click(() => {
    new Catagory().getCatagory()
})

$("li[data-link = 'area']").click(() => {
    new Area().getArea()
})

$("li[data-link = 'ingredient']").click(() => {
    new Ingredient().getIngredient()
})


$("li[data-link = 'search']").click(() => {
    $("#searchName").val('')
    $("#searchFLetter").val('')
    document.getElementById("searchData").innerHTML = ``;
})


$("#searchName").keyup((e) => {
    new SearchNameFLetter().searchByName(e.target.value)
})

$("#searchFLetter").keyup((e) => {
    new SearchNameFLetter().searchByFLetter(e.target.value)
})

$("li[data-link = 'contact']").click(() => {
    $("#contact input").val('')
})

$("#contact input").focus(() => {
    new Contact().Validation()
})


















