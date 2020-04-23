<template>
  <v-container>
    <v-app-bar dark color="pink">
      <v-toolbar-title>SFP Supplier List</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-text v-if="lastUpdated" class="text--primary">
                  Last updated:
                  {{ dateFormat(lastUpdated.dateofupdate.seconds) }}
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col v-for="(partner, i) in partners" :key="i" cols="12">
          <v-card>
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
  </v-container>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'PartnersList',
  data() {
    return {
      partners: [],
      lastUpdated: null
    }
  },
  methods: {
    dateFormat(secs) {
      let unformatted = secs
      let secDate = new Date(unformatted * 1000)
      let year = secDate.getFullYear()
      let date = secDate.getDate()
      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      let monthName = months[secDate.getMonth()]
      let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      let dayName = days[secDate.getDay()]
      let formatted = `${dayName}, ${date} ${monthName} ${year}`
      return formatted
    }
  },
  created() {
    // fetch data from firestore
    db.collection('partners')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data(), doc.id)
          let partner = doc.data()
          partner.id = doc.id
          this.partners.push(partner)
        })
      })
      .catch((err) => {
        console.log('Error getting partners', err)
      })
    db.collection('lastupdated')
      .doc('update')
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log('No such document!')
        } else {
          this.lastUpdated = doc.data()
          this.lastUpdated.id = doc.id
        }
      })
      .catch((err) => {
        console.log('Error getting document', err)
      })
  },
  computed: {
    // prettyDate() {
    // }
  }
}
</script>
