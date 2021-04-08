const app = {};

app.getSet = () =>{
  fetch('https://api.pokemontcg.io/v2/sets')
    .then(function(data){
      return data.json();
    })
    .then(function(jsonData){
      console.log(jsonData.data[0].id);
      app.showSet(jsonData.data);
    });
}

app.showSet = (setData) => {
  const setOptionSelect = document.getElementById('pokemonSet');
  setData.forEach((setData) => {
    const setOptions = document.createElement("option");
    setOptions.value = setData.id
    setOptions.innerHTML = setData.name;
    setOptionSelect.appendChild(setOptions);
  })
}


app.init = () =>{
  app.getSet();
}

app.init();