import { useState } from 'react'
import { Input, Button } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const numToMonth = (mo) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mo%12]
const getDateString = (i) => `${numToMonth(new Date().getMonth()+i)} '${(parseInt(new Date().getFullYear()) + Math.floor((i + new Date().getMonth())/12)).toString().slice(2)}`

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Loan = () => {

  const [ loanAmt, setLoanAmt ] = useState('10000')
  const [ extraAmt, setExtraAmt ] = useState('0')
  const [ term, setTerm ] = useState('5')
  const [ termType, setTermType ] = useState('years')
  const [ interestRate, setInterestRate ] = useState('6') 

  const [ chartData, setChartData ] = useState([])
  const [ monthlyPayment, setMonthlyPayment ] = useState('')

  const [ showTable, setShowTable ] = useState(false)

  const changeTimePeriodType = (type) => {
    setTermType(_ => type)
    document.getElementById(type).classList.add('time-picker-item-active')
    if(type === 'months')
      document.getElementById('years').classList.remove('time-picker-item-active')
    else
      document.getElementById('months').classList.remove('time-picker-item-active')
  }

  const calculate = () => {
    // mp = (P[r/n])/(1-(1+(r/n)^-nt))

    let P = parseFloat(loanAmt)
    const r = parseFloat(interestRate)/100
    const n = 12
    const t = termType === 'months' ? parseFloat(term)/12 : parseFloat(term)

    const MP = (P * (r/n))/(1 - Math.pow(1 + (r/n), -n * t))
    setMonthlyPayment(MP)
    const TC = MP * 12 * t

    const data = []
    let totalInt = 0

    for(let i = 0; i < t * 12; i++) {
      let MIP = (P * (r/365)) * 30
      P = (P * (1 + (r/12))) - (MP + parseFloat(extraAmt))
      if(P < 0) {
        P = 0
        data.push({ key: i, 'Payment Date': getDateString(i), Payment: MP, Principal: MP-MIP, Interest: MIP, 'Total Interest': totalInt += MIP, Balance: P })
        break
      }
      data.push({ key: i, 'Payment Date': getDateString(i), Payment: MP, Principal: MP-MIP, Interest: MIP, 'Total Interest': totalInt += MIP, Balance: P })
    }
    console.log(data)
    setChartData(_ => [...data])

  }

  return (
    <div id='loan-wrapper'>
      <div id='loan'>
        <div id='loan-input-output'>
          <div id='loan-input-panel'>

            <h2>Loan amount</h2>
            <Input className='loan-input-dollar' addonBefore={'$'} value={loanAmt} onChange={(e) => setLoanAmt(_ => e.target.value)} />

            <h2>Extra per month</h2>
            <Input className='loan-input-dollar' addonBefore={'$'} value={extraAmt} onChange={(e) => setExtraAmt(_ => e.target.value)} />

            <h2>Loan term</h2>
            <span id="loan-input-time-wrapper">
              <Input className='loan-input-time' value={term} onChange={(e) => setTerm(_ => e.target.value)} />
              <div className='time-picker-item' id="months" onClick={() => changeTimePeriodType('months')}>Months</div>
              <div className='time-picker-item time-picker-item-active' id="years" onClick={() => changeTimePeriodType('years')}>Years</div>
            </span>

            <span id='apr-calc-group'>
              <div>
                <h2>Interest rate</h2>
                <Input className='loan-input-apy' addonAfter={'%'} value={interestRate} onChange={(e) => setInterestRate(_ => e.target.value)} />
              </div>      
              <Button id='calculate-loan' type='primary' onClick={calculate} >Calculate</Button>
            </span>

            <p id="show-hide-table-btn" onClick={() => setShowTable(sst => !sst)}><a href="#!">Show amortization schedule</a></p>
          </div>
            <div id='loan-output-panel'>
              <div id="monthly-payment">
                {
                chartData.length > 0 && (
                  <>
                    <p>Monthly Payments</p>
                    <h1>{ formatter.format(Math.round(monthlyPayment*100)/100 ) }</h1>
                  </>
                  )
                }
              </div>
              {
              chartData.length > 0 && (
                  <>
                    <span>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          height={400}
                          data={chartData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#1677ff" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#1677ff" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="Payment Date"/>
                          <YAxis />
                          <Tooltip formatter={(v) => formatter.format(v)} />
                          <Area type="monotone" dataKey="Balance" stroke="#1677ff" fill="url(#colorTotal)" />
                          <Area type="monotone" dataKey="Total Interest" stroke="#ffc658" fill="url(#colorInterest)" />
                          <Area type="monotone" dataKey="Interest" stroke="#82ca9d" fill="url(#colorContributions)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </span>
                    <div id="loan-breakdown">
                      <h2>Total loan breakdown</h2>
                      <hr />
                      <h4 className='loan-breakdown-row'>
                        <div id='total-sq' />
                        <div>Total</div> 
                        <div>{ chartData.length > 0 && formatter.format(parseFloat(loanAmt) + chartData.slice(-1)[0]['Total Interest']) }</div>
                      </h4>
                      <hr />
                      <h4 className='loan-breakdown-row'>
                        <div id='int-sq' />
                        <div>Total Interest</div> 
                        <div>{ chartData.length > 0 && formatter.format(chartData.slice(-1)[0]['Total Interest']) }</div>
                      </h4>
                    </div>
                  </>
                )
              }
            </div>
        </div>
        { showTable && (
          <div id='loan-output-table'>
            <h1>hi</h1>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default Loan