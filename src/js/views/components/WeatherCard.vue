<template>
  <div 
  	class="card text-white">
  	<div class="row">
  		<div class="col-md-5 d-flex align-items-center justify-content-center">
  			<h1 class="temperature">{{weather.main.temp}}<span>&#176;</span> C</h1>
  		</div>
  		<div class="col-md-7">
  			<h4 class="my-2">
  				<span>Data:</span> 
  				<span class="text-lighter ml-1">{{now}}</span>
  			</h4>
  			<h4 class="my-2">
  				<span>Lokalizacja:</span> 
  				<span class="text-lighter ml-1">{{city.name}}, <span class="uppercase">{{city.countryCode}}</span></span>
  			</h4>
  			<h4 class="my-2">
  				<span>Opis:</span> 
  				<span class="text-lighter ml-1">{{weather.weather[0].description}}</span>
  			</h4>  			
  		</div>
  	</div>
    <div class="row">
      <div class="col-md-12 text-right">        
        <router-link
          class="more-link uppercase"
          :to="{
            name: 'details',
            query: {
              address: $route.query.address || city.query
            }
          }">Więcej</router-link>
      </div>
    </div>
  </div>
</template>
<script>
	export default {
		props: ['weather', 'city'],
		computed: {
			now() {
				return moment().format("DD.MM.YYYY");
			}
		}
	}
</script>