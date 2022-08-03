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
            const res = await authApi.user()
            return res.data
        },

        async csrf() {
            await authApi.csrf()
        },

        async login(form) {
            var error  = null

            const res = await authApi.login(form)
            if(res.status) {
                this.user = res.data
                this.token = res.data.token
            }

            return res
        }
    }
})
