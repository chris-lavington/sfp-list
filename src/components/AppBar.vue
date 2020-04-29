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
      width="320"
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
      <v-card class="mx-auto my-4 pa-2" outlined max-width="380">
        <v-card-title class="subtitle-1 pb-0 mb-0"
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
      <v-card class="mx-auto my-4 pa-2" outlined max-width="380">
        <v-card-title class="subtitle-1 pb-0 mb-0">FILTER AREA</v-card-title>
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
  </div>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    lastUpdated: {
      type: String
    },
    categories: {
      type: Array
    },
    categoryCheckboxes: {
      type: Array
    },
    areas: {
      type: Array
    },
    areaCheckboxes: {
      type: Array
    },
    showLimit: {
      type: String
    },
    limit_by: {
      type: String
    },
    selectedFilters: {
      type: Array
    }
  },
  data() {
    return {
      drawer: null
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
  }
}
</script>

<style></style>
