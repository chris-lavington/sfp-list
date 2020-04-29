<template>
  <div id="app">
    <v-app>
      <partners-list />
    </v-app>
  </div>
</template>

<script>
import PartnersList from './components/PartnersList.vue'

export default {
  name: 'App',
  components: {
    'partners-list': PartnersList
  }
}
</script>

<style lang="scss"></style>
