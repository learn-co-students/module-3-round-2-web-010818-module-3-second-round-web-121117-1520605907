document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded")
  let newApp = new App()
  newApp.fetchBeers()
})

class App {
  constructor() {
  this.beerList = document.getElementById("list-group")
  this.beerDiv = document.getElementById("beer-detail")
  }

  fetchBeers(){
    fetch("http://localhost:3000/beers")
    .then(resp => resp.json())
    .then(beers => this.renderBeers(beers))
  }

  patchBeer(text, id){
    fetch(`http://localhost:3000/beers/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({description: text})
    })
    .then(resp => resp.json())
    .then(json => console.log(json))

  }

  renderBeers(beers){
    // console.log(beers)
    for(let i = 0; i < beers.length; i++){
      let beer = beers[i]
      // console.log(beer)
      let beerLi = document.createElement("li")
      beerLi.setAttribute("class", "list-group-item")
      beerLi.innerText = beer.name
      this.beerList.append(beerLi)

      beerLi.addEventListener("click", () => {
        this.beerDiv.innerHTML = ""
        let beerName = document.createElement("h1")
        beerName.innerText = beer.name
        this.beerDiv.append(beerName)

        let beerImg = document.createElement("img")
        beerImg.setAttribute("src", beer.image_url)
        this.beerDiv.append(beerImg)

        let tagline = document.createElement("h3")
        tagline.innerText = beer.tagline
        this.beerDiv.append(tagline)

        let textArea = document.createElement("textarea")
        textArea.innerText = beer.description
        this.beerDiv.append(textArea)

        let beerButton = document.createElement("button")
        beerButton.setAttribute("id", "edit-beer")
        beerButton.setAttribute("class", "btn btn-info")
        beerButton.innerText = "Save"
        this.beerDiv.append(beerButton)
          // console.log(beer.name)
          beerButton.addEventListener("click", () => {
            let text = textArea.value
            let id = beer.id
            this.patchBeer(text, id)
          })
      })
    }
  }
}
