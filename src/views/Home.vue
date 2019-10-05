<template>
  <div>
    <div>
      <SelectNetwork />
    </div>
    <hr>
    <div>
      <Submit />
    </div>
  
  </div>
  
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SelectNetwork from '@/components/SelectNetwork.vue'; // @ is an alias to /src
  import Submit from '@/components/Submit.vue';

  @Component({
    components: {
      SelectNetwork,
      Submit
    },
  })
  export default class Home extends Vue {}
</script>
