const app = {};

app.getSet = () =>{
  fetch('https://api.pokemontcg.io/v2/sets')
    .then(function(data){
      return data.json();
    })
    .then(function(jsonData){
      console.log(jsonData);
      app.showSet(jsonData.data);
      
    });
}

app.showSet = (setData) => {
  const setOptionSelect = document.getElementById('inputs__Set');
  setData.forEach((setData) => {
    const setOptions = document.createElement("option");
    setOptions.value = setData.id
    setOptions.innerHTML = setData.name;
    setOptionSelect.appendChild(setOptions);
  })

  setOptionSelect.addEventListener('change', function() {
      // console.log(this.value);
      app.getCards(this.value); 
  });
}

app.getCards = (setValue) =>{
  fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setValue}`)
    .then(function(data){
      return data.json();
    })
    .then(function(jsonData){
      // console.log(jsonData.data);
      app.displayCards(jsonData.data);
    });
}

app.displayCards = (cardInfo) => {
  console.log(cardInfo);
  const cardContainer = document.getElementById('card__container');
  const showBtn = document.getElementById('input__button');
  for (let i =0 ; i < 10 ; i++){
    let randomCard = Math.floor(Math.random() * cardInfo.length)
    const image = document.createElement('img');
    image.src = cardInfo[randomCard].images.small;
    cardContainer.style.display ='none';
    cardContainer.appendChild(image);
  }
  showBtn.addEventListener('click', () =>{
    cardContainer.style.display ='block';
  })

}


app.init = () =>{
  app.getSet();
}

app.init();