<template>
	<q-btn @click="getUser">Get User</q-btn>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	import { api } from 'boot/axios'
	import { useQuasar } from 'quasar'

	export default defineComponent({
		name: 'App',

		setup() {
			const $q = useQuasar()

			const form = {
				email: "test@example.com",
				password: "password"
			}

			const login = () => {
				api.post("/api/login", form)
			}

			const getUser = () => {
				api.get("/api/user")
			}

			api.get("/sanctum/csrf-cookie").then(() => {login()})
			.catch(() => {
				$q.notify({
					color: 'negative',
					position: 'top',
					message: 'Loading failed',
					icon: 'report_problem'
				})
			})

			return {getUser}
		}
	})
</script>
