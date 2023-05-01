import { makeAutoObservable, } from 'mobx'

class LeftBarStore {
    isActive = false;
    constructor(){
        makeAutoObservable(this)
    }

    setActive(){
        this.isActive = true;
    }
    setInactive(){
        this.isActive = false;
    }
}

export default new LeftBarStore()