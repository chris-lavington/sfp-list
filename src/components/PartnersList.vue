<template>
  <v-card max-width="400" class="mx-auto">
    <v-app-bar dark color="pink">
      <v-toolbar-title>SFP Supplier List</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col v-for="(partner, i) in partners" :key="i" cols="12">
          <v-card dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="title"
                  v-text="partner.name"
                ></v-card-title>

                <v-card-text class="text--primary">
                  {{ partner.description }}
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'sfp-supplier-list' })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

export default {
  name: 'PartnersList',
  data() {
    return {
      partners: []
    }
  },
  firestore() {
    return {
      partners: db.collection('partners')
    }
  }
}
</script>
