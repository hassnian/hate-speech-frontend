<template>
  <span>
    <span :id="uuid">
      {{word}}
    </span>
    <b-tooltip :target="uuid">Bad word</b-tooltip>
      </span>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import uuid from "uuid/v4"
    @Component
    export default class BadWord extends Vue {
        @Prop() readonly word !: string

        uuid = uuid()

    }
</script>
