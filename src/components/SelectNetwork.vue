<template>
  <div class=" container h-100">
    <div class="row justify-content-center">
      <b-container>
        <h3>Choose a social network</h3>
      </b-container>
      <b-container class="mt-5">
        <b-row>
          <b-col cols="4">
            <b-img
              @click="$router.push('/list')"
              :src="require('@/assets/facebook.png')"
              fluid
              alt="Responsive image"
              width="60"
              class="pointer"
            ></b-img>
          </b-col>
          <b-col cols="4">
            <b-img
              @click="$router.push('/list')"
              :src="require('@/assets/reddit.png')"
              fluid
              alt="Responsive image"
              width="60"
              class="pointer"
            ></b-img>
          </b-col>
          <b-col cols="4">
            <b-img
              @click="$router.push('/list')"
              :src="require('@/assets/twitter.png')"
              fluid
              alt="Responsive image"
              width="60"
              class="pointer"
            ></b-img>
          </b-col>
        </b-row>
      </b-container>
      <b-container class="mt-5">
        <h4>or</h4>
      </b-container>
      <b-container>
        <h3>Type a text</h3>
        <div class="mt-5">
          <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Type here..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <div class="sr-only">
            State: <strong>{{ status }}</strong>
          </div>
          <div class="mt-5 mb-5">
            <b-button @click="checkText" pill size="lg">Send</b-button>
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

button {
  background: #1abc9c;
  border: #1abc9c;
}
</style>
