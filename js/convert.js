import { renderResult } from "./markups.js";
import state from "./state.js"
import { converTime, formatToCuttency, getFullTitle } from "./utils.js";
import variable from "./variable.js";

const { success, formResults, rateConversion, rateLast, toSelect, fromSelect} = variable;

export const handleChange = ({target:{value,name}}) =>{
    state.pair = {
        ...state.pair,
        [name]: value
    };
};

export const handleInput = ({target: {value,name}}) =>{
        state[name] = Number(value);
};

const insertResults = ({ 
    base_code: baseCode, 
    target_code: targetCode, 
    conversion_rate: rate, 
    conversion_result: result, 
    time_last_update_utc: time
}) => {
    const from = {
        code: baseCode,
        amount: state.amount,
        full: getFullTitle(state.codes, baseCode)
    }
    const to = {
        code: targetCode,
        amount: result,
        full: getFullTitle(state.codes, targetCode)
    }
    resultFrom.innerHTML = renderResult(from);
    resultTo.innerHTML = renderResult(to);

    const baseValue = formatToCuttency(baseCode, 1);
    const targetValue = formatToCuttency(targetCode, rate);

    rateConversion.innerHTML= `${baseValue} = ${targetValue}`
    rateLast.innerHTML = `Last updated ${converTime(time)}`

    formResults.classList.add("show");
};
export const handleSubmit = async (e) => {
    e?.preventDefault();

    const { url, amount, pair:{ from, to }} = state;

    state.loading = true;

    if(!amount || !from || !to) return;

    try{
        const response = await fetch(`${url}/pair/${from}/${to}/${amount}`);
        const data = await response.json();

        if(data.result === success) insertResults(data);

        state.loading = false;
    }catch{
        console.log(err)
    }
};
export const switchCurrencies = () =>{
    const {pair: {to, from}} = state;

    if(!to || !from) return;

    state.pair ={
        to: from,
        from: to,
    }

    toSelect.value = from;
    fromSelect.value = to;
    
};