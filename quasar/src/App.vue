<template>
	<router-view></router-view>
</template>

<script>
	import { defineComponent } from 'vue'
	import { useAuthStore } from 'stores/auth'
	import { useRouter } from 'vue-router'

	export default defineComponent({
		name: 'App',

		setup() {
			const authStore = useAuthStore()
			const router = useRouter()

			authStore.csrf()
			authStore.getUser().then(user => {
				if(!user.status) {
					router.push("/login")
				}
			})

			return {}
		}
	})
</script>
