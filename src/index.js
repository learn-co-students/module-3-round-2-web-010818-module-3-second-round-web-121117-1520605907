document.addEventListener("DOMContentLoaded", function() {
  const listGroup = document.getElementById("list-group")
  const beerDetail = document.getElementById("beer-detail")
  // const textArea = document.getElementById("textarea")
  // const editBeer = document.getElementById("edit-beer")

  fetchBeers()

  function fetchBeers() {
    fetch("http://localhost:3000/beers")
      .then(res => res.json())
      .then(json => displayBeer(json))
  }

  function displayBeer(json) {
    for (let i = 0; i < json.length; i++) {
      const li = document.createElement("li")
      li.setAttribute("class", "list-group-item")
      li.setAttribute("id", json[i].id)
      li.innerText = json[i].name
      listGroup.appendChild(li)
      li.addEventListener("click", event => {
        event.preventDefault()
        fetch("http://localhost:3000/beers")
          .then(res => res.json())
          .then(json2 => beerClick(event, json2))
        // beerClick(event, json)
      })
    }
  }

  function beerClick(event, json2) {
    console.log(json2)
    const beerId = event.target.id
    beerDetail.innerHTML = ""
    const name = json2[beerId - 1].name
    const img = json2[beerId - 1].image_url
    const tagline = json2[beerId - 1].tagline
    const desc = json2[beerId - 1].description
    beerDetail.innerHTML =
      `<h1>${name}</h1>
    <img src="${img}">
    <h3>${tagline}</h3>
    <textarea id="textarea">${desc}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>`
    const editBeer = document.getElementById("edit-beer")
    const textArea = document.getElementById("textarea")
    editBeer.addEventListener("click", event => {
      event.preventDefault()
      patchDesc(event, textArea, beerId)
      displayBeer(json2)
    })
  }

  function patchDesc(event, textArea, beerId) {
    descValue = textArea.value
    descId = beerId
    const options = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        description: descValue
      })
    }
    fetch(`http://localhost:3000/beers/${descId}`, options)
      .then(res => res.json())
      .then(json => persist(json, descValue, textArea))


  }

  function persist(json, event) {
    console.log(json.description)
    fetchBeers()
  }
})