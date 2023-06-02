import axios from 'axios';
import { makeAutoObservable } from 'mobx'
import config from '../config';

class SeedStore {
    seedList = [];
    seedsById = [];
    constructor(){
        makeAutoObservable(this);
    }

    async postSeed(name,  rowId, quantity) {
        for (let i = 0; i < quantity; i++) {
        await axios.post(config.ApiUrl +'/api/seed/', {
            name: name,
            rowId: rowId
        })}
        this.fetchAll()
    }

    async updateSeed(id, name){
        await axios.put(config.ApiUrl +'/api/seed/', {
                id: id,
                name: name,
        });
    }

    async fetchById(id) {
        const result = await axios.get(config.ApiUrl +'/api/seed/' + id);
        this.seedsById = result.data
    }

    async fetchAll() {
        const result = await axios.get(config.ApiUrl +'/api/seed/');
        this.setSeedList(result.data)
    }
    
    setSeedList(seedList) {
        seedList.sort((a, b) => a.id - b.id);
        this.seedList = seedList;
      }
}

export default new SeedStore()