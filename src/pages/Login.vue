<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h5 class="title text-center">Ingresa tus datos</h5>
          </md-card-header>

          <md-card-content>
            <form class="pure-form pure-form-stacked" id="form">
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label for="username">Email</label>
                  <md-icon>mail_outline</md-icon>
                  <md-input
                    id="username"
                    v-model="user.email"
                    type="email"
                    placeholder="Email"
                  >
                  </md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label for="password">Contraseña</label>
                  <md-icon>lock_open</md-icon>
                  <md-input
                    id="password"
                    v-model="user.password"
                    type="password"
                    placeholder="Contraseña"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-center">
                <md-button v-on:click="saveLogin">
                  Ingresar
                </md-button>
              </div>
            </form>
          </md-card-content>
        </md-card>

        <div class="md-layout">
          <div class="md-layout-item md-size-50 text-left">
            <router-link to="/register" class="text-white">
              <small style="font-weight: initial">
                ¿Olvidaste tu contraseña?
              </small>
            </router-link>
          </div>

          <div class="md-layout-item md-size-50 text-right">
            <router-link to="/register" class="text-white">
              <small style="font-weight: initial">
                Crea una nueva cuenta
              </small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <md-progress-spinner
      md-mode="indeterminate"
      v-if="this.requestTime"
    ></md-progress-spinner>
    <md-dialog-alert
      :md-active.sync="conflictReq"
      md-title="Conflicto en el usuario"
      md-content=" Usuario o contraseña invalida. "
      md-confirm-text="ok!"
    />
    <md-dialog-alert
      :md-active.sync="errorReq"
      md-title="Error HTTP"
      md-content="    se presento un error en la petición Http  "
      md-confirm-text="ok!"
    />
  </div>
</template>
<script>
import http from "../http-common";
import router from "../routes/routes.js";
export default {
  name: "login",
  data: function() {
    return {
      user: {
        email: "",
        password: "",
        token: ""
      },
      submitData: false,
      conflictReq: false,
      errorReq: false,
      requestTime: false
    };
  },
  mounted() {
    this.clearStorage();
  },
  methods: {
    clearStorage() {
      localStorage.clear();
      this.user.email = "";
      this.user.password = "";
      this.user.token = "";
    },
    saveLogin: function() {
      this.requestTime = true;
      const data = {
        email: this.user.email,
        password: this.user.password
      };
      http
        .post("/auth", data)
        .then(response => {
          if (typeof response.data.message === "undefined") {
            console.log("Respuesta:" + response);
            this.user.token = response.data;
            this.user.password = "";
            localStorage.setItem("TokenSession", JSON.stringify(response.data));
            localStorage.setItem("userSession", JSON.stringify(this.user));
            console.log("log-in");
            this.requestTime = false;
            this.$router.push("/dashboard");
          } else {
            this.conflictReq = true;
            this.requestTime = false;
          }
        })
        .catch(e => {
          this.requestTime = false;
          console.log(e);
          this.conflictReq = true;
        });
    }
  }
};
</script>
