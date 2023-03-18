export class Details {

  async getMealDetails(idMeal) {
    $("#loading").fadeIn(200)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const finalresponse = await response.json();
    this.displayMealDetails(finalresponse.meals[0])
    $("#loading").fadeOut(200)

  }

  displayMealDetails(data) {
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
      }
    }

    if (data.strTags == null) {
      data.strTags = data.strMeal;
    }

    let tags = data.strTags?.split(",")

    let tagsStr = ``
    for (let i = 0; i < tags.length; i++) {
      tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    if (data.strSource == null) {
      data.strSource = data.strYoutube;
    }

    let content = `   <div class="col-md-4">
      <div class="img-container">
        <img
          src="${data.strMealThumb}"
          alt="meal"
          class="w-100 rounded-3"
        />
        <h2>${data.strMeal}</h2>
      </div>
    </div>
    <div class="col-md-8">
      <div class="detail-content">
        <h2>Instructions</h2>
        <p>
        ${data.strInstructions}
        </p>
        <h3><span class="fw-bolder text-info">Area : </span>${data.strArea}</h3>
        <h3><span class="fw-bolder text-info">Category : </span>${data.strCategory}</h3>
        <h3 class="text-info">Recipes :</h3>
        <ul class="p-0 d-flex g-3 flex-wrap">
         ${ingredients}
        </ul>
        <h3 class="text-info">Tags :</h3>
        <ul class="p-0 d-flex g-3 flex-wrap">
        ${tagsStr}
       </ul>
       <a  target="_blank"
          href="${data.strSource}"
          class="btn btn-success m-2"
          >Source</a
        >
        <a
          target="_blank"
          href="${data.strYoutube}"
          class="btn btn-warning m-2"
          >Youtube</a
        >
      </div>
    </div>`

    document.getElementById("detailsData").innerHTML = content;
  }

}