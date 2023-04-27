import React from 'react'
import { Button } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { FaBackspace, FaDivide, FaTimes, FaMinus, FaPlus, FaEquals } from "react-icons/fa"

const BasicKeyboard = (props) => {
  
  const handlePress = (key) => {
    props.handleVirtualKeyboard(key)
  }

  return (
    <div className='basic-calc-keyboard'>
      <div>
        <div id='numbers'>
          <span id="first-number-row">
            <Button onClick={() => handlePress('^')}><b>^</b></Button>
            <Button onClick={() => handlePress('/')} icon={<FaDivide />} />
            <Button onClick={() => handlePress('*')} icon={<FaTimes />} />
            
          </span>
          <span id="second-number-row">
            <Button onClick={() => handlePress('7')}>7</Button>
            <Button onClick={() => handlePress('8')}>8</Button>
            <Button onClick={() => handlePress('9')}>9</Button>
          </span>
          <span id="third-number-row">
            <Button onClick={() => handlePress('4')}>4</Button>
            <Button onClick={() => handlePress('5')}>5</Button>
            <Button onClick={() => handlePress('6')}>6</Button>
          </span>
          <span id="third-number-row">
            <Button onClick={() => handlePress('1')}>1</Button>
            <Button onClick={() => handlePress('2')}>2</Button>
            <Button onClick={() => handlePress('3')}>3</Button>
          </span>
          <span id='fourth-number-row'>
            <Button onClick={() => handlePress('0')} id="zero">0</Button>
            <Button onClick={() => handlePress('.')}>.</Button>
          </span>
        </div>
        <div id="sidebar">
          <span id='first-sidebar'>
            <Button onClick={() => handlePress('-')} icon={<FaMinus />} />
            <Button onClick={() => handlePress('+')} icon={<FaPlus />} />
            <Button onClick={() => handlePress('Enter')} icon={<FaEquals />} />
          </span>
          <span id='second-sidebar'>
          <Button onClick={() => handlePress('(')}>{'('}</Button>
          <Button onClick={() => handlePress(')')}>{')'}</Button>
            <Button onClick={() => handlePress('Left')}><ArrowLeftOutlined /></Button>
            <Button onClick={() => handlePress('Right')}><ArrowRightOutlined /></Button>
            <Button onClick={() => handlePress('Back')}><FaBackspace /></Button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default BasicKeyboard