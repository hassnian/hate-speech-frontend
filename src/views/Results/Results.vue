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
  msg = 'The site states "What can I use it for? Meeting notes, Reports, technical specs Sign-up sheets, proposals and much more...", just like any other new breeed of sites that want us to store everything we have on the web. And they even guarantee multiple levels of security and encryption etc. But what prevents these web site operators fom accessing and/or stealing Meeting notes, Reports, technical specs Sign-up sheets, proposals and much more, for competitive or personal gains...? I am pretty sure that most of them are honest, but what\'s there to prevent me from setting up a good useful site and stealing all your data? Call me paranoid - I am.';

  url ='https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAks8WXGgBb7YQvlDwzZz3DKDPrjDFcFlE';


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
