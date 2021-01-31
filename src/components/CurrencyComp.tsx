import React from "react"


interface Props
{
    allCurrency:string[];
    selectedCurrency:string;
    currentRate:number
    handleRate:<T>(e:T) => void
    handleCurrencyChange:<T>(e:T) => void
}

const CurrencyComp:React.FC<Props>= ({allCurrency,selectedCurrency,currentRate,handleRate,handleCurrencyChange}) : JSX.Element =>{


    return (
        <div>
            <input type="number" value={currentRate} onChange={handleRate}/>
            <select onChange={handleCurrencyChange}>
              <option>{selectedCurrency}</option>
              {allCurrency.map((currency:string)=>(
                  <option key={currency}>{currency}</option>
              ))}
            </select>
        </div>
    )
}

export default CurrencyComp