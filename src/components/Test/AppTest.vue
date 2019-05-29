<!-- my-component.vue Template-->
<template>
  <v-app>
    <div>This will be pre-compiled</div>
      <v-navigation-drawer app>

      </v-navigation-drawer>
        <v-toolbar app>

        </v-toolbar>
        <main>
          <v-content>
            <v-container fluid>
              <router-view>

              </router-view>
            </v-container>
          </v-content>
        </main>
      <v-footer app>

      </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
//Components
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}

</script>

<style src="./my-component.css"></style>
