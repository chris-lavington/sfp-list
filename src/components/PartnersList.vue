<template>
  <div>
    <v-app-bar app clipped-left color="blue-grey">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="title ml-3 mr-5 font-weight-light"
        >Sustainable Food Partnership</span
      >
      <!-- <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      /> -->

      <v-spacer />
      <span class="font-weight-light" v-if="lastUpdated">
        Last updated:
        {{ dateFormat(lastUpdated.dateofupdate.seconds) }}
      </span>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="" width="400">
      <v-row class="my-2">
        <v-col>
          <v-btn
            @click="addFilters('addAreas', 'addCategories')"
            text
            color="blue darken-3"
            >ADD ALL FILTERS</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            @click="clearFilters('clearAreas', 'clearCategories')"
            text
            color="red darken-3"
            >CLEAR ALL FILTERS</v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-card class="mx-auto my-4 pa-2" outlined max-width="380">
        <v-card-title class="subtitle-1 pb-0 mb-0"
          >FILTER CATEGORY</v-card-title
        >
        <v-list shaped>
          <v-row>
            <v-col>
              <v-btn
                @click="addFilters('', 'addCategories')"
                text
                small
                color="blue darken-3"
                >ADD ALL</v-btn
              >
            </v-col>
            <v-col>
              <v-btn
                @click="clearFilters('', 'clearCategories')"
                text
                small
                color="red darken-3"
                >CLEAR ALL</v-btn
              >
            </v-col>
          </v-row>
          <v-list-item-group v-model="categories" multiple>
            <template v-for="(categoryCheckbox, index) in categoryCheckboxes">
              <v-list-item
                :key="`categoryCheckbox-${index}`"
                :value="categoryCheckbox.value"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="categoryCheckbox.value"
                    ></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="categoryCheckbox.value"
                      color="light-blue darken-4"
                      @click="toggle"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-divider class="my-4"></v-divider>
      <v-card class="mx-auto my-4 pa-2" outlined max-width="380">
        <v-card-title class="subtitle-1 pb-0 mb-0">FILTER AREA</v-card-title>
        <v-list shaped>
          <v-list-item-group v-model="areas" multiple>
            <v-row>
              <v-col>
                <v-btn
                  @click="addFilters('addAreas', '')"
                  text
                  small
                  color="blue darken-3"
                  >ADD ALL</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  @click="clearFilters('clearAreas', '')"
                  text
                  small
                  color="red darken-3"
                  >CLEAR ALL</v-btn
                >
              </v-col>
            </v-row>
            <template v-for="(areaCheckbox, index) in areaCheckboxes">
              <v-list-item
                :key="`areaCheckbox-${index}`"
                :value="areaCheckbox.value"
                active-class=""
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="areaCheckbox.value"
                    ></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="areaCheckbox.value"
                      color="teal darken-4"
                      @click="toggle"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-content>
      <v-row v-if="selectedFilters != ''" class="my-6">
        <v-col v-for="(partner, i) in selectedFilters" :key="i" cols="12">
          <v-hover>
            <template v-slot="{ hover }">
              <v-lazy
                v-model="isActive"
                :options="{
                  threshold: 0.5
                }"
                min-height="200"
                transition="fade-transition"
              >
                <v-card
                  class="mx-auto my-3 partner-card"
                  max-width="600"
                  outlined
                  :elevation="hover ? 6 : 2"
                >
                  <div class="d-flesx flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title
                        class="title"
                        v-text="partner.name"
                      ></v-card-title>
                      <v-card-text>
                        <ul>
                          <li v-if="partner.phone">
                            <v-icon>mdi-phone</v-icon>&nbsp;{{ partner.phone }}
                          </li>
                          <li v-if="partner.email">
                            <v-icon>mdi-email</v-icon>&nbsp;{{ partner.email }}
                          </li>
                          <li v-if="partner.url">
                            <a href="partner.url">
                              <v-icon>mdi-web</v-icon>&nbsp;
                              {{ partner.url | stripUrl }}
                            </a>
                          </li>
                        </ul>
                      </v-card-text>
                      <v-divider class="mt-6 mx-4"></v-divider>
                      <v-card-text
                        v-html="partner.description"
                        class="text--primary"
                      ></v-card-text>
                      <v-divider class="mt-6 mx-4"></v-divider>
                      <v-card-text>
                        <v-chip
                          v-if="partner.category"
                          class="ma-2"
                          color="light-blue darken-4"
                          label
                          text-color="white"
                        >
                          <v-icon left>mdi-label</v-icon>
                          Category: {{ partner.category }}
                        </v-chip>
                        <v-chip
                          v-if="partner.area"
                          class="ma-2"
                          color="cyan darken-4"
                          label
                          text-color="white"
                        >
                          <v-icon left>mdi-label</v-icon>
                          Area: {{ partner.area }}
                        </v-chip>
                      </v-card-text>
                    </div>
                  </div>
                </v-card>
              </v-lazy>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'PartnersList',
  data() {
    return {
      drawer: null,
      partners: [],
      lastUpdated: null,
      categoryCheckboxes: [
        {
          checked: true,
          value: 'Alcohol'
        },
        {
          checked: true,
          value: 'Food Supplier or Wholesaler'
        },
        {
          checked: true,
          value: 'Meal Delivery or Collection'
        }
      ],
      areaCheckboxes: [
        { value: 'Throughout B&NES', checked: true },
        { value: 'Bath', checked: true },
        { value: 'Batheaston', checked: true },
        { value: 'Bathampton', checked: true },
        { value: 'Bathford', checked: true },
        { value: 'Bishop Sutton', checked: true },
        { value: 'Blagdon', checked: true },
        { value: 'Chew Magna', checked: true },
        { value: 'Chew Stoke', checked: true },
        { value: 'Chew Valley', checked: true },
        { value: 'Chilcompton', checked: true },
        { value: 'Churchill', checked: true },
        { value: 'Clutton', checked: true },
        { value: 'Compton Martin', checked: true },
        { value: 'East Harptree', checked: true },
        { value: 'Farmborough', checked: true },
        { value: 'Farrington Gurney', checked: true },
        { value: 'High Littleton', checked: true },
        { value: 'Hinton Blewett', checked: true },
        { value: 'Hinton Charterhouse', checked: true },
        { value: 'Kelston', checked: true },
        { value: 'Keynsham', checked: true },
        { value: 'Midford', checked: true },
        { value: 'Norton St Philip', checked: true },
        { value: 'Paulton', checked: true },
        { value: 'Radstock', checked: true },
        { value: 'Regil', checked: true },
        { value: 'Saltford', checked: true },
        { value: 'South Stoke', checked: true },
        { value: 'Stanton Drew', checked: true },
        { value: 'Temple Cloud', checked: true },
        { value: 'Timsbury', checked: true },
        { value: 'Tunley', checked: true },
        { value: 'West Harptree', checked: true },
        { value: 'Wrington', checked: true }
      ],
      categories: [],
      areas: [],
      isActive: false
    }
  },
  computed: {
    selectedFilters() {
      let filteredAreas = this.partners.filter((area) => {
        return this.areas.includes(area.area)
      }, this)
      let filteredCats = filteredAreas.filter(function(partner) {
        return this.categories.includes(partner.category)
      }, this)

      return filteredCats
    },
    areaCount() {
      return this.areas.length
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
    },
    clearFilters(clearAreas, clearCategories) {
      let a = clearAreas
      let c = clearCategories
      if (a == 'clearAreas') {
        this.areas = []
      }
      if (c == 'clearCategories') {
        this.categories = []
      }
    },
    addFilters(addAreas, addCategories) {
      let a = addAreas
      let c = addCategories
      if (a == 'addAreas') {
        this.areas = this.areas = [
          'Throughout B&NES',
          'Bath',
          'Batheaston',
          'Bathampton',
          'Bathford',
          'Bishop Sutton',
          'Blagdon',
          'Chew Magna',
          'Chew Stoke',
          'Chew Valley',
          'Chilcompton',
          'Churchill',
          'Clutton',
          'Compton Martin',
          'East Harptree',
          'Farmborough',
          'Farrington Gurney',
          'High Littleton',
          'Hinton Blewett',
          'Hinton Charterhouse',
          'Kelston',
          'Keynsham',
          'Midford',
          'Norton St Philip',
          'Paulton',
          'Radstock',
          'Regil',
          'Saltford',
          'South Stoke',
          'Stanton Drew',
          'Temple Cloud',
          'Timsbury',
          'Tunley',
          'West Harptree',
          'Wrington'
        ]
      }
      if (c == 'addCategories') {
        this.categories = [
          'Food Supplier or Wholesaler',
          'Alcohol',
          'Meal Delivery or Collection'
        ]
      }
    }
  },
  filters: {
    stripUrl(url) {
      let stripUrl = url.replace(/(^\w+:|^)\/\//, '')
      stripUrl = stripUrl.replace(/\/$/, '')
      return stripUrl
    }
  },
  created() {
    // fetch data from firestore
    db.collection('partners')
      .orderBy('category', 'desc')
      .orderBy('area')
      .orderBy('name')
      .where('show', '==', 'yes')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
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
  mounted() {
    ;(this.categories = [
      'Food Supplier or Wholesaler',
      'Alcohol',
      'Meal Delivery or Collection'
    ]),
      (this.areas = [
        'Throughout B&NES',
        'Bath',
        'Batheaston',
        'Bathampton',
        'Bathford',
        'Bishop Sutton',
        'Blagdon',
        'Chew Magna',
        'Chew Stoke',
        'Chew Valley',
        'Chilcompton',
        'Churchill',
        'Clutton',
        'Compton Martin',
        'East Harptree',
        'Farmborough',
        'Farrington Gurney',
        'High Littleton',
        'Hinton Blewett',
        'Hinton Charterhouse',
        'Kelston',
        'Keynsham',
        'Midford',
        'Norton St Philip',
        'Paulton',
        'Radstock',
        'Regil',
        'Saltford',
        'South Stoke',
        'Stanton Drew',
        'Temple Cloud',
        'Timsbury',
        'Tunley',
        'West Harptree',
        'Wrington'
      ])
  }
}
</script>
