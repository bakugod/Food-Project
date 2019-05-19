Vue.component('todo-container', {
  template: '<div class="todo-container"><slot></slot></div>',
  props: ['data']
});

Vue.component('todo-item', {
  template: `
<div class="z-depth-3 todo-item">
  <div class="content lmdd-block">
    <i class="material-icons handle">drag</i>
    <div class="task">{{data}}</div>
  </div>
</div>
`,
  props: ['data']
})

const vueExample = new Vue({
  el: '#vue-example',
  data: () =>({
    url        : "http://localhost:8080/meal",
    food: {
      regular  : [],
      priority : []
    }
  }),
  async mounted() {
    const response = await fetch(this.url);
    const json     = await response.json();

    this.food.regular = json.map(item => ({
      name: item.name,
      calories: item.calories
    }))

    lmdd.set(document.getElementById('drag-scope'), {
      containerClass: 'todo-container',
      draggableItemClass: 'todo-item',
      handleClass: 'handle',
      dataMode: true
    });
    this.$el.addEventListener('lmddend', this.handleDragEvent);
  },
  methods: {
    handleDragEvent(event) {
      const newIndex = event.detail.to.index;
      const oldIndex = event.detail.from.index;
      const newContainer = event.detail.to.container.__vue__.data;
      const oldContainer = event.detail.from.container.__vue__.data;
      if (event.detail.dragType === 'move') {
        newContainer.splice(newIndex, 0, oldContainer.splice(oldIndex, 1)[0]);
        fetch('http://localhost:8080/notes', {
          method  : 'POST',
          body    : JSON.stringify(this.food.priority),
          headers :{
            'content-type': 'application/json'
          }
        })
          .then(response => console.log(response))
      }
      }
    }
})