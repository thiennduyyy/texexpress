import React from 'react'
import { useReducer, memo } from 'react'


function Input() {
    const handleSubmit = () => {
        console.log(state)
    }
    const reducer = (state, action) => {
        if (action.change === 'length') {
            state[action.index].length = action.payload
            return [...state]
        } else if (action.change === 'width') {
            state[action.index].width = action.payload
            return [...state]
        } else if (action.change === 'add') {
            return [...state, {length: '', width: ''}]
        }
    }
    let defaultData = [
        {
            length: '',
            width: ''
        }
    ]
    const [state, dispatch] = useReducer(reducer, defaultData)
    console.log('rerender')
  return (
    <>
        {state?.map((product, index) => 
            <div>
                <input placeholder='Chiều dài'
                    value={product.length}
                    onChange={(e) => dispatch({payload: e.target.value, index, change: 'length'})}
                />
                <input placeholder='Chiều rộng'
                    value={product.width}
                    onChange={(e) => dispatch({payload: e.target.value, index, change: 'width'})}
                />
            </div>
        )}
        <button onClick={() => dispatch({change: 'add'})}>Add new product</button>
        <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
export default memo(Input)