<template>
	<div>
    <vue-form 
      v-model="formData"
      :submit-class="['btn-block']"
      :no-submit="true"
      :custom-submit="submit"
      >
      <row>
        <algolia-place-field
        	:no-label="true"
          name="address"
          label="Address"
          :class="['col-md-8']"
          :search-type="['city']"
          :conf="algoliaConf"
          v-on:selected="
          	changeCity($event);
          	$router.push({
							name: 'start',
							query: {
								address: $event.value
							}
						})
          "
          v-on:query-selected="
          	changeCity($event);
          ">               
        </algolia-place-field>
        <div class="col-md-4 pl-md-0">
	        <button
	        	type="submit"
	        	class="btn btn-white w-100">Sprawdź</button>
	      </div>
      </row>
    </vue-form>
    <weather-card
    	v-if="weather && city"
    	:weather="weather"
    	:city="city"/>
	</div>
</template>
<script>
	import axios from 'axios'
	import WeatherCard from './components/WeatherCard'

	export default {
		components: {WeatherCard},
		data() {
			return {
				formData: {
					address: this.$route.query.address || ''
				},
				city: {
					name: null,
					latlng: null,
					countryCode: null,
					query: null,
				},
				weather: null,
			}
		},
		watch: {
			'city.name': function(name) {
				if (name) {
					this.fetchWeather(this.city.latlng)
				}
			}
		},
		computed: {
			weatherApiKey() {
				return '2c49b6f2a0f09a52499c0c271c6cf44c'
			},
			algoliaConf() {
				return {
	        appId: 'plDZPNKU2ZHY',
	        apiKey: '4c61ef1a485c5e137087f5c98803d3ca',
	      }
			}
		},
		methods: {
			async fetchWeather(latlng) {
				var url = 'http://api.openweathermap.org/data/2.5/weather?'
				url += 'lat='+latlng.lat
				url += '&lon='+latlng.lng
				url += '&lang=pl'
				url += '&units=metric'
				url += '&appid='+this.weatherApiKey

				var response = await axios.get(url)
				this.weather = response.data
			},
			changeCity($event) {				
      	this.city.name = $event.name;
      	this.city.latlng = $event.latlng;
      	this.city.countryCode = $event.countryCode;
      	this.city.query = $event.value;
			},
			submit(formData) {
				this.fetchWeather(this.city.latlng)
			}
		},
		mounted() {
		}
	}
</script>