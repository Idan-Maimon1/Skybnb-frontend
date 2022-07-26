
import stays from '../jsons/stay.json';
import {httpService} from './http.service.js';
import { storageService } from './async-storage-service'
const KEY = 'stays'
const FILTER = 'filterby'

const ENDPOINT = 'stay'

export const stayService = {
    query,
    saveFilterBy,
    getFilterBy,
    // getById,
    // remove,
    // save,
    // getEmptyToy,
    // getlabels,
}

async function query(filterBy = {}) {
    // storageService._save(KEY,stays)
    // var filteredStays =  await storageService.query(KEY)
    return filteredStays = await httpService.get(ENDPOINT,filterBy)
    // return filtering(filteredStays, filterBy)
}

function filtering(filteredStays, filterBy){
    var stayToFilter = filteredStays

    if(filterBy.where) {
        stayToFilter = stayToFilter.filter(function(stay)
        {
            var stayAdressValues = (JSON.stringify(Object.values(stay.address))).toLowerCase()
            let filter = stayAdressValues.includes((filterBy.where).toLowerCase())
            return filter
        })
    }
    if(filterBy.label) {
        stayToFilter = stayToFilter.filter((stay)=> stay.label === filterBy.label)
    }
    stayToFilter = stayToFilter.filter((stay)=> stay.capacity> (filterBy.adults + filterBy.children))
    
    return stayToFilter
}

async function saveFilterBy(filterBy){
    storageService._save(FILTER,filterBy)
}

async function getFilterBy(){
    return await storageService.query(FILTER)
}