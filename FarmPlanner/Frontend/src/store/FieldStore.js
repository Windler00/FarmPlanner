import axios from 'axios';
import { makeAutoObservable, } from 'mobx'
import config from '../config';

class FieldStore {
    fieldList = [];
    fieldById = null;
    constructor(){
        makeAutoObservable(this);
    }

    async postField(name, description) {
        await axios.post(config.ApiUrl + '/api/field/',{
            name: name,
            description: description
        })
        await this.fetchAll()
    }

    async fetchById(id) {
        const result = await axios.get(config.ApiUrl +'/api/field/' + id);
        this.setFieldById(result.data)
    }

    async fetchAll() {
        const result = await axios.get(config.ApiUrl +'/api/field/');
        this.setFieldList(result.data)
    }

    async DeleteField(id){
        await axios.delete(config.ApiUrl +'/api/field/' + id);
        await this.fetchAll()
    }

    async UpdateField(id, name, description){
        await axios.put(config.ApiUrl +'/api/field/', {
                id: id,
                name: name,
                description: description
        });
        this.fetchAll()
    }
    
    setFieldById(fieldList) {
        this.fieldById = fieldList;
    }
    setFieldList(fieldList) {
        this.fieldList = fieldList;
    }
}

export default new FieldStore();