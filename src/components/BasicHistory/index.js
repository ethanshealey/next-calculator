import React from 'react'

const BasicHistory = (props) => {
  return (
    <div className='basic-calc-history'>
      {
        props.history.map((h) => (
          <div className='history-item'>
            <div className='history-item-equation'>{ h?.equation }</div>
            <div className='history-item-answer'>{ h?.answer }</div>
          </div>
        ))
      }
    </div>
  )
}

export default BasicHistory