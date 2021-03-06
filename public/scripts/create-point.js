//Consulta API
function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
  .then( res => res.json() )
  .then( states => {

    for( state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

    }


  })
}
populateUfs()

function getCities(event) {
  const citySelect =document.querySelector("[name=city]")
  const stateInput =document.querySelector("[name=state]")
  
  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value =event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/microrregioes`
  

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
  .then( res => res.json() )
  .then( cities => {



    for( const city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
    
    citySelect.disabled = false
  })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)



  //Itens de Coleta
  //pegar todos os li's

  const itemsToCollect = document.querySelectorAll(".items-grid li")

  for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
  }


  const collectedItems = document.querySelector("input[name=items")

  let selectedItems = []

  function handleSelectedItem(event) {
    const itemLi = event.target
    
    //adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    
    //verificar se existem itens selecionados, se sim 
    //pegar itens selecionados
    
    const alreadySelected = selectedItems.findIndex( item => { 
      const itemFound = item == itemId  //true or false
      return itemFound
    })

    //se ja estiver selecionado, remover seleção

    if(alreadySelected >= 0){
      //remover seleção
      const filteredItems = selectedItems.filter( item => {
        const itemIsDifferent = item != itemId  
        return itemIsDifferent
      })

      selectedItems = filteredItems
    } else{
      //se não, 
      //adicionar a seleção 
      selectedItems.push(itemId)
    }
    //atualizar o campo escondido com os itens selecionados 
    collectedItems.value = selectedItems

  }