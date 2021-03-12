<template>
  <v-app>
    <v-app-bar
      app
      color="#f34b5e"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="image"
          transition="scale-transition"
          width="150"
        />
            <Title />
            
        
      </div>

      <v-spacer></v-spacer>

     
    </v-app-bar>

    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Title from './components/Title';
import image from "./assets/logo.svg";

export default {
  name: 'App',

  components: {
    Home,
    Title,
  },

    data: function () {
            return {
                image: image
            }
        }
};
</script>
