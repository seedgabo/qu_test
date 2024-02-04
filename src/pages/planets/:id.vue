<!-- Planets.vue -->
<template>
 <v-container class="fill-height">
    <v-responsive class="align-top fill-height">
      <v-card v-if="planet">
         <v-card-title>{{ planet.name }}</v-card-title>
         <v-card-text>
            <v-row>
                <v-col cols="12" md="6">
                    <img :src="getPictureFromPlanet(planet)"  style="width: 100%; height: auto;"  @error="handleImageError" />
                </v-col>
                <v-col cols="12" md="6">
                    <v-row>
                      <v-col cols="12">
                          <v-card-title>Details</v-card-title>
                      </v-col>
                      <v-col cols="12">
                          <v-row>
                            <v-col cols="12">
                                <v-card-subtitle>Climate</v-card-subtitle>
                                <v-card-text>{{ planet.climate }}</v-card-text>
                            </v-col>
                            <v-col cols="12">
                                <v-card-subtitle>Gravity</v-card-subtitle>
                                <v-card-text>{{ planet.gravity }}</v-card-text>
                            </v-col>
                            <v-col cols="12">
                                <v-card-subtitle>Orbital Period</v-card-subtitle>
                                <v-card-text>{{ planet.orbital_period }}</v-card-text>
                            </v-col>
                            <v-col cols="12">
                                <v-card-subtitle>Population</v-card-subtitle>
                                <v-card-text>{{ planet.population }}</v-card-text>
                            </v-col>
                            <v-col cols="12">
                                <v-card-subtitle>Rotation Period</v-card-subtitle>
                                <v-card-text>{{ planet.rotation_period }}</v-card-text>
                            </v-col>
                            <v-col cols="12">
                                <v-card-subtitle>Surface Water</v-card-subtitle>
                                <v-card-text>{{ planet.surface_water }}</v-card-text>
                            </v-col>
                            <v-col cols="12">
                                <v-card-subtitle>Terrain</v-card-subtitle>
                                <v-card-text>{{ planet.terrain }}</v-card-text>
                            </v-col>
                            <v-divider></v-divider>
                            <v-col cols="12">
                                <v-card-subtitle>URL</v-card-subtitle>
                                <v-card-text>{{ planet.url }}</v-card-text>
                            </v-col>
                            <v-col cols="12">
                                <v-card-subtitle>Created</v-card-subtitle>
                                <v-card-text>{{ planet.created }}</v-card-text>
                            </v-col>
                            <v-col cols="12">
                                <v-card-subtitle>Edited</v-card-subtitle>
                                <v-card-text>{{ planet.edited }}</v-card-text>
                            </v-col>
                          </v-row>
                      </v-col>
                    </v-row>
                </v-col>
            </v-row>
         </v-card-text>
      </v-card>
      <v-responsive v-else>
        <v-skeleton-loader type="subtitle" class="mt-4" :loading="true"></v-skeleton-loader>
        <v-skeleton-loader type="image" class="mt-1 mx-2" :loading="true" :height="300"></v-skeleton-loader>
        <v-skeleton-loader type="list-item-three-line" class="mt-4" :loading="true" v-for="i in [1,2,3,4,5,6,7]" :key="i"></v-skeleton-loader>
      </v-responsive>
    </v-responsive>
  </v-container>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getPlanet, type Planet } from '../../services/planets.api';
import { useRoute } from 'vue-router';
import { useAppStore } from '../../store/app';

const appStore = useAppStore();

const $route = useRoute();
const id = ($route.params as { id: string}).id;
const planet = ref<Planet>();
onMounted(async () => {
  const response = await getPlanet(id);
  planet.value = response;
  appStore.setPageTitle(response.name);
});

const getPictureFromPlanet = (planet: Planet) => {
  const id = getIdFromPlanet(planet);
  return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
}

const handleImageError = (event: Event) => {
  console.log('error', event);
  const target = event.target as HTMLImageElement;
  target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
}

const getIdFromPlanet = (planet: Planet) => {
  return planet.url.split('/')[5];
}
</script>