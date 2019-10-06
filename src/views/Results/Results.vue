<template>
  <div class="mt-4">
    <p v-if="listOfWords.length > 0">
      <template v-for="word in listOfWords">
        <span v-if="word.bad" style="color: red">
          <BadWord :word="word.word" />
        </span>
        <span v-else-if="!word.bad">{{ word.word }} </span>
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
        <b-alert variant="info" show>{{msgAlert}}</b-alert>
      </b-container>


    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BadWord from '@/components/BadWord/BadWord.vue';

const unirest = require('unirest');

@Component({
  components: { BadWord },
})
export default class Results extends Vue {
  msg = '';

  url =
    'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAks8WXGgBb7YQvlDwzZz3DKDPrjDFcFlE';

  variants = {
    success: 'success',
    warning: 'warning',
    danger: 'danger',
  };

  msgInfo = {
    good: 'It seems like everything is going ok!',
    intermediate: 'There is room for improvement in this sentence.',
    bad: 'This sentence seems rather offensive',
  };

  msgAlert = ''

  currentVariant = '';

  url = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAks8WXGgBb7YQvlDwzZz3DKDPrjDFcFlE';

  msgBadWords = [];

  listOfWords = [];

  badWords = [];

  severity = 0;

  created() {
    this.msg = this.$store.state.msg;
    this.msgBadWords = this.msg.split(' ');

    this.checkSeverity();
    this.checkBadWords();
  }

  compareBadWords() {
    this.msgBadWords.forEach((word) => {
      if (this.badWords.includes(word)) {
        this.listOfWords.push({ bad: true, word });
        return;
      }
      this.listOfWords.push({ bad: false, word });
    });
    console.log('list of bad words', this.listOfWords);
  }

  async checkBadWords() {
    const req = unirest(
      'POST',
      'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter',
    );

    req.headers({
      'x-rapidapi-host': 'neutrinoapi-bad-word-filter.p.rapidapi.com',
      'x-rapidapi-key': '1a68e1e799msh05c48f2c733f485p1fd564jsnbab97401c84c',
      'content-type': 'application/x-www-form-urlencoded',
    });

    req.form({
      'censor-character': '*',
      content: this.msg,
    });

    req.end((res) => {
      if (res.error) throw new Error(res.error);
      this.badWords = res.body['bad-words-list'];
      this.compareBadWords();
      console.log(res.body);
    });
  }

  checkSeverityBar() {
    if (this.severity <= 0.3) {
      this.currentVariant = this.variants.success;
      this.msgAlert = this.msgInfo.good;
    } else if (this.severity <= 0.6) {
      this.currentVariant = this.variants.warning;
      this.msgAlert = this.msgInfo.intermediate;
    } else {
      this.currentVariant = this.variants.danger;
      this.msgAlert = this.msgInfo.bad;
    }
  }

  async checkSeverity() {
    const body = {
      comment: { text: this.msg },
      languages: ['en'],
      requestedAttributes: { TOXICITY: {}, INSULT: {} },
    };
    try {
      await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((res) => {
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
