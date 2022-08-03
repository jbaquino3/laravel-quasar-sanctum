<template>
	<router-view />
</template>

<script>
	import { defineComponent, ref } from 'vue'
	import { api } from 'boot/axios'
	import { useQuasar } from 'quasar'

	export default defineComponent({
		name: 'App',

		setup() {
			const $q = useQuasar()

			api.get("/sanctum/csrf-cookie").catch(() => {
				$q.notify({
					color: 'negative',
					position: 'top',
					message: 'Loading failed',
					icon: 'report_problem'
				})
			})
		}
	})
</script>
