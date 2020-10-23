import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  city: {
    name: null,
    latlng: null,
    countryCode: null,
    query: null,
  },
  weather: null,
  forecast: {
    list: []
  },
};

const getters = {
  city(state) {
    return state.city
  },
  weather(state) {
    return state.weather
  },
  forecast(state) {
    return state.forecast
  },
  weatherApiKey() {
    return '61e9ad1a5d1a5a9f7fde814aec8d8a0e'
  },
  algoliaConf() {
    return {
      appId: 'plDZPNKU2ZHY',
      apiKey: '4c61ef1a485c5e137087f5c98803d3ca',
    }
  }
};

const actions = {
  async fetch({commit, getters}, payload) {    
    var url = 'http://api.openweathermap.org/data/2.5/'
    url += payload.type
    url += '?'
    url += 'lat='+payload.latlng.lat
    url += '&lon='+payload.latlng.lng
    url += '&lang=pl'
    url += '&units=metric'
    url += '&appid='+getters.weatherApiKey

    var response = await axios.get(url)

    return response.data
  },
  async fetchWeather({commit, getters, dispatch}, latlng) {    
    var weather = await dispatch('fetch', {
      type: 'weather',
      latlng
    })
    
    commit('setWeather', weather)
  },
  async fetchForecast({commit, getters, dispatch}, latlng) {    
    var forecast = await dispatch('fetch', {
      type: 'forecast',
      latlng
    })
    
    commit('setForecast', forecast)
  },
  async search({commit, getters}, query) {

      var conf = getters.algoliaConf
      var placesClient = algoliasearch.initPlaces(
        conf.appId,
        conf.apiKey
      );

      var results = await placesClient.search({
        query: query,
        aroundLatLngViaIP: true,
        type: 'city',
        hitsPerPage: 1,
        language: 'pl',
      })

      var hits = results.hits;
      
      if (!hits[0]) {
        return;
      }

      var hit = hits[0]

      commit('setSearchCity', hit)
  }
};

const mutations = {
  setWeather(state, weather) {
    state.weather = weather
  },
  setForecast(state, forecast) {
    state.forecast = forecast
  },
  setCity(state, city) {
    state.city.name = city.name
    state.city.latlng = city.latlng;
    state.city.countryCode = city.countryCode;
    state.city.query = city.value;
  },
  setSearchCity(state, city) {
    state.city.name = city.county[0]
    state.city.latlng = city._geoloc;
    state.city.countryCode = city.country_code;
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})