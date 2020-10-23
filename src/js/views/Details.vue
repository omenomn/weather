<template>
	<div>
		<router-link
			:to="{
				name:'start',
				query: {
					address: $route.query.address
				}
			}" 
			class="text-white back-link">AirApp
		</router-link>
		<div class="card text-white py-4 mb-5">
			<div class="row">
				<div class="col-md-6">
	  			<h4 class="my-0 text-center">
	  				<span>Data:</span> 
	  				<span class="text-lighter ml-1">{{now}}</span>
	  			</h4>
	  		</div>
				<div class="col-md-6">
	  			<h4 class="my-0 text-center">
	  				<span>Lokalizacja:</span> 
	  				<span class="text-lighter ml-1">{{city.name}}, <span class="uppercase">{{city.countryCode}}</span></span>
	  			</h4>
	  		</div>
			</div>
		</div>
		<table class="table text-center">
		  <tr>
		    <th>Godzina</th>
		    <th>Temperatura</th>
		    <th>Opis</th>
		  </tr>
		  <tr v-for="item in forecast.list.slice(0,5)">
		    <td>{{getHour(item.dt_txt)}}</td>
		    <td>{{item.main.temp}}<span>&#176;</span> C</td>
		    <td>{{item.weather[0].description}}</td>
		  </tr>
		</table>
	</div>
</template>
<script>

	export default {
		computed: {			
			now() {
				return moment().format("DD.MM.YYYY");
			},
			forecast() {
				return this.$store.getters['forecast']
			},
			city() {
				return this.$store.getters['city']
			},
		},
		methods: {
			getHour(datetime) {
				return moment(datetime).format('HH:mm')
			}
		},
		async mounted() {
			await this.$store.dispatch('search', this.$route.query.address)
			this.$store.dispatch('fetchForecast', this.city.latlng)
		}
	}
</script>