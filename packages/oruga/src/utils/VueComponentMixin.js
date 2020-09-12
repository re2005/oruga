import { isVue2, createElement, existsSlot, setScopedSlot, getSlotInstance } from './vue-utils'

export default {
    data() {
        return {
            vueReady: false
        }
    },
    computed: {
        listeners() {
            return isVue2() ? this.$listeners : this.$attrs
        }
    },
    methods: {
        existsSlot(name, scoped) {
            return existsSlot(this, name, scoped)
        },
        getSlotInstance(name, scoped, props) {
            return getSlotInstance(this, name, scoped, props)
        },
        setScopedSlot(name, value) {
            setScopedSlot(this, name, value)
        }
    },
    beforeCreate() {
        if (isVue2()) {
            this.vueReady = true
        } else {
            import('vue').then(vue => {
                this.$nextTick = vue['nextTick']
                this.$createElement = (tag, data, children) => {
                    return createElement(vue, tag, data, children)
                }
                this.vueReady = true
            })
        }
    }
}
