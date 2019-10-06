<template>
  <div>
    <p v-if="listOfWords.length > 0">
      <template v-for="(word ,i) in listOfWords">
        <span  :key="i" v-if="word.bad" style="color: red">
          <BadWord :word="word.word" />
        </span>
        <span :key="i" v-else-if="!word.bad">{{ word.word }} </span>
      </template>
    </p>
    <div class="mt-5">
      <h1>Result</h1>
      <h2 class="mt-4">{{ severity.toFixed(2) * 100 }}%</h2>
      <template>
        <b-progress height="2rem" class="mt-4 w-50 mx-auto" :max="1">
          <b-progress-bar :value="severity" :variant="currentVariant"></b-progress-bar>
        </b-progress>
      </template>

      <b-container class="mt-4">
        <p>{{ currentVariant }}</p>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BadWord from "@/components/BadWord/BadWord.vue";

const unirest = require("unirest");

@Component({
  components: { BadWord }
})
export default class Results extends Vue {
  msg = "";

  url =
    "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAks8WXGgBb7YQvlDwzZz3DKDPrjDFcFlE";
  variants = {
    success: "success",
    warning: "warning",
    danger: "danger"
  };

  currentVariant = "";

  url =
    "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAks8WXGgBb7YQvlDwzZz3DKDPrjDFcFlE";

  msgBadWords = [];

  listOfWords = [];

  badWords = ["bitch", "fuck"];

  severity = 0;

  created() {
    this.msg = this.$store.state.msg;
    this.msgBadWords = this.msg.split(" ");

    this.checkSeverity();
    this.checkBadWords();

  }

  compareBadWords() {
    this.msgBadWords.forEach(word => {
      if (this.badWords.includes(word)) {
        this.listOfWords.push({ bad: true, word });
        return;
      }
      this.listOfWords.push({ bad: false, word });
    });
    console.log("list of bad words",this.listOfWords);
  }

  async checkBadWords() {
    const req = unirest(
      "POST",
      "https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter"
    );
    req.headers({
      "x-rapidapi-host": "neutrinoapi-bad-word-filter.p.rapidapi.com",
      "x-rapidapi-key": "44e9c4b8e5msh299ddc8f297da61p17b459jsn405f416842bc",
      "content-type": "application/x-www-form-urlencoded"
    });

    req.form({
      "censor-character": "*",
      content: this.msg
    });

    req.end(res => {
      if (res.error) throw new Error(res.error);
      this.badWords = res.body["bad-words-list"];
      this.compareBadWords();
      console.log(res.body);
    });
  }

  checkSeverityBar() {
    if (this.severity <= 0.3) {
      this.currentVariant = this.variants.success;
    } else if (this.severity <= 0.6) {
      this.currentVariant = this.variants.warning;
    } else {
      this.currentVariant = this.variants.danger;
    }
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
          this.checkSeverityBar();
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
