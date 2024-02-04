<template>
  <v-container class="fill-height">
    <v-responsive class="align-top fill-height">
      <v-card class="fill-height" >
        <v-card-title>Planets</v-card-title>
        <v-card-text v-if="planets.length">
          <v-list subheader>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field :loading="loading" density="compact" variant="solo" label="Search templates"
                  v-model="search" append-inner-icon="mdi-magnify" single-line hide-details class="mx-2"></v-text-field>
              </v-col>
              <v-col cols="9" md="5" class="text-right">
                <v-autocomplete v-model="sortColumn" :items="sortableColumns" label="Sort By" placeholder="Sort By" hide-details dense variant="solo" single-line density="compact"></v-autocomplete>
              </v-col>
              <v-col cols="3" md="1" class="text-right">
                <v-btn color="primary" variant="text" @click="sortMode = !sortMode">
                  <v-icon v-if="sortMode" icon="mdi-sort-ascending"></v-icon>
                  <v-icon v-else icon="mdi-sort-descending"></v-icon>
                </v-btn>
              </v-col>
            </v-row>
          
            <v-list-item v-for="planet in filteredPlanets" :key="planet.id" :value="planet" color="primary"
              @click="gotoPlanet(planet)">
              <template v-slot:prepend>
                <v-icon size="large" icon="mdi-earth"></v-icon>
              </template>

              <v-list-item-title>
                {{ planet.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ planet.climate }} - {{ planet.terrain }}
              </v-list-item-subtitle>
              <template v-slot:append>
                <div class="hidden-md-and-down">
                  <b class="mx-2"> Population: </b>
                  <span v-if="planet.population !== 'unknown'">{{ formatNumber(planet.population) }}</span>
                  <span v-else>Unknown</span>
                </div>
                <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>

        <template v-else>
          <v-skeleton-loader type="subtitle" class="mt-4" :loading="loading"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-three-line" class="mt-4" :loading="loading" v-for="i in [1,2,3,4,5,6,7]" :key="i"></v-skeleton-loader>
        </template>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getPlanets, type Planet } from '../services/planets.api';
import { useRouter } from 'vue-router';
import { useAppStore } from '../store/app';

const appStore = useAppStore();

appStore.setPageTitle('');

const loading = ref(false);
const planets = ref<Planet[]>([]);
const getPlanetsData = async () => {
  if(appStore.planets.length) {
    planets.value = appStore.planets;
    return;
  }
  loading.value = true;
  const response = await getPlanets();
  planets.value = response;
  loading.value = false;
  appStore.setPlanets(response);
}

onMounted(() => {
  getPlanetsData();
});

const search = ref('');
const sortColumn = ref();
const sortableColumns = ['name', 'population', 'climate', 'terrain'];
const sortMode = ref(true);

const filteredPlanets = computed(() => {
  return planets.value.filter(planet => planet.name.toLowerCase().includes(search.value.toLowerCase())).sort((a, b) => {
    
    if (sortColumn.value) {
      const sortValue = sortColumn.value as keyof Planet;
      if (sortMode.value) {
        if (sortValue === 'population') {
          return a[sortValue] === 'unknown' ? 1 : b[sortValue] === 'unknown' ? -1 : Number(a[sortValue]) > Number(b[sortValue]) ? 1 : -1;
        }
        return a[sortValue] > b[sortValue] ? 1 : -1;
      } else {
        if (sortValue === 'population') {
          return a[sortValue] === 'unknown' ? 1 : b[sortValue] === 'unknown' ? -1 : Number(a[sortValue]) < Number(b[sortValue]) ? 1 : -1;
        }
        return a[sortValue] < b[sortValue] ? 1 : -1;
      }
    }
    return 0;
  });
});

const formatNumber = (value: string) => {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(Number(value));

}

const router = useRouter();
const gotoPlanet = (planet: Planet) => {
  const id = getIdFromPlanet(planet);
  router.push(`/planets/${id}`);
}

const getIdFromPlanet = (planet: Planet) => {
  return planet.url.split('/')[5];
}

</script>
