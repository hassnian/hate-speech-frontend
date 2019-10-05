<template>
  <div>
    <p>{{msg}}</p>
    <h1>{{ severity }}</h1>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Results extends Vue {
  msg = '';

  url =
    'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAks8WXGgBb7YQvlDwzZz3DKDPrjDFcFlE';

  severity = 0;

  created() {
    this.msg = this.$store.state.msg;
    this.checkSeverity();
    console.log(this.$store.state.msg);
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
          console.log(res);
          this.severity = res.attributeScores.TOXICITY.summaryScore.value;
        });
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
