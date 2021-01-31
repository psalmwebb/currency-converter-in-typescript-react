import {FC,useEffect,useState} from "react"
import axios from "axios"

import CurrencyComp from "./CurrencyComp"

const URL = "https://api.exchangeratesapi.io/latest"

const App:FC = () : JSX.Element =>{

  let [allCurrency,setAllCurrency] = useState<string[]>([])
  let [fromCurrency,setFromCurrency] = useState<string>()
  let [toCurrency,setToCurrency] = useState<string>()
  let [fromCurrencyRate,setFromCurrencyRate] = useState<number>(1)
  let [toCurrencyRate,setToCurrencyRate] = useState<number>()
  let [isFromCurrency,setIsFromCurrency] = useState<boolean>(true)
  let [fromCurrencyRateObj,setFromCurrencyRateObj] = useState<object>({})

  console.log(toCurrency)
  if(isFromCurrency && toCurrencyRate && fromCurrencyRate)
  {
    toCurrencyRate *= fromCurrencyRate
    console.log("running...")
  }
  else if(toCurrencyRate && fromCurrencyRate){
    fromCurrencyRate = toCurrencyRate / fromCurrencyRateObj[toCurrency]
  }

  useEffect(()=>{

    axios.get(URL)
    .then(res=>{
       let allCurrent:string[] = Object.keys(res.data.rates)
       let fromCurrent:string = res.data.base
       let toCurrent:string = Object.keys(res.data.rates)[0]
       setAllCurrency([...allCurrent])
       setFromCurrency(fromCurrent)
       setToCurrency(toCurrent)
       setToCurrencyRate(res.data.rates[toCurrent])
       setFromCurrencyRateObj({...res.data.rates})
    })
  },[])


  function handleFromCurrent(e) : void
  {
    setFromCurrencyRate(e.target.value)
    setIsFromCurrency(true)
  }

  function handleToCurrent(e) : void
  {
    setToCurrencyRate(e.target.value)
    setIsFromCurrency(false)
  }

  function handleFromCurrencyChange(e)
  {
    axios.get(`${URL}?base=${e.target.value}`)
    .then(res=>{
      setFromCurrencyRateObj({...res.data.rates})
      setToCurrencyRate(res.data.rates[toCurrency])
    })
  }

  return (
      <div className="app">
          <CurrencyComp allCurrency={allCurrency} 
                       selectedCurrency={fromCurrency} 
                       currentRate={fromCurrencyRate} 
                       handleRate={handleFromCurrent}
                       handleCurrencyChange={handleFromCurrencyChange}
                       />

             <div className="equal-to">=</div>

          <CurrencyComp allCurrency={allCurrency} 
                        selectedCurrency={toCurrency} 
                        currentRate={toCurrencyRate} 
                        handleRate={handleToCurrent}
                        handleCurrencyChange={(e)=> {setToCurrencyRate(fromCurrencyRateObj[e.target.value]); setToCurrency(e.target.value)}}
                        />
      </div>
  )
}

export default App