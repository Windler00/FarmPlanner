import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx'
import config from '../config';
import RowStore from './RowStore';
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

    async updateSeed(id, name, day , month, year,  isPlanted, length, height, width,){
        await axios.put(config.ApiUrl +'/api/seed/', {
            id: id,
            name: name,
            dateYear: year,
            dateMonth: month,
            dateDay: day,
            isPlanted: isPlanted,
            length: length,
            height: height,
            width: width,
        });
        this.fetchByIds();
    }

    async fetchByIds() {
        this.seedsById = new Array()
        for(const id of RowStore.currRowIds){
            let result = await axios.get(config.ApiUrl +'/api/seed/'+ id)
            await result.data.sort((a, b) => a.id - b.id)
            await result.data.map(async (seed) => {
                runInAction(() => {this.seedsById.push(seed)})
            })
        }
    }

    async fetchAll() {
        const result = await axios.get(config.ApiUrl +'/api/seed/');
        runInAction(() => {this.setSeedList(result.data)})
    }
    
    setSeedList(seedList) {
        seedList.sort((a, b) => a.id - b.id);
        this.seedList = seedList;
      }
}

export default new SeedStore()