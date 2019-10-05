<template>
  <div class="mt-5">
    <h1>Este es el resultado</h1>
    <h2 class="mt-4">{{ severity }}</h2>
    <b-progress height="2rem" class="mt-4" :max="max" show-value>
      <b-progress-bar :value="value * (0.3 / 1)" variant="success"></b-progress-bar>
      <b-progress-bar :value="value * (0.5 / 1)" variant="warning"></b-progress-bar>
      <b-progress-bar :value="value * (0.8 / 1)" variant="danger"></b-progress-bar>
    </b-progress>
    <b-container class="mt-4">
      <p>{{ msg }}</p>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
var unirest = require("unirest");

@Component
export default class Results extends Vue {
  msg = "";

  url =
    "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAks8WXGgBb7YQvlDwzZz3DKDPrjDFcFlE";


  severity = 0;

  created() {
    this.msg = this.$store.state.msg;
    this.checkSeverity();
    this.checkBadWords();
  }

  async checkBadWords() {
    var req = unirest("POST", "https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter");
    req.headers({
      "x-rapidapi-host": "neutrinoapi-bad-word-filter.p.rapidapi.com",
      "x-rapidapi-key": "ba44cf7e56msh345ef06e241e432p18036ajsn4fa7f66860d1",
      "content-type": "application/x-www-form-urlencoded"
    });

    req.form({
      "censor-character": "*",
      content: this.msg
    });

    req.end((res) => {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });
  }

  async checkSeverity() {
    const body = {
      comment: { text: this.msg },
      languages: ["en"],
      requestedAttributes: { TOXICITY: {}, INSULT: {} }
    };
    try {
      await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          this.severity = res.attributeScores.TOXICITY.summaryScore.value;
        });
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
p {
  font-size: 1.5rem;
  font-style: italic;
}

</style>
