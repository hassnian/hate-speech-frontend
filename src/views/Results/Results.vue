<template>
  <div>
    <p>{{ msg }}</p>
    <h1>{{ severity }}</h1>
    <p v-if="listOfWords.length>0">
      <template v-for="word in listOfWords">
        <span v-if="word.bad" style="color: red">
        <BadWord :word="word.word" />
        </span>
        <span v-else-if="!word.bad">{{word.word}} </span>
      </template>
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import BadWord from '@/components/BadWord/BadWord.vue';

const unirest = require('unirest');

@Component({
    components:{ BadWord },
})
export default class Results extends Vue {
  msg = '';

  url = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAks8WXGgBb7YQvlDwzZz3DKDPrjDFcFlE';

  msgBadWords = [];


  listOfWords = [];

  badWords = [
    'bitch',
    'fuck',
  ];

  severity = 0;

  created() {
    this.msg = this.$store.state.msg;
    this.msgBadWords = this.msg.split(' ');

    this.checkSeverity();
    // this.checkBadWords();
    this.compareBadWords();
  }

  compareBadWords() {
    this.msgBadWords.forEach((word) => {
      if (this.badWords.includes(word)) {
        this.listOfWords.push({ bad: true, word });
        return;
      }
      this.listOfWords.push({ bad: false, word });
    });
    console.log(this.listOfWords);
  }

  async checkBadWords() {
    const req = unirest('POST', 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter');
    req.headers({
      'x-rapidapi-host': 'neutrinoapi-bad-word-filter.p.rapidapi.com',
      'x-rapidapi-key': '44e9c4b8e5msh299ddc8f297da61p17b459jsn405f416842bc',
      'content-type': 'application/x-www-form-urlencoded',
    });

    req.form({
      'censor-character': '*',
      content: this.msg,
    });

    req.end((res) => {
      if (res.error) throw new Error(res.error);
      this.badWords = res.body['bad-words-list'];
      console.log(res.body);
    });
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
        });
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
