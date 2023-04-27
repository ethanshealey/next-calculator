import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Input, Button } from 'antd';

const numToMonth = (mo) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mo%12]
const getMonth = (i) => `${numToMonth(new Date().getMonth()+i)} '${(parseInt(new Date().getFullYear()) + Math.floor(i/12)).toString().slice(2)}`

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Interest = () => {

  const [ initial, setInitial ] = useState('1000.00')
  const [ monthly, setMonthly ] = useState('100.00')
  const [ period, setPeriod ] = useState('12')
  const [ periodType, setPeriodType ] = useState('months')
  const [ rate, setRate ] = useState('4.15')

  const [ totalAmounts, setTotalAmounts ] = useState([])

  const changeTimePeriodType = (type) => {
    setPeriodType(_ => type)
    document.getElementById(type).classList.add('time-picker-item-active')
    if(type === 'months')
      document.getElementById('years').classList.remove('time-picker-item-active')
    else
      document.getElementById('months').classList.remove('time-picker-item-active')
  }

  const calculate = () => {

    let p = period
    let currAmt = parseFloat(initial)
    let currInt = 0
    let currCont = 0
    const totals = []

    if(periodType === 'years')
      p *= 12
    for(let i = 0; i < p; i++) {
      // for each month
      currAmt = Math.round((parseFloat(currAmt) * (1.0 + ((parseFloat(rate)/100.0)/12)) + parseFloat(monthly))*100)/100
      currInt = Math.round((parseFloat(currAmt) * ((parseFloat(rate)/100.0)/12)))
      if(totals.length !== 0) currInt += totals.slice(-1)[0].Interest
      currCont = Math.round(parseFloat(monthly) * (i+1))

      totals.push({ key: i, month: getMonth(i), Total: currAmt, Interest: currInt, Contributions: currCont })
    }
    setTotalAmounts(_ => totals)
    console.log(totals)
  }

  return (
    <div id='interest-wrapper'>
      <div id='interest'>
        <div id='interest-input-panel'>
          <h2>Initial deposit:</h2>
          <Input className='interest-input-dollar' addonBefore={'$'} defaultValue={'1000.00'} onChange={(e) => setInitial(_ => e.target.value)} />
          <h2>Monthly contribution:</h2>
          <Input className='interest-input-dollar' addonBefore={'$'} defaultValue={'100.00'} onChange={(e) => setMonthly(_ => e.target.value)} />
          <h2>Over a period of:</h2>
          <span id="interest-input-time-wrapper">
            <Input className='interest-input-time' defaultValue={'12'} onChange={(e) => setPeriod(_ => e.target.value)} />
            <div className='time-picker-item time-picker-item-active' id="months" onClick={() => changeTimePeriodType('months')}>Months</div>
            <div className='time-picker-item' id="years" onClick={() => changeTimePeriodType('years')}>Years</div>
          </span>
          <h2>APY:</h2>
          <Input className='interest-input-apy' addonAfter={'%'} defaultValue={'4.15'} onChange={(e) => setRate(_ => e.target.value)} />
          <Button id='calculate-interest' type='primary' onClick={calculate} >Calculate</Button>
        </div>
        <div id='interest-result-panel'>
          
          {  totalAmounts.length > 0 && (
            <>
              <span>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={500}
                    height={400}
                    data={totalAmounts}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Total" stroke="#1677ff" fill="#1677ff" />
                    <Area type="monotone" dataKey="Interest" stroke="#ffc658" fill="#ffc658" />
                    <Area type="monotone" dataKey="Contributions" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </span>
              <div id="interest-breakdown">
                <h2>Total savings breakdown:</h2>
                <hr />
                <h4 className='interest-breakdown-row'>
                  <div id='total-sq' />
                  <div>Total</div> 
                  <div>{ totalAmounts.length > 0 && formatter.format(totalAmounts?.slice(-1)[0].Total) }</div>
                </h4>
                <hr />
                <h4 className='interest-breakdown-row'>
                  <div id='interest-sq'></div> 
                  <div>Total Interest</div> 
                  <div>{ totalAmounts.length > 0 && formatter.format(totalAmounts?.slice(-1)[0].Interest) }</div>
                </h4>
                <hr />
                <h4 className='interest-breakdown-row'>
                  <div id='contributions-sq'></div> 
                  <div>Total Contributions</div> 
                  <div>{ totalAmounts.length > 0 && formatter.format(totalAmounts?.slice(-1)[0].Contributions) }</div>
                </h4>
              </div>
            </>
            
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Interest