import axios from 'axios'

const API_KEY = 'eWVLVEFmclpmU295eGpVUGRlUERGaG5KN2swTXlVZjVYbkluWVdUVg=='

const header = { headers: {"X-CSCAPI-KEY": API_KEY} }

export const getAllCountries = async () => {
    let countries
    await axios.get("https://api.countrystatecity.in/v1/countries", header)
    .then((result) => {
        countries = result.data
    }).catch((err) => {
        console.log(err)
    });
    return countries
}

export const getStatesByCountry = async (country) => {
    let states
    await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states`, header)
    .then(res => {
        states = res.data
    }).catch(err => console.log(err))
    return states
}

export const getCitiesByCountryAndState = async (country, state) => {
    let cities 
    await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, header)
    .then(res => {
        cities = res.data
    }).catch(err => console.log(err))
    return cities
}