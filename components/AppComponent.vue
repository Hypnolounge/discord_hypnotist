<template>
    <v-card @click="goToApp">
        <v-img :src="app.image" max-height="250px"></v-img>
        <v-card-title>{{ app.name }}</v-card-title>
        <v-card-text>{{ app.description }}</v-card-text>
    </v-card>
</template>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            // data
        }
    },
    props: {
        app: {
            type: Object as PropType<HLApp>,
            required: true
        }
    },
    methods: {
        goToApp() {
            this.$router.push(this.app.route)
        }
    },
    mounted() {
        // mounted
    }
})
</script>