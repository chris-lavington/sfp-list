<template>
  <div id="app">
    <v-app>
      <PartnersList />
    </v-app>
  </div>
</template>

<script>
import PartnersList from './components/PartnersList.vue'

export default {
  name: 'App',
  components: {
    PartnersList
  }
}
</script>

<style lang="scss"></style>
