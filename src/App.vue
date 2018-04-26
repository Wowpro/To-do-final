<template>
  <div id="app">
    <div v-if="isLoggedIn">
    <!-- We need some navigation links to switch between views -->
      <h1 class="title">Vue Todos</h1>
    <nav>
      <ul>
        <!--
          The RouterLink component comes with VueRouter.
          The 'to' prop is the URL route.
        -->
        <li><router-link to="/">All</router-link></li>
        <li class="Active"><router-link to="/active">Active</router-link></li>
        <li><router-link to="/completed">Completed</router-link></li>
      </ul>
    </nav>

    <add-task-form @taskAdded="addTask" />
    <!--
      The RouterView is a placeholder that VueRouter uses to know
      where to insert the designated component for a given URL.
      In this case we are passing our taskList as a prop to each route's
      component and we are listening for user events.  This way we are still
      only mainting one master list in the App.vue component.
     -->
    <router-view
      :tasks="taskList"
      @toggleDone="toggleDone"
      @removeTask="removeTask"
    />
  </div>
  <login-page v-else @saveApiTokens="saveApiTokens" />
    <button @click="logout">LOGOUT</button>
  </div>
</template>

<script>
import axios from 'axios'
import LoginPage from '@/pages/LoginPage'
import AddTaskForm from '@/components/AddTaskForm'
import moment from 'moment'

export default {
  name: 'App',
  components: { LoginPage, AddTaskForm },

  data () {
    return {
      taskList: [
        // { id: 1234, title: 'Learn Vue', isComplete: true, priority: 'medium' },
        // { id: 1235, title: 'Learn Vue Router', isComplete: false, priority: 'medium' },
        // { id: 1236, title: 'Learn Vuex', isComplete: false, priority: 'medium' },
        // { id: 1237, title: 'Learn Vue DevTools', isComplete: true, priority: 'medium', description: '' }
      ],
      baseURL: 'https://vue-todos.robertmckenney.ca/api',
      api: {
        accessToken: null,
        expiresAt: null
      }
     }
    },

  created () {
    this.taskList = JSON.parse(localStorage.getItem('taskList')) || []
    console.log(this.taskList)
    this.loadInitialData()
  },

  methods: {
    saveApiTokens (apiTokens) {
  this.api.accessToken = apiTokens.access_token
  this.api.expiresAt = apiTokens.expires_at
  localStorage.setItem('todoApiTokens', JSON.stringify(apiTokens))
  this.refreshTasks()
},
    refreshTasks () {
          axios
        .get('/todos', this.axiosOptions)
        .then(response => { this.taskList = response.data.data })
        .catch(error => { this.handleError(error) })
    },
    addTask (task) {
      axios
        .post('/todos', task, this.axiosOptions)
        .then(response => { this.taskList.push(response.data.data) })
        .catch(error => { this.handleError(error) })
    },
    toggleDone (task) {
      task.isComplete = !task.isComplete
      axios
        .put(`/todos/${task.id}`, task, this.axiosOptions)
        .catch(error => { this.handleError(error) })
    },
    removeTask (task) {
      axios
        .delete(`/todos/${task.id}`, this.axiosOptions)
        .then(response => {
          const taskIndex = this.taskList.findIndex(t => t.id === task.id)
          this.taskList.splice(taskIndex, 1)
        })
        .catch(error => { this.handleError(error) })
    },
    handleError (error) {
      console.log(error)
      // obviously we want to do something more robust
      // including notifying the user somehow.
    },
    logout () {
      this.api.accessToken = null
      this.api.expiresAt = null
      localStorage.removeItem('todoApiTokens')
    },
    loadInitialData () {
      const apiTokens = JSON.parse(localStorage.getItem('todoApiTokens'))
      if (apiTokens) {
        this.api.accessToken = apiTokens.access_token
        this.api.expiresAt = apiTokens.expires_at
        if (this.isLoggedIn) this.refreshTasks()
      }
    }
  }
// ...

computed: {
  isLoggedIn () {
    return this.api.accessToken && moment(this.api.expiresAt).isAfter()
  },
     axiosOptions () {
      return {
        baseURL: this.baseURL,
        headers: { 'Authorization': `Bearer ${this.api.accessToken}` }
      }
    }
   }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  max-width: 550px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
nav ul {
  display: flex;
  justify-content: flex-start;
}
nav ul li {
margin:0 auto;
  margin-right: 1em;
  border-radius: 70%;
  border: 2px;
  padding-top: 20px;
  padding-bottom:20px;
}
.title{
margin:0 auto;
border-radius: 25px;
   background: #73AD21;
   padding: 12px;
   padding-left:20px;
   padding-right:20px;
   width: 200px;
   height: 40px;

}

.router-link-exact-active-router-link-active{
color:blue;
}
</style>
