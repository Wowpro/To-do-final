<template>
  <form class="form" @submit.prevent="login">
    <h1 class="title">Vue Todos</h1>
    <div v-if="errorMessage" class="errors">{{ errorMessage }}</div>
    <div class="form-group">
      <label for="email">Login name</label>
      <input
        type="email"
        id="email"
        v-model="loginName"
        placeholder="email"
        autocomplete="username"
        required
      >
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        autocomplete="current-password"
        required
      >
    </div>
    <button type="submit" @click="login">
      {{ isWorking ? 'Working ...' : 'LOGIN' }}
    </button>
  </form>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data () {
    return {
      loginName: '',
      password: '',
      errorMessage: '',
      isWorking: false
    }
  },

  methods: {
    login () {
      this.errorMessage = ''
      this.isWorking = true
      axios.post(
        'https://vue-todos.robertmckenney.ca/oauth/token',
        {
          grant_type: 'password',
          client_id: '4',
          client_secret: 'TFM81z7cBJJF9CugkPhzuYi2HedqIyLbgqPh7BDr',
          username: this.loginName,
          password: this.password,
          scope: '*'
        }
      )
        .then(response => {
        // eslint-disable-next-line
          const { expires_in, ...rest } = response.data
          const apiTokens = {
            expires_at: moment().add(expires_in, 'seconds').format(),
            ...rest
          }
          this.$emit('saveApiTokens', apiTokens)
          this.loginName = null
          this.password = null
        })
        .catch(error => this.handleError(error))
        .finally(() => { this.isWorking = false })
    }
  }
}
</script>
<style>
.form-group{
  color:green;
  margin:20px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  border: 10px;
}
</style>
