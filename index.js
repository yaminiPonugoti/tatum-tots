const app = {
    init(selectors) {
      this.flicks = []
      this.max = 0
      this.list = document.querySelector(selectors.listSelector)
  
      document
        .querySelector(selectors.formSelector)
        .addEventListener('submit', ev => {
          ev.preventDefault()
          this.handleSubmit(ev)
        })
    },
  
    renderListItem(flick) {
      const item = this.template.cloneNode(true)
      item.dataset.id = flick.id
      item.querySelector('.flickName') = flick.name
      return item
    },
  
    handleSubmit(ev) {
      const f = ev.target
      const flick = {
        id: ++this.max,
        name: f.flickName.value,
      }
  
      this.flicks.unshift(flick)
  
      const item = this.renderListItem(flick)
      this.list.insertBefore(item, this.list.firstChild)
  
      f.reset()
    },
  }
  
  app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
  })