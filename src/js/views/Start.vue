<template>
	<div>
		<h1 class="text-white start-headling">AirApp</h1>
    <weather-form/>
    <weather-card
    	v-if="weather && city"
    	:weather="weather"
    	:city="city"/>
	</div>
</template>
<script>
	import WeatherCard from './components/WeatherCard'
	import WeatherForm from './components/WeatherForm'

	export default {
		components: {WeatherCard, WeatherForm},
		computed: {
			weather() {
				return this.$store.getters['weather']
			},
			city() {
				return this.$store.getters['city']
			},
		}
	}
</script>