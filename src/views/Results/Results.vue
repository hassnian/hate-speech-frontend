<template>
  <div>
<<<<<<< Updated upstream
    <p>{{msg}}</p>
    <h1>{{ severity }}</h1>
=======
    <h1>{{severity}}</h1>
>>>>>>> Stashed changes
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Results extends Vue {
<<<<<<< Updated upstream
  msg = '';

  url =
    'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAks8WXGgBb7YQvlDwzZz3DKDPrjDFcFlE';
=======
  msg = 'The site states "What can I use it for? Meeting notes, Reports, technical specs Sign-up sheets, proposals and much more...", just like any other new breeed of sites that want us to store everything we have on the web. And they even guarantee multiple levels of security and encryption etc. But what prevents these web site operators fom accessing and/or stealing Meeting notes, Reports, technical specs Sign-up sheets, proposals and much more, for competitive or personal gains...? I am pretty sure that most of them are honest, but what\'s there to prevent me from setting up a good useful site and stealing all your data? Call me paranoid - I am.';

  url ='https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAks8WXGgBb7YQvlDwzZz3DKDPrjDFcFlE';

>>>>>>> Stashed changes

  severity = 0;

  created() {
<<<<<<< Updated upstream
    this.msg = this.$store.state.msg;
    this.checkSeverity();
    console.log(this.$store.state.msg);
=======
    this.checkSeverity();
>>>>>>> Stashed changes
  }

  async checkSeverity() {
    const body = {
      comment: { text: this.msg },
      languages: ['en'],
<<<<<<< Updated upstream
      requestedAttributes: { TOXICITY: {}, INSULT: {} },
=======
      requestedAttributes: { TOXICITY: {} , INSULT:{}},
>>>>>>> Stashed changes
    };
    try {
      await fetch(this.url, {
        method: 'POST',
<<<<<<< Updated upstream
        body: JSON.stringify(body),
=======
        body:JSON.stringify(body),
>>>>>>> Stashed changes
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
<<<<<<< Updated upstream
        .then((res) => {
          console.log(res);
          this.severity = res.attributeScores.TOXICITY.summaryScore.value;
=======
        .then(res => {
            console.log(res);
            this.severity= res.attributeScores.TOXICITY.summaryScore.value
>>>>>>> Stashed changes
        });
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
