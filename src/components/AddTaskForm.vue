<template>
  <div>

    <label>Title
      <input type="text" v-model.trim="newTask.title" @keyup.enter="addTask">
    </label>
    <select class="priority" v-model="newTask.priority">
      <option value="high">high</option>
      <option value="medium">medium</option>
      <option value="low">low</option>
      <option value="blank">blank</option>
    </select>
<label>
<input type="text" v-model.trim="newTask.description" @keyup.enter="addTask">
</label>
    <label>
    Due date
      <input type="date" v-model="newTask.dueDate">
    </label>
    <button @click="addTask" class="taskadd">Add Task</button>
    <button @click="sortAscending = !sortAscending" class="sort">Sort</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newTask: {}
    }
  },

  created () {
    this.newTask = this.getNewTask()
  },

  methods: {
    addTask () {
      // this.taskList.push(this.newTask)
      this.$emit('taskAdded', this.newTask)
      this.newTask = this.getNewTask()
    },

    getNewTask () {
      const now = new Date()
      const today = now.toISOString().substr(0, now.toISOString().indexOf('T'))
      console.log(now)
      return {
        id: null,
        category: '',
        dueDate: today,
        isComplete: false,
        priority: 'medium',
        title: '',
        description: ''
      }
    }
  }
}
</script>

<style>
#app{
margin: 0 auto;
padding: 50px;
}

.taskadd{
border-radius: 25px;
    background: #73AD21;
    padding: 7px;
    width: 100px;
    height: 30px;
    border:none;
    }
.priority{
border: none;
}
.sort{
border-radius: 25px;
    background: #73AD21;
    padding: 7px;
    width: 100px;
    height: 30px;
    border:none;
}

</style>
