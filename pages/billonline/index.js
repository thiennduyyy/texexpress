import React, { useEffect, useState } from 'react'
import { useReducer } from 'react'
import Header from '../../components/Header'
import { getChargeWeight } from '../../lib/functions'
import * as yup from 'yup'
import axios from 'axios'
import { Country, State, City} from 'country-state-city'
import { getAllCountries, getStatesByCountry, getCitiesByCountryAndState } from '../api/location'

// let countries = Country.getAllCountries().map((country) => {
//   return {name: country.name,
//   isoCode: country.isoCode}
// })

const reducer = (state, action) => {
    state[action.field]= action.payload
    return {...state}
}
const packReducer = (state, action) => {
  if (action.change === 'add') {
      return [...state, {length: '', width: '', height: '', weight: '', chargeWeight: ''}]
  } else if (action.change === 'delete') {
      const newState = state.filter((input,index) => index != action.index)
      return [...newState]
  } else if (['weight', 'height', 'length', 'width'].includes(action.change)) {
    let {weight, height, width, length} = state[action.index]
    let chargeWeight = getChargeWeight(height, length, width, weight)
    state[action.index]['chargeWeight'] = chargeWeight
    state[action.index][action.change] = action.payload
    return [...state]
}}

const infoInputList = [
  {
    field: 'companyName',
    name: 'Company name'
  },
  {
    field: 'contactName',
    name: 'Contact name'
  },
  {
    field: 'address',
    name: 'Address'
  },
  {
    field: 'telNumber',
    name: 'Tel number'
  },
  {
    field: 'taxCode',
    name: 'Tax code'
  },
  {
    field: 'email',
    name: 'Email'
  },
  {
    field: 'country',
    name: 'Country'
  }
]
const receiverInputList = [
  {
    field: 'receiverName',
    name: 'Receiver name'
  },
  {
    field: 'receiverTel',
    name: 'Receiver tel'
  },
  {
    field: 'taxId',
    name: 'Tax ID'
  },
  {
    field: 'receiverEmail',
    name: 'Receiver email'
  },
  {
    field: 'postalCode',
    name: 'Postal code'
  },
  {
    field: 'receiverAddress',
    name: 'Address'
  }
]

const docInputList = [
  {
    field: 'packagesAmount',
    name: 'Packages amount'
  },
  {
    field: 'weight',
    name: 'Weight'
  }
]



const inputClass = 'block m-2 focus:outline-none border-2 p-1 rounded border-zinc-900 w-4/6'

function DocInput({ docInput, dispatchDoc }) {
  return (
    <>
      {docInputList.map((input, index) => 
        <div key={index} className='flex justify-between'>
          <p className='my-auto inline-block w-32'>{input.name}:</p>
          <input value={docInput[input.field]} onChange={(e) => dispatchDoc({field: input.field, payload: e.target.value})} className={inputClass}/>
        </div>
      )}
      {/* <input value={docInput.weight} onChange={(e) => dispatchDoc({field: 'weight', payload: e.target.value})} className={inputClass} placeholder='Weight'/> */}
    </>
  )
}


