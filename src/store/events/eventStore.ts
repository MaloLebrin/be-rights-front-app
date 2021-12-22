import { defineStore } from "pinia"
import { EntitiesEnum } from "@/types/globals"
import createActions from "@/store/utils/createActions"
import createGetters from "@/store/utils/createGetters"
import { eventState } from "./state"
import { EventState, EventType } from "./types"
import APi, { PaginatedResponse } from "@/helpers/api"
import { useMainStore, useUserStore } from "@/store/index"

export const useEventStore = defineStore(EntitiesEnum.EVENTS, {
	state: (): EventState => ({
		...eventState
	}),
	getters: {
		...createGetters<EventType>(eventState),
		getEventsByUserId: (state) => {
			return (userId: number) => Object.values(state.entities.byId).filter(event => event.createdByUser === userId)
		},
		getOne(state) {
			return (id: number) => state.entities.byId[id]
		},
	},
	actions: {
		...createActions<EventType>(eventState),
		async fetchOne(id: number) {
			const userStore = useUserStore()
			const api = new APi(userStore.entities.current?.token!)
			const res = await api.get(`event/${id}`)
			const event = res as EventType
			if (this.getAllIds.includes(event.id)) {
				this.createOne(event)
			}
		},

		async fetchAll(search?: string, page?: number, limitPerPage?: number, totalEvent?: number) {
			const mainStore = useMainStore()
			const userStore = useUserStore()
			const api = new APi(userStore.entities.current?.token!)
			try {
				mainStore.toggleIsLoading()
				const res: any = await api.get(`event`)
				const { currentPage, data, limit, total }: PaginatedResponse<EventType> = res
				const ids = data.map((event: EventType) => event.id).filter(id => !this.getAllIds.includes(id))
				if (ids.length > 0) {
					const events = data.filter(event => ids.includes(event.id))
					this.createMany(events)
				}
				console.log(res, 'res.data')

			} catch (error) {
				console.error(error)
			}
			mainStore.toggleIsLoading()
		},

		async fetchAllByUserId(userId: number) {
			const userStore = useUserStore()
			const api = new APi(userStore.entities.current?.token!)
			try {
				const res = await api.get(`event/user/${userId}`)
				const { data }: { data: EventType[], count: number } = res
				if (data.length > 0) {
					const ids = data.map(event => event.id).filter(id => !this.getAllIds.includes(id))
					if (ids.length > 0) {
						const events = data.filter(event => !ids.includes(event.id))
						this.createMany(events)
					}
				}
			} catch (error) {
				console.error(error)
			}
		}

	},
})

