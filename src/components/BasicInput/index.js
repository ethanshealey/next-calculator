import { useState } from 'react'

const BasicInput = (props) => {
  return (
    <div className='basic-calc-input'>
      <input value={props.equation} onChange={props.handleInput} onKeyDown={props.handleKeyDown} readonly="readonly" id='basic-calc-input-id' />
      <div className='basic-calc-answer' id='calc-ans'>{ props.answer }</div>
    </div>
  )
}

export default BasicInput