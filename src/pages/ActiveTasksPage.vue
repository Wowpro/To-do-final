
<template>
<section>
  <template v-if="activeTaskList.length > 0">
      <TaskList
        listTitle="Active Tasks"
        :tasks="activeTaskList"
        @toggleDone="toggleDone"
        @removeTask="removeTask"
      />
    </template>
  <p class="para" v-else>There are no active tasks ... Feeling lazy?</p>
</section>
</template>

<script>
// We will use this reusable component to minimize duplicating layout markup.
import TaskList from '@/components/TaskList'

export default {
  props: ['tasks'],
  components: {TaskList},
  computed: {
    activeTaskList () {
      return this.tasks.filter(task => !task.isComplete)
      // The longer ES5 syntax way to write that would be:
      // return this.tasks.filter(function (task) {
      //   return !task.isComplete
      // })
    }
  },
  methods: {
    // We will simply pass these events up to the parent App.vue component,
    // since that is where we are storing the master list.
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
.para{

}
</style>
