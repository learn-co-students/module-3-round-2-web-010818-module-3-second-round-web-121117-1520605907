document.addEventListener("DOMContentLoaded", function(){


fetch("http://localhost:3000/beers")
.then(res => res.json())
.then(json => showBeerList(json))

function showBeerList(beerData){
  let beerListDiv = document.getElementById('list-group')

  for(let i = 0; i < beerData.length; i++){
    beerListDiv.innerHTML += `<li id="${beerData[i].id}"class="singleBeer">${beerData[i].name}</li>`

  }
  let beerClicks = document.querySelectorAll(".singleBeer")
  for(let i = 0; i < beerClicks.length; i++){
    beerClicks[i].addEventListener("click", event =>{
      showBeerDetails(event, beerData)
    })
  }
}

function showBeerDetails(event, beerData){
  let beerDetailDiv = document.getElementById("beer-detail")
  let match = beerData.find(item=>{
    return item.id == event.toElement.id
  })
console.log(match)
  // get info from match into beerDetailDiv
  let review = `<form action="index.html" id="beerReview">
  Name: <input type="text" >
  <input type="submit">
</form>`
  beerDetailDiv.innerHTML = `<h1>${match.name}</h1> <img src="${match.image_url}" alt="beer"><h2>${match.description}</h2>${review}`
  reviewPoster(match)
}

function reviewPoster(match){
  let submitReview = document.getElementById("beerReview")
  submitReview.addEventListener("submit", event => {
    event.preventDefault();

let newDescription = event.path[0][0].value
let beerId = match.id
     patchDescription(newDescription, beerId)
  })
}

function patchDescription(newDescription, beerId){
  let options = {
  method: 'PATCH',
  headers:{
    'Content-Type':'application/json',
     Accept: "application/json"
  },
  body:JSON.stringify({
        "description":`${newDescription}`,
        "id":`${beerId}`

    })
  }
fetch(`http://localhost:3000/beers/${beerId}`,options)
 .then((res)=>res.json())
 .then(json => console.log(json))
}



})
