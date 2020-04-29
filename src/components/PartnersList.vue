<template>
  <div>
    <v-app-bar app clipped-left color="blue-grey white--text">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span
        :class="{
          'subtitle-1 ml-3 mr-5 font-weight-light':
            $vuetify.breakpoint.smAndDown,
          'title ml-3 mr-5 font-weight-light': $vuetify.breakpoint.mdAndUp
        }"
        >Sustainable Food Partnership</span
      >
      <v-spacer />
      <span
        :class="{
          'font-weight-light caption': $vuetify.breakpoint.smAndDown,
          'font-weight-light': $vuetify.breakpoint.mdAndUp
        }"
        v-if="lastUpdated"
      >
        Last updated:
        {{ dateFormat(lastUpdated.dateofupdate.seconds) }}
      </span>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color=""
      mobile-breakpoint=""
      width="330"
    >
      <v-row>
        <v-col>
          <v-icon class="text-right ml-3" @click="drawer = false"
            >mdi-close</v-icon
          >
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn
          @click="addFilters('addAreas', 'addCategories')"
          class="ma-1"
          text
          small
          color="blue darken-4"
          >ADD ALL FILTERS</v-btn
        >
        <v-btn
          @click="clearFilters('clearAreas', 'clearCategories')"
          class="ma-1"
          text
          small
          color="red darken-4"
          >CLEAR ALL FILTERS</v-btn
        >
      </div>
      <v-divider class="my-4"></v-divider>
      <v-card class="mx-auto my-4 pa-2" outlined max-width="300">
        <v-card-title class="subtitle-2 pb-0 mb-0"
          >FILTER CATEGORY</v-card-title
        >
        <v-list shaped dense>
          <v-row>
            <v-col>
              <v-btn
                @click="addFilters('', 'addCategories')"
                text
                small
                color="blue darken-4"
                >ADD ALL</v-btn
              >
            </v-col>
            <v-col>
              <v-btn
                @click="clearFilters('', 'clearCategories')"
                text
                small
                color="red darken-4"
                >CLEAR ALL</v-btn
              >
            </v-col>
          </v-row>
          <v-list-item-group v-model="categories" multiple>
            <template v-for="(categoryCheckbox, index) in categoryCheckboxes">
              <v-list-item
                v-if="categoryCheckbox.value == 'Food Supplier or Wholesaler'"
                :key="`categoryCheckbox-${index}`"
                :value="categoryCheckbox.value"
                active-class="green--text text--darken-4"
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
                      color="green darken-4"
                      @click="toggle"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-list-item
                v-else-if="
                  categoryCheckbox.value == 'Meal Delivery or Collection'
                "
                :key="`categoryCheckbox-${index}`"
                :value="categoryCheckbox.value"
                active-class="blue--text text--darken-4"
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
                      color="blue darken-4"
                      @click="toggle"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-list-item
                v-else-if="categoryCheckbox.value == 'Alcohol'"
                :key="`categoryCheckbox-${index}`"
                :value="categoryCheckbox.value"
                active-class="pink--text text--darken-4"
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
                      color="pink darken-4"
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
      <v-card class="mx-auto my-4 pa-2" outlined max-width="300">
        <v-card-title class="subtitle-2 pb-0 mb-0">FILTER AREA</v-card-title>
        <v-list shaped dense>
          <v-list-item-group v-model="areas" multiple>
            <v-row>
              <v-col>
                <v-btn
                  @click="addFilters('addAreas', '')"
                  text
                  small
                  color="blue darken-4"
                  >ADD ALL</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  @click="clearFilters('clearAreas', '')"
                  text
                  small
                  color="red darken-4"
                  >CLEAR ALL</v-btn
                >
              </v-col>
            </v-row>
            <template v-for="(areaCheckbox, index) in areaCheckboxes">
              <v-list-item
                v-show="index < limit_by"
                :key="`areaCheckbox-${index}`"
                :value="areaCheckbox.value"
                active-class="blue-grey--text text--darken-4"
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
                      color="blue-grey darken-4"
                      @click="toggle"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
          <v-btn
            @click="areaToggle(default_limit, areaCheckboxes.length)"
            small
            text
            color="blue darken-4"
            class="my-2 d-flex flex-row-reverse"
            >{{ showLimit }}&nbsp;<v-icon v-if="limit_by == 3" small
              >mdi-chevron-down</v-icon
            ><v-icon v-else small>mdi-chevron-up</v-icon></v-btn
          >
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-content>
      <v-row
        v-if="selectedFilters != ''"
        :class="{
          'ma-6': $vuetify.breakpoint.smAndDown,
          'my-6': $vuetify.breakpoint.mdAndUp
        }"
      >
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
                  :elevation="hover ? 4 : 1"
                >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-row>
                        <v-col class="ma-0 pa-2 pl-3" cols="10">
                          <v-card-title
                            class="title"
                            v-text="partner.name"
                          ></v-card-title>
                        </v-col>
                        <v-col class="ma-0 pa-2" cols="2">
                          <v-card-actions class="justify-end">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  class="ma-0 pa-0"
                                  v-if="partner.email"
                                  :href="`mailto:${partner.email}`"
                                  icon
                                >
                                  <v-icon v-on="on">mdi-email</v-icon>
                                </v-btn>
                              </template>
                              <span>Send email</span>
                            </v-tooltip>

                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  class="ma-0 mr-2 pa-0"
                                  v-if="partner.url"
                                  :href="partner.url"
                                  icon
                                >
                                  <v-icon v-on="on">mdi-web</v-icon>
                                </v-btn>
                              </template>
                              <span>Visit website</span>
                            </v-tooltip>
                          </v-card-actions>
                        </v-col>
                      </v-row>

                      <v-card-text
                        v-if="partner.phone"
                        v-text="partner.phone"
                        class="body-2 mb-4 py-0"
                        ><v-icon small>mdi-phone</v-icon>&nbsp;{{
                          partner.phone
                        }}</v-card-text
                      >
                      <v-divider
                        v-if="partner.description"
                        class="ma-0"
                      ></v-divider>
                      <v-card-text
                        v-if="partner.description"
                        v-html="partner.description"
                        class="text--primary mt-3"
                      ></v-card-text>
                      <v-divider class="ma-0"></v-divider>
                      <v-card-text>
                        <v-chip
                          v-if="
                            partner.category == 'Food Supplier or Wholesaler'
                          "
                          outlined
                          pill
                          class="mt-2 mr-2 mb-2 ml-0"
                          color="green darken-2"
                          text-color="green darken-4"
                        >
                          {{ partner.category }}
                        </v-chip>
                        <v-chip
                          v-else-if="
                            partner.category == 'Meal Delivery or Collection'
                          "
                          outlined
                          pill
                          class="mt-2 mr-2 mb-2 ml-0"
                          color="blue darken-4"
                          text-color="blue darken-4"
                        >
                          {{ partner.category }}
                        </v-chip>
                        <v-chip
                          v-else-if="partner.category == 'Alcohol'"
                          outlined
                          pill
                          class="mt-2 mr-2 mb-2 ml-0"
                          color="pink darken-4"
                          text-color="pink darken-4"
                        >
                          {{ partner.category }}
                        </v-chip>
                        <v-chip
                          v-if="partner.area"
                          outlined
                          pill
                          class="ma-2"
                          color="cyan darken-4"
                          text-color="cyan darken-4"
                        >
                          {{ partner.area }}
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
  name: 'partners-list',
  data() {
    return {
      drawer: null,
      partners: [],
      lastUpdated: null,
      categoryCheckboxes: [
        {
          checked: true,
          value: 'Food Supplier or Wholesaler'
        },
        {
          checked: true,
          value: 'Meal Delivery or Collection'
        },
        {
          checked: true,
          value: 'Alcohol'
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
      isActive: false,
      default_limit: 3,
      limit_by: 3
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
    showLimit() {
      return this.limit_by === 3 ? 'Show more areas' : 'Show less areas'
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
          'Meal Delivery or Collection',
          'Alcohol'
        ]
      }
    },
    areaToggle(default_limit, filters_length) {
      this.limit_by =
        this.limit_by === default_limit ? filters_length : default_limit
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
      .orderBy('categoryorder')
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
      'Meal Delivery or Collection',
      'Alcohol'
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
      ]),
      (this.limit_by = 3)
  }
}
</script>