function PackInput({packInput, dispatchPack}) {
  return (
    <div className='w-full'>
      {packInput?.map((product, index) =>
          // product.chargeWeight = ((product.length * product.width * product.height)/5000 > product.weight) ? ((product.length * product.width * product.height)/5000) : product.weight 
            (<div key={index} className='flex justify-between'>
              <div className='flex'>
                <p className='my-auto'>Length:</p>
                <input className={inputClass}
                    value={product.length}
                    onChange={(e) => dispatchPack({payload: e.target.value, index, change: 'length'})}
                />
              </div>
              <div className='flex'>
                <p className='my-auto'>Width:</p>
                <input className={inputClass}
                    value={product.width}
                    onChange={(e) => dispatchPack({payload: e.target.value, index, change: 'width'})}
                />
              </div>
              <div className='flex'>
                <p className='my-auto'>Height:</p>
                <input className={inputClass}
                    value={product.height}
                    onChange={(e) => dispatchPack({payload: e.target.value, index, change: 'height'})}
                />
              </div>
              <div className='flex'>
                <p className='my-auto'>Weight:</p>
                <input className={inputClass}
                    value={product.weight}
                    onChange={(e) => dispatchPack({payload: e.target.value, index, change: 'weight'})}
                />
              </div>
              <p className='block mx-2 my-auto'>{product.chargeWeight}</p>
              <button className='mr-2 h-auto w-auto text-center my-4 border-2 rounded px-2 border-zinc-900' onClick={() => dispatchPack({ index, change: 'delete'})}>Delete</button>
            </div>)
        
      )}
      <button className='mt-4 border-2 rounded border-zinc-900 px-2' onClick={() => dispatchPack({change: 'add'})}>Add new product</button>
    </div>
)
}



