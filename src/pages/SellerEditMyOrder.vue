<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-60">
        <md-card>
          <md-card-header data-background-color="green">
            <div class="product">
              <div class="md-layout-item md-size-100 md-size-33">
                <h1 class="title">{{ product.productName }}</h1>
                <p class="category">Vendedor: {{ product.sellerEmail }}</p>
                <p class="category">Id de la orden: {{ product.id }}</p>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <div>
              <div>
                <h3 class="title">
                  {{ product.numberOfUnits }}
                  <span v-if="product.presentation === 1">
                    Gramos pedidos.
                  </span>
                  <span v-if="product.presentation === 2">
                    Libras pedidas.
                  </span>
                  <span v-if="product.presentation === 3">
                    Kilogramos pedidos.
                  </span>
                  <span v-if="product.presentation === 4">
                    Arrobas pedidas.
                  </span>
                  <span v-if="product.presentation === 5">
                    Bultos pedidos.
                  </span>
                </h3>
                <h4 class="title">
                  Precio total final: ${{ product.totalPrice }}
                </h4>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-40">
        <md-card>
          <md-card-header data-background-color="green">
            <h2 class="title">Observaciones del comprador</h2>
            <p class="category">De: {{ product.buyerEmail }}</p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout-item md-size-100 md-size-33">
              <p class="category">
                {{ product.description }}
              </p>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <div>
              <h2 class="title">Estado de la orden</h2>
              <p class="category">
                Actualiza el estado de tu orden
              </p>
            </div>
          </md-card-header>
          <md-card-content>
            <div
              v-if="
                product.state === 1 ||
                  product.state === 2 ||
                  product.state === 3 ||
                  product.state === 4
              "
              class="md-layout-item md-size-100 md-size-33"
            >
              <md-steppers :md-active-step.sync="state.active" md-linear>
                <md-step
                  id="first"
                  md-label="En espera"
                  :md-editable="false"
                  :md-done.sync="state.first"
                >
                  <p>Esperando confirmación de producto</p>
                </md-step>

                <md-step
                  id="second"
                  md-label="En proceso"
                  :md-editable="false"
                  :md-done.sync="state.second"
                >
                  <p>El producto está en proceso</p>
                </md-step>

                <md-step
                  id="third"
                  md-label="Enviado"
                  :md-editable="false"
                  :md-done.sync="state.third"
                  class="md-stepper"
                >
                  <p>El producto ya ha sido enviado</p>
                </md-step>

                <md-step
                  id="fourth"
                  md-label="Recibido"
                  :md-editable="false"
                  :md-done.sync="state.fourth"
                >
                  <p>Ya recibiste el producto</p>
                </md-step>
              </md-steppers>
            </div>
            <div
              v-if="product.state === 0"
              class="md-layout-item md-size-100 md-size-33"
            >
              <h2>Cancelado</h2>
            </div>
            <div
              class="md-layout-item md-size-100 text-right"
              v-if="
                product.state === 2 ||
                  product.state === 3 ||
                  product.state === 4
              "
            >
              <md-button class="md-raised md-accent" v-on:click="cancelOrder">
                cancelar producto
              </md-button>
            </div>
            <div
              class="md-layout-item md-size-100 text-right"
              v-if="product.state === 2 || product.state === 3"
            >
              <md-button class="md-raised md-success" v-on:click="updateOrder">
                Actualizar estado
              </md-button>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "product",
  data() {
    return {
      product: {
        //orden
        offerReference: "",
        buyerEmail: "",
        numberOfUnits: 0,
        description: "",
        id: "",
        sellerEmail: "",
        productName: "",
        unit: "",
        totalPrice: 0,
        state: "",
        deliveryAdd: "",
        presentation: "",
        canceled: true
      },
      state: {
        active: "first",
        first: false,
        second: false,
        third: false,
        fourth: false,
        zero: false
      },
      errorReq: ""
    };
  },
  mounted() {
    this.storage();
    this.leerAPI();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.product.userEmail = this.aux.email;
        this.product.userEmail = this.aux.email;
      } else {
        this.$router.push("/login");
      }
      if (localStorage.getItem("sellerOrderId")) {
        this.product.id = localStorage.getItem("sellerOrderId");
      }
    },
    leerAPI() {
      http
        .get("/order/" + this.product.id, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.product.offerReference = response.data.offerReference;
          this.product.buyerEmail = response.data.buyerEmail;
          this.product.numberOfUnits = response.data.numberOfUnits;
          this.product.description = response.data.description;
          this.product.id = response.data.id;
          this.product.presentation = response.data.presentation;
          this.product.sellerEmail = response.data.sellerEmail;
          this.product.productName = response.data.productName;
          this.product.unit = response.data.unit;
          this.product.totalPrice = response.data.totalPrice;
          this.product.state = response.data.state;
          this.product.deliveryAdd = response.data.deliveryAdd;
          this.stepChange();
        })
        .catch(e => {
          this.errorReq = e;
          this.notifyVue("danger");
          console.log(e);
        });
    },
    stepChange() {
      if (this.product.state === 0) {
        this.state.active = "zero";
      }
      if (this.product.state === 2) {
        this.state.active = "first";
      }
      if (this.product.state === 3) {
        this.state.active = "second";
      }
      if (this.product.state === 4) {
        this.state.active = "third";
      }

      if (this.product.state === 1) {
        this.state.active = "fourth";
      }
    },
    cancelOrder() {
      const data = {};
      http
        .put(
          "/order/cancel/" + this.product.id + "/" + this.product.userEmail,
          data,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          console.log(response.data);
          if (JSON.stringify(response.data) === "true") {
            this.notifyVue("info");
            window.location.reload();
          }
          if (JSON.stringify(response.data) === "false") {
            this.notifyVue("warning");
          }
          window.location.reload();
        })
        .catch(e => {
          this.errorReq = e;
          this.notifyVue("danger");
          console.log(e);
        });

      this.submitted = true;
    },
    updateOrder() {
      const data = {};
      http
        .put(
          "/order/update/" + this.product.id + "/" + this.product.userEmail,
          data,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          console.log(response.data);
          if (JSON.stringify(response.data) === "true") {
            window.location.reload();
          }
          if (JSON.stringify(response.data) === "false") {
            this.notifyVue("warning");
          }
        })
        .catch(e => {
          this.errorReq = e;
          this.notifyVue("danger");
          console.log(e);
        });
      this.submitted = true;
    },
    notifyVue(AlertType) {
      if (AlertType === "success") {
        this.$notify({
          message:
            "La oferta N° <b>" +
            this.product.id +
            "</b> ha sido actualizada con éxito.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: AlertType
        });
      }
      if (AlertType === "warning") {
        this.$notify({
          message:
            "La orden N°" + this.product.id + " <b>no</b> ha sido actualizada.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
      if (AlertType === "info") {
        this.$notify({
          message: "La Orden ha sido Cancelada con éxito.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
      if (AlertType === "danger") {
        this.$notify({
          message: "Ha ocurrido un error" + this.errorReq + ".",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-steppers {
}
</style>
