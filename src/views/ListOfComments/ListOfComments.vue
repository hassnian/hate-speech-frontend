<template>
  <div>
    <b-spinner v-if="loading" variant="success" label="Spinning"></b-spinner>
    <b-list-group v-else-if="data" v-for="comment in data">
      <b-list-group-item v-if="comment.body !== '[deleted]'" button
        ><b>{{ comment.author }}</b> {{ comment.body }}</b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import data from "@/assets/data.js";

@Component
export default class SelectNetwork extends Vue {
  data = data;
  loading = true;

  created() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    data.forEach((comment: any) => console.log(comment));
  }
}
</script>
