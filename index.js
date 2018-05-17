const app = {
    init: function(selectors){
        this.max=0
        this.list = document.querySelector(selectors.listSelector)
        this.flicks=[]

        document
           .querySelector(selectors.formSelector)
           .addEventListener('submit',(ev)=>{
                ev.preventDefault()
                this.handleSubmit(ev)
           })
           //OR CAN DO THIS: .addEventListener('submit', this.handleSubmit.bind(this))
    },

    renderListItem(flick){
        const item = document.createElement('li')
        item.dataset.id = flick.id
        item.textContent = flick.name
        return item
    },

    handleSubmit(ev){
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
        }
        this.flicks.unshift(flick)
        const item = this.renderListItem(flick)
        this.list.insertBefore(item,this.list.firstChild)
        f.reset()
    },
}
app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
})