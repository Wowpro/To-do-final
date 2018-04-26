
<template>
  <div>
    <h2>{{listTitle}}</h2>
    <div class="toolbar">
      <label for="priority-filter">Show priority</label>
      <select name="priority-filter" id="priority-filter" v-model="selectedPriority">
        <option value="">all</option>
        <option
          v-for="option in priorityOptions"
          :value="option.id"
          :key="option.id">{{option.name}}</option>
      </select>
    </div>
    <ul class="task-list">
      <li v-for="task in sortedTasks" :key="task.id" class="task-item">
        <span class="far"
          :class="{
            'fa-circle': ! task.isComplete,
            'fa-check-circle': task.isComplete
          }"
          @click="toggleDone(task)"></span>
        <span>{{ task.title }}</span>
        <span>{{ task.priority }}</span>
        <span class="far fa-trash-alt" @click="removeTask(task)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // We are not actually managing the task list in this component.
  // We are only displaying the list. The parent component (App.vue) is
  // passing down a reference to the list in the 'tasks' prop.
  props: ['tasks', 'listTitle'],
  data () {
    return {
      priorityOptions: [
        { id: 1, order: 1, name: 'low' },
        { id: 2, order: 2, name: 'medium' },
        { id: 3, order: 3, name: 'high' }
      ],
      categoryOptions: [
        { id: 1, order: 1, name: 'home' },
        { id: 2, order: 2, name: 'work' },
        { id: 3, order: 3, name: 'school' }
      ],
      selectedPriority: '',
      selectedCategory: '',
      sortAscending: true
    }
  },
  computed: {
    filteredPriorityTasks () {
      // If the selectedFilter is 'all', the value is set to an empty string
      // which will evaluate to false. In that case, we will reuturn the
      // entire task list. Otherwise we use the array.filter() method to return
      // only the tasks with the selected priority.
      return (!this.selectedPriority)
        ? this.tasks
        : this.tasks.filter(task => task.priority.id === this.selectedPriority)
    },
    filteredCategoryTasks () {
      return (!this.selectedCategory)
        ? this.tasks
        : this.tasks.filter(task => task.category.id === this.selectedCategory)
    },
    filteredTasks () {
      return [ ...new Set([
        ...this.filteredPriorityTasks,
        ...this.filteredCategoryTasks
      ])].filter(task =>
        this.filteredPriorityTasks.includes(task) &&
      this.filteredCategoryTasks.includes(task)
      )
    },
    sortedTasks () {
      let tempList = [...this.filteredTasks]
      return tempList.sort((a, b) => {
        const dateOne = new Date(a.dueAt)
        const dateTwo = new Date(b.dueAt)
        return this.sortAscending ? (dateOne - dateTwo) : (dateTwo - dateOne)
      })
    }
  },
  methods: {
    // Since this component does not own the task list data, we need to
    // notify the parent component that the user wants to toggle the
    // completion status of the task.  We do that by emitting a custom event,
    // and passing up the affected task with the event. We will listen for
    // this event in the parent component and call the appropriate method to
    // make the change to the data.
    toggleDone (task) {
      this.$emit('toggleDone', task)
    },
    removeTask (task) {
      this.$emit('removeTask', task)
    }
  }
}
</script>

<style>
/* We will add styles here later. */
.task-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-gap: 1rem;
  align-items: center;
}
.toolbar {
  margin-bottom: 1rem;
}
</style>
