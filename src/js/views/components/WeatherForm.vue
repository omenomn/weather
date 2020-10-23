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
						});						
          	fetchWeather($event.latlng)
          "
          v-on:query-selected="
          	changeCity($event);
          	fetchWeather($event.latlng)
          ">               
        </algolia-place-field>
        <div class="col-md-4 pl-md-0">
	        <button
	        	type="submit"
	        	class="btn btn-white w-100">Sprawdź</button>
	      </div>
      </row>
    </vue-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				formData: {
					address: this.$route.query.address || ''
				},
				reloadKey: 0,
			}
		},
		computed: {
			weatherApiKey() {
				return this.$store.getters['weatherApiKey']
			},
			algoliaConf() {
				return this.$store.getters['algoliaConf']
			},			
			city() {
				return this.$store.getters['city']
			},
		},
		methods: {
			fetchWeather(latlng) {
				this.$store.dispatch('fetchWeather', latlng)
			},
			changeCity($event) {		
      	this.$store.commit('setCity', $event)
			},
			submit() {
				this.fetchWeather(this.city.latlng)
			}
		},
	}
</script>