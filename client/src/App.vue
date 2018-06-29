<template>
  <v-app>
      <v-toolbar app color="primary" dense>
        <v-toolbar-items>
          <v-btn flat large color="white" to='/'>Releases</v-btn>
          <v-btn flat large color="white" to='/new-release'>Create New Release</v-btn>
        <v-spacer/>
        </v-toolbar-items>
      </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
  .fa-icon {
    width: auto;
    height: 1em; /* or any other relative font sizes */

    /* You would have to include the following two lines to make this work in Safari */
    max-width: 100%;
    max-height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #3B96EF;
  }
</style>
