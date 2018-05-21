class App{
    constructor(selectors) {
      this.flicks = []
      this.max = 0
      this.list = document.querySelector(selectors.listSelector)
      this.template = document.querySelector(selectors.templateSelector)
  
      document
        .querySelector(selectors.formSelector)
        .addEventListener('submit', ev => {
          ev.preventDefault()
          this.handleSubmit(ev)
        })
    }
  
    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flickName')
            .textContent = flick.name
        item
            .querySelector('.delete.button')
            .addEventListener('click',this.deleteFlick.bind(this,item,flick))
        item
            .querySelector('.fav.button')
            .addEventListener('click',this.favFlick.bind(this,item,flick))
        item
            .querySelector('.button.info')
            .addEventListener('click',this.moveFlickUp.bind(this,flick))
        item
            .querySelector('.button.move-down')
            .addEventListener('click',this.moveFlickDown.bind(this,flick))
        return item
    }

    moveFlickUp(flick,ev){
        const itemInList = ev.target.closest('.flick')
        const index = this.flicks.findIndex((currentFlick, i) => {
            return currentFlick.id === flick.id
        })
        if(index>=0){
            this.list.insertBefore(itemInList,itemInList.previousElementSibling)
            const oldFlick = this.flicks[index-1]
            this.flicks[index-1]=flick
            this.flicks[index]=oldFlick
            console.log(this.flicks)
        }
    }

    moveFlickDown(flick,ev){
        const itemInList = ev.target.closest('.flick')
        const index = this.flicks.findIndex((currentFlick, i) => {
            return currentFlick.id === flick.id
        })
        if(index<this.flicks.length -1){
            this.list.insertBefore(itemInList.nextElementSibling, itemInList)
            const nextFlick = this.flicks[index+1]
            this.flicks[index+1] = flick
            this.flicks[index] = nextFlick
        }
    }

    deleteFlick(item,flick,ev){
        item.remove() //remove from the DOM
        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i,1)
        // const itemInList = ev.target.closest('.flick')
        // itemInList.remove()
        // for(let i = 0; i < this.flicks.length; i++) {
            // if(itemInList.dataset.id === this.flicks[i].id.toString()) {
                // this.flicks.splice(i, 1) //break
            // }
        // }
    }

    favFlick(item,flick,ev){
        flick.fav = item.classList.toggle('fav')
        // const listItem = ev.target.closest('.flick')
        // if(!flick.fav){
        //     listItem.classList.add('fav')
        // }
        // else{
        //     listItem.classList.remove('fav')
        // }
        // flick.fav = !flick.fav
    }
  
    handleSubmit(ev) {
      const f = ev.target
      const flick = {
        id: ++this.max,
        name: f.flickName.value,
        fav: false,
      }
  
      this.flicks.unshift(flick)
  
      const item = this.renderListItem(flick)
      this.list.insertBefore(item, this.list.firstElementChild)
  
      f.reset()
    }
  }
  
  const app = new App({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
  })