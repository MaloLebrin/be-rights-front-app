import { defineStore } from "pinia";
import { EntitiesEnum } from "../../types/globals";
import createActions from "../utils/createActions";
import createGetters from "../utils/createGetters";
import { eventState } from "./state";
import { EventState, EventType } from "./types";

export const useEventStore = defineStore(EntitiesEnum.EVENTS, {
	state: (): EventState => ({
		...eventState
	}),
	actions: {
		...createActions<EventType>(eventState),
	},
	getters: {
		...createGetters<EventType>(eventState),
	}
})