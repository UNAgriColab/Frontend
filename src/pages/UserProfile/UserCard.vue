<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" alt="" src="../../assets/img/logo/icon.png" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">Vendedor / Mercaprospero</h6>
      <h4 class="card-title">{{ user.name }}</h4>
      <h4 class="card-title">{{ user.email }}</h4>
      <h5>{{ user.age }} años</h5>
      <p class="card-description">
        Distribuidor minorista de vegetales y frutas a través del minimercado
        "Mercaprospero"
      </p>
      <div>
        <h2>
          Calificación promedio {{ user.qualification }} con
          {{ user.numberOfReviews }} reseñas
        </h2>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import http from "../../http-common";

export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg")
    }
  },
  data() {
    return {
      user: []
    };
  },
  mounted() {
    this.storage();
    this.getUser();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.tokenHeader = "Bearer " + this.token;
        this.emailAdress = this.aux.email;
      }
    },
    getUser: function() {
      http
        .get("/user/" + this.emailAdress, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.user = response.data;
          this.user.qualification = this.user.qualification.toFixed(2);
        })
        .catch(e => console.log(e));
    }
  },
  computed: {}
};
</script>
<style></style>
