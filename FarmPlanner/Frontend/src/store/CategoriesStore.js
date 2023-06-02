import axios from 'axios';
import { runInAction, makeAutoObservable, } from 'mobx'
import config from '../config';

class CategoriesStore {
    CategoriesLevel1 = [];
    CategoriesLevel2 = [];
    CategoriesLevel3 = [];
    constructor(){
        makeAutoObservable(this)
    }

    async GetAll(){
        const result = await axios.get(config.ApiUrl + '/api/categories')
        this.setCategoriesList(result.data)
    }

    async PostCategory(Level, Name, ParentId){
        await axios.post(config.ApiUrl + '/api/categories', {Level: Level, Name: Name, ParentId: ParentId})
        await this.getLevel1()
        await this.getLevel2()
        await this.getLevel3()
    }

    async setCategoriesList(categoriesList){
        this.CategoriesList = categoriesList
    }

    async getLevel1(){
        const result = await axios.get(config.ApiUrl + '/api/categories/1')
        runInAction(() => {this.CategoriesLevel1 = result.data})
    }

    async getLevel2(){
        const result = await axios.get(config.ApiUrl + '/api/categories/2')
        runInAction(() => {this.CategoriesLevel2 = result.data})
    }

    async getLevel3(){
        const result = await axios.get(config.ApiUrl + '/api/categories/3')
        runInAction(() => {this.CategoriesLevel3 = result.data})
    }

    async RemoveCategory(id){
        await axios.delete(config.ApiUrl + '/api/categories/' + id)
        await this.getLevel1()
        await this.getLevel2()
        await this.getLevel3()
    }
}

export default new CategoriesStore()