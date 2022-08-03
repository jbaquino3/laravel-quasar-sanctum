import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAuthStore = defineStore('counter', {
    state: () => ({
        user: null,
        token: null
    }),

    getters: {
        
    },

    actions: {
        async getUser() {
            const res = await api.get('/api/user')
            return res.data
        },

        async csrf() {
            await api.get("/sanctum/csrf-cookie")
        },

        async login(form) {
            var error  = null

            const res = await api.post("/api/login", form).catch(err => {
                error = err;
            })

            if(!error) {
                this.user = res.data
                this.token = res.data.token
                return {
                    status: true,
                    data: res.data
                }
            } else {
                if(error.response.data ) {
                    if(typeof error.response.data === 'object') {
                        return {
                            status: false,
                            error: error.response.data.message
                        };
                    } else {
                        return {
                            status: false,
                            error: error.response.data
                        };
                    }
                } else {
                    return {
                        status: false,
                        error: error.message
                    };
                }
            }
        }
    }
})
