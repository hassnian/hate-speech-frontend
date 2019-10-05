<template>
  <div class="container h-100">
    <div class="row justify-content-center">
      <b-container>
        <h3>Selecciona una red social</h3>
      </b-container>
      <b-container class="mt-5">
        <b-row>
          <b-col cols="4">
            <b-img
              :src="require('@/assets/facebook.png')"
              fluid
              alt="Responsive image"
              width="60"
            ></b-img>
          </b-col>
          <b-col cols="4">
            <b-img
              :src="require('@/assets/reddit.png')"
              fluid
              alt="Responsive image"
              width="60"
            ></b-img>
          </b-col>
          <b-col cols="4">
            <b-img
              :src="require('@/assets/twitter.png')"
              fluid
              alt="Responsive image"
              width="60"
            ></b-img>
          </b-col>
        </b-row>
      </b-container>
      <b-container class="mt-5">
        <h4>o</h4>
      </b-container>
      <b-container>
        <h3>Introduce un texto</h3>
        <div class="mt-5">
          <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Introduce un texto..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <b-form-checkbox
            id="checkbox-1"
            v-model="status"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
            class="mt-4"
            >Acepto los términos y condiciones de uso</b-form-checkbox
          >
          <div class="sr-only">
            State: <strong>{{ status }}</strong>
          </div>
          <div class="mt-5 mb-5">
            <b-button pill size="lg">Consultar</b-button>
            <b-button @click="checkText" pill>Consultar</b-button>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SelectNetwork extends Vue {
  status = 'not_accepted';

  text = '';

  checkText() {
      this.$store.commit("changeMsg",this.text);
      this.$router.push("/results")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
