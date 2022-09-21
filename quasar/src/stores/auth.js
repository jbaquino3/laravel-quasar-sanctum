import { defineStore } from 'pinia'
import * as authApi from 'api/auth.js'

export const useAuthStore = defineStore('counter', {
    state: () => ({
        user: null,
        token: null
    }),

    getters: {
        
    },

    actions: {
        async getUser() {
            return await authApi.user()
        },

        async csrf() {
            await authApi.csrf()
        },

        async login(form) {
            const res = await authApi.login(form)
            if(res.status) {
                this.user = res.data
                this.token = res.data.token
            }

            return res
        },

        async register(form) {
            const res = await authApi.register(form)
            if(res.status) {
                const authStore = useAuthStore()
                await authStore.login(form)
            }

            return res
        }
    }
})
