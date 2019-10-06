<template>
  <div>
    <h1>trends</h1>
    <div v-html="html">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Trends extends Vue {
    html =""
  async created() {
    await this.getTrends();
  }
  async getTrends() {
    try {
      const { data } = await axios.get(
        "http://api.scraperapi.com?api_key=da1c02a9778a69098da6f0ebdfc4faff&url=https://twitter.com/search?q=lang%3Aen&src=typed_query"
      );
      this.html = data
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
