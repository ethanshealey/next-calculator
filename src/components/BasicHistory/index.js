import React from 'react'

const BasicHistory = (props) => {

  const handleHistoryClick = (eq, ans) => {
    props.setEquation(eq)
    props.setAnswer(ans)
  }

  return (
    <div className='basic-calc-history'>
      {
        props.history.map((h, i) => (
          <div key={`{i}`} className='history-item' onClick={() => handleHistoryClick(h?.equation, h?.answer)}>
            <div className='history-item-equation'>{ h?.equation }</div>
            <div className='history-item-answer'>{ h?.answer }</div>
          </div>
        ))
      }
    </div>
  )
}

export default BasicHistory