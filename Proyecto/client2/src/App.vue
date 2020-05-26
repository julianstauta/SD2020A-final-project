<template>
  <v-app>
    <v-system-bar dark color="primary">
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-content>
      <NamesTable />
    </v-content>
  </v-app>
</template>

<script>
import NamesTable from "./components/NamesTable";

export default {
  name: "App",

  components: {
    NamesTable
  },

  data: () => ({
    //
  })
};
</script>
