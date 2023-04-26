import { useState } from 'react'
import { Parser } from 'expr-eval'
import BasicHistory from "@/components/BasicHistory";
import BasicKeyboard from "@/components/BasicKeyboard";
import BasicInput from "@/components/BasicInput";

const Home = () => {

  const [ history, setHistory ] = useState([])
  const [ equation, setEquation ] = useState('')
  const [ answer, setAnswer ] = useState('')

  const pushToHistory = (item) => {
    setHistory(h => [item, ...h])
  }

  const cleanEquation = (eq) => eq.replace(/[^\d\*\%\/\^\(\)\.!+-]/g, '')

  const handleVirtualKeyboard = (key) => {

    const el = document.getElementById('basic-calc-input-id')

    if(key === 'Enter') {
      pushToHistory({ equation: equation, answer: answer })
      setEquation(_ => '')
      setAnswer(_ => '')
    }
    else if(key === 'Left') {
      el.setSelectionRange(el.selectionEnd-1, el.selectionEnd-1)
      el.focus()
    }
    else if(key === 'Right') {
      el.setSelectionRange(el.selectionEnd+1, el.selectionEnd+1)
      el.focus()
    }
    else if(key === 'Back') {
      const pos = el.selectionEnd
      if(pos !== 0) {
        console.log(equation.slice(0, pos-1) + equation.slice(pos))
        setEquation(eq => eq.slice(0, pos-1) + eq.slice(pos))
      }
    }
    else {
      try {
        el.value += key
        setEquation(_ => cleanEquation(el.value)) 
        el.focus()
        let ans = Parser.evaluate(el.value)
        setAnswer(_ => '= ' + ans)
        document.getElementById('calc-ans').style.opacity = 100
      }
      catch(e){
        setAnswer(_ => '')
        document.getElementById('calc-ans').style.opacity = 0
      }
    }
  }

  const handleInput = (e) => {
    setEquation(_ => cleanEquation(e.target.value)) 
    let ans;
    try {
      ans = Parser.evaluate(e.target.value)
      setAnswer(_ => '= ' + ans)
      document.getElementById('calc-ans').style.opacity = 100
    }
    catch(e) {
      setAnswer(_ => '')
      document.getElementById('calc-ans').style.opacity = 0
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === "Enter" && equation !== '') {
      pushToHistory({ equation: equation, answer: answer })
      setEquation(_ => '')
      setAnswer(_ => '')
    }
  }

  return (
    <div className='calc-wrapper'>
      <div className='calc'>
        <div className='calc-top'>
          <BasicHistory history={history} setEquation={setEquation} setAnswer={setAnswer} />
          <BasicInput equation={equation} answer={answer} handleInput={handleInput} handleKeyDown={handleKeyDown} pushToHistory={pushToHistory} />
        </div>
        <BasicKeyboard handleVirtualKeyboard={handleVirtualKeyboard} />
      </div>
    </div>
  )
}

export default Home;