<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-60 md-small-size-50 md-xsmall-size-80 md-size-65"
      >
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Paga la orden de tu producto</h4>
              <p class="category">
                Agrega la información de entrega de tu producto y tu método de
                pago
              </p>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <!-- Layout item list-->
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Modo de pago</label>
                    <md-select
                      v-model="order.paymentMethod"
                      name="paymentMethod"
                      id="paymentMethod"
                      md-dense
                      required
                    >
                      <md-optgroup label="Crédito">
                        <md-option value="Visa">Visa</md-option>
                        <md-option value="Mastercard">Mastercard</md-option>
                      </md-optgroup>

                      <md-optgroup label="Transferencia bancaria con PSE">
                        <md-option value="Banco agrario">
                          Banco agrario
                        </md-option>
                        <md-option value="Daviplata">Daviplata</md-option>
                        <md-option value="Nequi">Nequi</md-option>
                        <md-option value="Bancolombia">Bancolombia</md-option>
                        <md-option value="Banco Davivienda">
                          Banco Davivienda
                        </md-option>
                      </md-optgroup>

                      <md-optgroup label="Puntos fijos">
                        <md-option value="Efecty">Pago en Efecty</md-option>
                        <md-option value="Baloto">Pago en Baloto</md-option>
                        <md-option value="Pagatodo">Pago en pagatodo</md-option>
                      </md-optgroup>
                    </md-select>
                    <span class="md-error">el metodo de pago es necesario</span>
                  </md-field>
                </div>
              </div>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <h3>Datos de envío</h3>
                  <md-field>
                    <label>Departamento</label>
                    <md-select
                      v-model="order.department"
                      name="departamentos"
                      id="dep"
                      md-dense
                      @md-selected="resetProductDropdown"
                      required
                    >
                      <div class="md">
                        <md-option
                          v-for="(data, index) in places.myJson"
                          v-bind:key="index"
                          v-bind:value="data.departamento"
                        >
                          {{ data.departamento }}
                        </md-option>
                      </div>
                    </md-select>
                    <md-icon>location_city</md-icon>
                    <span class="md-error">El departamento es necesario</span>
                  </md-field>
                  <md-field>
                    <label>Ciudad</label>
                    <md-select
                      v-model="order.city"
                      name="ciudades"
                      id="ciudades"
                      md-dense
                      required
                    >
                      <md-option
                        v-for="(option, index2) in setOptions"
                        v-bind:key="index2"
                        v-bind:value="option"
                      >
                        {{ option }}
                      </md-option>
                    </md-select>
                    <md-icon>apartment</md-icon>
                    <span class="md-error">
                      La ciudad o municipio son necesarios
                    </span>
                  </md-field>
                  <md-field maxlength="1">
                    <label>Barrio o vereda</label>
                    <md-input required v-model="order.neighbourhood"></md-input>
                    <md-icon>people_outline</md-icon>
                    <span class="md-error">Este campo es necesario</span>
                  </md-field>
                  <md-field maxlength="1">
                    <label>Dirección</label>
                    <md-input required v-model="order.address"></md-input>
                    <md-icon>house</md-icon>
                    <span class="md-error">Este campo es necesario</span>
                  </md-field>

                  <md-field maxlength="1">
                    <label>Detalles adicionales</label>
                    <md-input v-model="order.details"></md-input>
                    <md-icon>all_inclusive</md-icon>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
      <div
        class="md-layout-item md-medium-size-40 md-small-size-50 md-xsmall-size-60 md-size-35"
      >
        <form>
          <md-card class="md-double-line  md-elevation-24">
            <md-card-header data-background-color="green">
              <h4 class="title">¿Quieres decirle algo a tu vendedor?</h4>
              <p class="category">
                dile.....
              </p>
            </md-card-header>
            <md-card-content>
              <md-field>
                <label>Descripción</label>
                <md-textarea v-model="order.description2"></md-textarea>
                <md-icon>description</md-icon>
              </md-field>
            </md-card-content>
          </md-card>
          <md-card class="md-double-line  md-elevation-24">
            <md-card-header data-background-color="green">
              <h4 class="title">Resumen de tu compra</h4>
              <p class="category">
                Revisa que todos los datos de tu compra estén correctos
              </p>
            </md-card-header>
            <md-card-content>
              <p>
                Vas a comprar {{ order.numberOfUnits }}
                <span v-if="order.presentation === 1">
                  Gramos
                </span>
                <span v-if="order.presentation === 2">
                  Libras
                </span>
                <span v-if="order.presentation === 3">
                  Kilogramos
                </span>
                <span v-if="order.presentation === 4">
                  Arrobas
                </span>
                <span v-if="order.presentation === 5">
                  Bultos
                </span>
                de {{ order.productName }} con valor de $
                {{ order.numberOfUnits * order.pricePresentation }}.
              </p>
              <p>
                Para ser enviadas al departamento de {{ order.department }} a la
                ciudad de {{ order.city }}, {{ order.neighbourhood }}.
              </p>
              <p>Con dirección {{ order.address }}, {{ order.details }}.</p>
              <div class="md-layout-item md-size-100 text-right">
                <md-button
                  class="md-raised md-success"
                  @click="saveOrder"
                  :disabled="this.order.buyerEmail === this.order.sellerEmail"
                >
                  <md-icon>done</md-icon> Termina tu compra
                </md-button>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../http-common";
