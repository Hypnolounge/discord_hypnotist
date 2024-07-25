<template>
  <v-container fluid>
    <v-alert type="info" outlined class="mx-auto"
      >You need to be in a channel that has a bot in it.</v-alert
    >
  </v-container>
</template>

<script lang="ts">
export default defineComponent({
  name: "Hypnotist",
  data() {
    return {
      joined: false,
      connection: null,
    };
  },
  async mounted() {
    const { status, data, send, open, close } = useWebSocket(
      "ws://localhost:3000/hypnotist",
      {
        heartbeat: {
          message: "ping",
          interval: 10000,
          pongTimeout: 1000,
        },
        onMessage: (event) => {
          console.log(data.value);
        },
      }
    );

    send("hello");
  },
});
</script>
