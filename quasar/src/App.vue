<template>
	<router-view></router-view>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	import { api } from 'boot/axios'

	export default defineComponent({
		name: 'App',

		setup() {
			api.get("/sanctum/csrf-cookie")

			return {}
		}
	})
</script>
