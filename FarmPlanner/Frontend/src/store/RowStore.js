import axios from 'axios';
import { makeAutoObservable, } from 'mobx'
import config from '../config';

class RowStore {
    rowList = [];
    rowById = [];
    currRowIds = [];
    constructor(){
        makeAutoObservable(this);
    }

    async postRow(name, description, quantity, fieldId) {
        const result = await axios.post(config.ApiUrl +'/api/row/', {
            name: name,
            description: description,
            quantity: quantity,
            fieldId: fieldId,
        });
        this.setRowList(result.data)
    }

    async deleteRow(id) {
        await axios.delete(config.ApiUrl +'/api/row/' + id);
    }

    async UpdateRow(id, name, description, quantity, length, width){
        await axios.put(config.ApiUrl +'/api/row/', {
                id: id,
                name: name,
                description: description,
                quantity: quantity,
                length: length,
                width: width
        });
    }

    async fetchById(id) {
        this.currRowIds = []
        const result = await axios.get(config.ApiUrl +'/api/row/' + id);
        result.data.map((row) => {
            this.currRowIds.push(row.id)
        })
        this.setRowById(result.data)
    }

    async fetchAll() {
        const result = await axios.get(config.ApiUrl +'/api/row/');
        this.setRowList(result.data)
    }
    
    setRowById(rowList) {
        rowList.sort((a, b) => a.id - b.id);
        this.rowById = rowList;
    }
    setRowList(rowList) {
        this.rowList = rowList;
    }
}

export default new RowStore();