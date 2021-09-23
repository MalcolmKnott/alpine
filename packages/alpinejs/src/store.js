import { reactive } from "./reactivity"
import { persist } from "../../persist/src/index"
import { interceptor, initInterceptors } from './interceptor'


let stores = {}
let isReactive = false

export function store(name, value) {

    if (! isReactive) { stores = reactive(stores); isReactive = true; }

    if (typeof value === 'function') {
        value = value.bind({
                '$persist': persist(null, {Alpine, interceptor})
            })()
    }

    if (value === undefined) {
        return stores[name]
    }

    stores[name] = value

    if (typeof value === 'object' && value !== null && value.hasOwnProperty('init') && typeof value.init === 'function') {
        stores[name].init()
    }
}

export function getStores() { return stores }