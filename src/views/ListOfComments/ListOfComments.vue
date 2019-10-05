<template>
  <div>
    <b-spinner v-if="loading" variant="success" label="Spinning"></b-spinner>
    <b-list-group v-else-if="data" v-for="comment in data">
      <b-list-group-item v-if="comment.body !== '[deleted]'" button
         @click="selectText(comment.body)"><b>{{ comment.author }}</b> {{ comment.body }}</b-list-group-item
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

  selectText(msg:string){
     this.$store.commit("changeMsg",msg);
      this.$router.push("/results")
  }

  created() {
    setTimeout(() => {
      this.loading = false;
    }, 0); //TODO : change to 3000
    data.forEach((comment: any) => console.log(comment));
  }
}
</script>
