import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)
axios.defaults.baseURL = 'https://secure-waters-78575.herokuapp.com/api';

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null
  },
  getters: {
    loggedIn(state) {
      return !!state.token;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state, token) {
      state.token = null
    },

  },
  actions: {
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + context.state.token

      return new Promise((resolve, reject) => {
        axios.post('/logout')
          .then(response => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')

            resolve(response.data)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')

            reject(error)
          })
      })
    },
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', {
            username: credentials.username,
            password: credentials.password
          })
          .then(response => {
            const token = response.data.access_token;
            localStorage.setItem('access_token', token)

            context.commit('retrieveToken', token)
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    registration(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/registration', {
            name: credentials.name,
            username: credentials.username,
            password: credentials.password,
            birthday: credentials.birthday
          })
          .then(response => {
            const token = response.data.access_token;
            localStorage.setItem('access_token', token)

            context.commit('retrieveToken', token)
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    checkUsername(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/checkUsername', {
            username: credentials.username
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
  modules: {}
})