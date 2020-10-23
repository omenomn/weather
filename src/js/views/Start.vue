<template>
	<div>
		<div class="text-center">
			<a
				href="#"
				class="text-white start-headling"
				@click.prevent="
					reloadKey++; 
					$router.push({
						name: 'start',
					})
				">AirApp</a>
		</div>
    <weather-form
    	:key="reloadKey"/>
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
		data() {
			return {
				reloadKey: 0,
			}
		},
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