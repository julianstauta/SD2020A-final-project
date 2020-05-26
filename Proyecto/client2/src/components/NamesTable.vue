<template>
  <v-container fluid>
    <v-card class="centeredContainer" max-width="500">
      <v-card-title class="mx-auto">
        <v-text-field label="Agregar Nombre" v-model="nname"></v-text-field>
        <v-btn color="primary" dark class="mb-2" @click="addName(nname)">Add</v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="names">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
            </tr>
          </thead>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
const url = "http://192.168.2.2:5000/api/names/";
const axios = require("axios");

export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Actions", value: "action", sortable: false, width: "1%" }
      ],
      names: [],
      nname: ""
    };
  },
  methods: {
    getNames() {
      axios
        .get(url)
        .then(response => {
          this.names = response.data;
        })
        .catch(error => {
          console.log(error);
          alert("Oh no, error.");
        });
    },
    addName(n) {
      if (n === "") {
        alert("You must write a name");
      } else {
        axios
          .post(url, { name: n })
          .then(response => {
            if (response.status == 200) {
              alert("Name added");
              this.nname = "";
              this.getNames();
            }
          })
          .catch(error => {
            if (error.response.status == 401) {
              alert(error.response.data.message);
            } else {
              alert("Unexpected error, please contact the admin");
            }
          });
      }
    },
    deleteItem(item) {
      let id = item._id;
      axios
        .delete(`${url}${id}`)
        .then(response => {
          if (response.status == 200) {
            alert("Name deleted");
            this.getNames();
          }
        })
        .catch(error => {
          if (error.response.status == 401) {
            alert(error.response.data.message);
          } else {
            alert("Unexpected error, please contact the admin");
          }
        });
    }
  },
  beforeMount() {
    this.getNames();
  }
};
</script>


<style>
.centeredContainer {
  margin: auto;
  margin-top: 150px;
}
</style>
