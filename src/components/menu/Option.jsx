import React from 'react'
import { inject, observer } from 'mobx-react'

const Option = inject('inputsStore', 'waiterStore', 'authenticationStore')(observer(({ inputsStore,index,option }) => {
    const{selectOption}=inputsStore
    return (
        <div style={{color: option.selected?"green":"black"} }
            onClick={()=>selectOption(index)}
        >
            <h4>{option.name} - {option.price}</h4>

        </div>
    )
}))

export default Option
