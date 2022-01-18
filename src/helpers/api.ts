import axios from 'axios'
import { useCookie } from 'vue-cookie-next'


export interface PaginatedResponse<T> {
	currentPage: number | null
	data: T[]
	limit: number | null
	total: number | null
}

export type ApiMethods = {
	setToken: (token: string) => void
	getToken: () => string | null
	get: (url: string) => Promise<any>
	post: <T>(url: string, data?: T) => Promise<any>
	patch: <T>(path: string, data: Partial<T>) => Promise<any>
	delete: <T>(url: string, data?: T) => Promise<any>
}

export default class APi implements ApiMethods {
	// private static instance: APi
	axios
	baseUrl
	constructor(token: string) {
		this.axios = axios.create({
			baseURL: import.meta.env.VITE_API_URL as string,
			headers: {
				"Content-Type": "application/json",
			}
		})
		this.baseUrl = import.meta.env.VITE_API_URL
		this.setTokenFromCookie(token)
	}

	private setTokenFromCookie(token: string): void {
		this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}

	setToken(token: string) {
		this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		return this
	}

	getToken(): string | null {
		const cookies = useCookie()
		return cookies.getCookie('userToken')
	}

	public deleteCredentials() {
		this.axios.defaults.headers.common['Authorization'] = ''
	}

	async get(path: string): Promise<any> {
		const res = await this.axios.get(`${this.baseUrl}${path}`)
		return res.data
	}

	async post<T>(path: string, data: T): Promise<any> {
		const res = await this.axios.post(`${this.baseUrl}${path}`, data)
		return res.data
	}

	async patch<T>(path: string, data: Partial<T>): Promise<any> {
		const res = await this.axios.patch(`${this.baseUrl}${path}`, data)
		return res.data
	}

	async delete(path: string): Promise<any> {
		const res = await this.axios.delete(`${this.baseUrl}${path}`)
		return res.data
	}
}