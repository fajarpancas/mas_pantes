import NavigationServices from "../Services/NavigationServices"

class PopUpHolder {
    instance = undefined

    constructor() {
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.setInstance = this.setInstance.bind(this)
    }

    setInstance(instance) {
        this.instance = instance
    }

    show(type) {
        console.tron.error({ ins: this.instance })
        if (this.instance) {
            const activeScreen = NavigationServices.getActiveScreenAndParams()
            if (activeScreen) {
                const { topRoute } = activeScreen
                if (topRoute && ((topRoute.routeName === 'App') || (topRoute.routeName === 'AppSalesStack'))) {
                    this.instance.show(type)
                }
            }
        }
    }

    hide() {
        if (this.instance) {
            this.instance.hide()
        }
    }
}

export default new PopUpHolder()