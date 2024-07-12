/** @format */
import { makeAutoObservable } from 'mobx'
class ToolStore {
    currentSelectedKey = []

    constructor() {
        makeAutoObservable(this)
    }

    setCurrentSelectedKey(key: string[]) {
        // this.currentSelectedKey = key
    }

    getCurrentSelectedKey(): string[] {
        const selectedKey = localStorage.getItem('selected_key')
        return selectedKey ? [selectedKey] : []
    }

    getCurrentOpenKey(): string[] {
        const openKey = localStorage.getItem('open_key')
        return openKey ? [openKey] : []
    }
}
const toolStore = new ToolStore()
export default toolStore
