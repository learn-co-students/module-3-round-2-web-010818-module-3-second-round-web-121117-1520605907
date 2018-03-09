class App {
  constructor(){
    this.listContainer = document.getElementsByClassName("list-group")[0]
    this.beerInfoContainer = document.getElementById("beer-detail")
  }

  fetchBeers(){
    fetch('http://localhost:3000/beers')
      .then((res)=>res.json())
      .then((json)=>this.listBeers(json))
  }

  listBeers(beerList){
    beerList.forEach((beer) =>{
      let li = document.createElement('li')
      li.innerText = beer.name
      li.setAttribute("class","list-group-item")
      li.addEventListener('click',(event)=>{
        this.beerInfoContainer.innerText = ""
        this.clickBeerListener(beer)
      })
      this.listContainer.appendChild(li)

    })
  }

  clickBeerListener(beerObj){
    console.log(beerObj);
    let h = document.createElement('h1')
    h.innerText = beerObj.name
    this.beerInfoContainer.appendChild(h)

    let img = document.createElement("img")
    img.src = beerObj.image_url
    this.beerInfoContainer.appendChild(img)

    let hhh = document.createElement("h3")
    hhh.innerText = beerObj.tagline
    this.beerInfoContainer.appendChild(hhh)

    let textArea = document.createElement("TEXTAREA")
    textArea.innerText = beerObj.description
    this.beerInfoContainer.appendChild(textArea)

    let button = document.createElement("button")
    button.setAttribute("id","edit-beer")
    button.setAttribute("class","btn btn-info")
    button.innerText = "Save"
    button.addEventListener('click',(event)=>{
      this.editButtonClickEvent(beerObj,event)
    })
    this.beerInfoContainer.appendChild(button)
  }

  editButtonClickEvent(beerObj,event){
    let editSubmission = event.target.previousElementSibling.value;
    let id = beerObj.id
    let options = {
      method:"PATCH",
      headers:{
        'Content-Type': 'application/json',
         Accept: 'application/json'
      },
      body:JSON.stringify({"description":editSubmission})
    }

    fetch(`http://localhost:3000/beers/${id}`,options)
      .then((res)=>res.json())
      .then((json)=>console.log(json))
  }
}