import json from "../jsons/colombia.json";

export default {
  name: "add-offer",
  data: function() {
    return {
      order: {
        //oferta
        productName: "",
        presentation: "",
        pricePresentation: 0,
        minQuantity: 0,
        description: "",
        id: "",
        state: "false",
        sellerEmail: "",
        //order
        buyerEmail: "",
        //id ->offerReference
        numberOfUnits: 0,
        description2: "",

        //mailing
        city: "",
        department: "",
        address: "",
        details: "",
        neighbourhood: "",

        //payment method
        totalPrice: "",
        paymentMethod: "",
        counter: 0
      },
      places: {
        myJson: json
      },
      validation: {
        paymentMethodIsInvalid: false,
        departmentIsInvalid: false,
        cityIsInvalid: false,
        neighbourhoodIsInvalid: false,
        addressIsInvalid: false
      },
      submitted: false
    };
  },
  mounted() {
    this.storage();
    this.getUser();
    this.leerAPI();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.order.buyerEmail = this.aux.email;
      } else {
        this.$router.push("/login");
      }
      if (localStorage.getItem("buyerOrderId")) {
        this.order.id = localStorage.getItem("buyerOrderId");
      }
      if (localStorage.getItem("numberOfUnitsQuantity")) {
        this.order.numberOfUnits = localStorage.getItem(
          "numberOfUnitsQuantity"
        );
      }
    },
    getUser: function() {
      console.log("/user/" + this.order.buyerEmail);
      http
        .get("/user/" + this.order.buyerEmail, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.order.city = response.data.mailing.city;
          this.order.department = response.data.mailing.department;
          this.order.address = response.data.mailing.address;
          this.order.details = response.data.mailing.details;
          this.order.neighbourhood = response.data.mailing.neighbourhood;
        })
        .catch(e => console.log(e));
    },
    leerAPI() {
      console.log(this.token);
      console.log(`Bearer ${this.token}`);
      http
        .get("/offer/" + this.order.id, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.order.productName = response.data.productName;
          this.order.presentation = response.data.presentation;
          this.order.pricePresentation = response.data.pricePresentation;
          this.order.minQuantity = response.data.minQuantity;
          this.order.description = response.data.description;
          this.order.state = response.data.state;
          this.order.sellerEmail = response.data.sellerEmail;
        })
        .catch(e => {
          console.log(e);
          this.notifyVue("danger");
        });
    },
    saveOrder() {
      const mailing = {
        city: this.order.city,
        department: this.order.department,
        address: this.order.address,
        details: this.order.details,
        neighbourhood: this.order.neighbourhood
      };
      const data = {
        buyerEmail: this.order.buyerEmail,
        offerReference: this.order.id,
        numberOfUnits: this.order.numberOfUnits,
        description: this.order.description2,
        mailing: mailing
      };
      http
        .post("/order", data, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          if (JSON.stringify(response.data) === "true") {
            this.notifyVue("success");
            this.$router.push("/BuyerListMyOrders");
          }
        })
        .catch(e => {
          this.notifyVue("danger");
          console.log(e);
        });
      this.submitted = true;
    },
    resetProductDropdown: function() {
      if (this.counter !== 0) {
        this.places.city = "";
      } else {
        this.counter = 1;
      }
    },
    notifyVue(AlertType) {
      if (AlertType === "success") {
        this.$notify({
          message:
            "Compra exitosa de: " +
            this.order.numberOfUnits +
            " unidades de <b>" +
            this.order.productName +
            "</b> .",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
      if (AlertType === "warning") {
        this.$notify({
          message:
            "la orden del producto: <b>" +
            this.order.ProductName +
            " <b>no</b> ha sido comprada.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
      if (AlertType === "danger") {
        this.$notify({
          message: "Ha ocurrido un error " + this.errorReq + ".",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
    }
  },
  computed: {
    setOptions: function() {
      let ciudades;
      let options = this.places.myJson;
      for (let i = 0; i < 31; i++) {
        if (this.order.department === options[i]["departamento"]) {
          ciudades = options[i]["ciudades"];
        }
      }
      return ciudades;
    }
  }
};
</script>

<style></style>