export default function BillOnline({countries, initStates, initCities}) {
  
  let yupShipperInput = yup.object().shape({
    companyName: yup.string().required('Company name is required'),
    contactName: yup.string().required('Contact name is required'),
    address: yup.string().required('Adress is required'),
    telNumber: yup.number().required('Telephone number is required').typeError('Telephone number must be numbers'),
    taxCode: yup.string(),
    email: yup.string().required('Email is required').email('Email is invalid'),
    country: yup.string().required('Country is required'),
    type: yup.string().required(),
    receiverCountry: yup.string().required('Receiver country is required'),
    receiverName: yup.string().required('Receiver name is required'),
    receiverTel: yup.number().required('Receiver tel number is required').typeError('Telephone number invalid (must be numbers)'),
    receiverEmail: yup.string().email('Email is invalid'),
    receiverAddress: yup.string().required('Receiver address is required'),
    taxId: yup.string(),
    postalCode: yup.string(),
    state: yup.string(),
    city: yup.string().required('City is required'),
  })

  const handleToggleType = (e) => {
    dispatchInfo({field: 'type', payload: e.target.innerText})
  }
  let infoInputInitData = {
      companyName: '',
      contactName: '',
      address: '',
      telNumber: '',
      taxCode: '',
      email: '',
      country: '',
      type: 'DOC'
  }
  let receiverInputInitData = {}
  receiverInputList.forEach((input) => {
    receiverInputInitData[input.field] = ''
  })
  
  let docInitData = {
    packagesAmount: '',
    weight: ''
  }
  let packInitData = [
    {
        length: '',
        width: '',
        height: '',
        weight: '',
        chargeWeight: ''
    }
  ]
  const [states, setStates] = useState(initStates)
  const [cities, setCities] = useState(initCities)
  const [locationInfo, setLocationInfo] = useState({receiverCountry: countries[0].name, state: initStates[0].name, city: initCities[0].name})
  const [invalidList, setInvalidList] = useState({})
  const [infoInput, dispatchInfo] = useReducer(reducer, infoInputInitData)
  const [receiverInput, dispatchReceiverInfo] = useReducer(reducer, receiverInputInitData)
  const [docInput, dispatchDoc] = useReducer(reducer, docInitData)
  const [packInput, dispatchPack] = useReducer(packReducer, packInitData)

  useEffect(() => {
    document.title = 'TEX Express - Online bill'
  }, [])

  const handleChangeCountry = async (e) => {
    let country = countries.find((country) => country.name === e.target.value)

    let states = await getStatesByCountry(country.iso2)
    setStates(states)
    let cities = await getCitiesByCountryAndState(country.iso2, states[0].iso2)
    setCities(cities ? cities : [])
    setLocationInfo({receiverCountry: country.name, state: states[0].name, city: cities ? cities[0].name : ''})
  }

  const handleChangeState = async (e) => {
    let state = states.find((state) => state.name === e.target.value)
    let country = countries.find((country) => country.name === locationInfo.receiverCountry)
    let cities = await getCitiesByCountryAndState(country.iso2, state.iso2) 
    setCities(cities ? cities : [])
    console.log(cities)
    setLocationInfo({...locationInfo, state: state.name, city: cities ? (cities.length ? cities[0].name : '') : ''})
  }

  const submitForm = async () => {
    console.log(locationInfo)
    let invalid = {}
    await yupShipperInput.validate({...infoInput, ...receiverInput}, {
      abortEarly:false
    })
    .catch(err => {err.inner.map((error) => invalid[error.path] = error.message )})
    setInvalidList(invalid)
  }
    
  return (
    <>
    <Header/>
    <div className='mt-16 mx-auto w-1/2'>
      <div className='w-full flex justify-between'>
        <div className='w-5/12 mr-4'>
          {infoInputList.map((input, index) =>
            <div key={index}>
              <div  className='flex justify-between'>
                <p className='my-auto inline-block w-32'>{input.name}:</p>
                <input value={infoInput[input.field]} onChange={(e) => dispatchInfo({field: input.field, payload: e.target.value})} className={inputClass}/>
              </div>
              <p className='text-sm text-red-500'>{invalidList[input.field]}</p>
            </div> 
          )}
        </div>
        <div className='w-5/12'>
          {receiverInputList.map((input, index) =>
            <div key={index}>
              <div className='flex justify-between'>
                <p className='my-auto inline-block w-32'>{input.name}:</p>
                <input value={receiverInput[input.field]} onChange={(e) => dispatchReceiverInfo({field: input.field, payload: e.target.value})} className={inputClass}/>
              </div>
              <p className='text-sm text-red-500'>{invalidList[input.field]}</p>
            </div>
          )}
          <div className='flex justify-between'>
            <p className='my-auto inline-block w-32'>Country:</p>
            <select className={inputClass} value={locationInfo.receiverCountry} onChange={handleChangeCountry}>
              {countries.map((country) => 
                <option value={country.name}>{country.name}</option>
              )}
            </select>
          </div>
          <div className='flex justify-between'>
            <p className='my-auto inline-block w-32'>State:</p>
            <select className={inputClass} value={locationInfo.state} onChange={handleChangeState}>
              {states && states.map((state, index) => 
                <option key={index} value={state.name}>{state.name}</option>
              )}
            </select>
          </div>
          <div className='flex justify-between'>
            <p className='my-auto inline-block w-32'>City:</p>
            <select className={inputClass} value={locationInfo.city} onChange={(e) => setLocationInfo({...locationInfo, city: e.target.value})}>
              {cities && cities.map((city) => 
                <option value={city.name}>{city.name}</option>
              )}
            </select>
          </div>
        </div>
      </div>
      <div className='w-full mt-16'>
        <button onClick={handleToggleType} className={`h-auto w-auto text-center my-4 border-2 rounded px-2 border-zinc-900 ${infoInput.type==='DOC' ? 'bg-black text-white' : ''}`}>DOC</button>
        <button onClick={handleToggleType} className={`h-auto w-auto text-center m-4 border-2 rounded px-2 border-zinc-900 ${infoInput.type==='PACK' ? 'bg-black text-white' : ''}`}>PACK</button>
        {infoInput.type ==='DOC' ? 
          <DocInput docInput={docInput} dispatchDoc={dispatchDoc}/>
        : <PackInput packInput={packInput} dispatchPack={dispatchPack}/>
        }
        <button onClick={submitForm} className={`h-auto w-auto text-center mt-8 border-2 rounded px-2 border-zinc-900`}>Submit</button>
      </div>
    </div>
    </>
  )
}
export async function getServerSideProps(context) {
  const countries = await getAllCountries()
  const initStates = await getStatesByCountry(countries[0].iso2)
  const initCities = await getCitiesByCountryAndState(countries[0].iso2, initStates[0].iso2)
  return {
    props: {countries, initStates, initCities}, 
  }
}