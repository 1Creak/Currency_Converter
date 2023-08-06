export const getFullTitle = (codes, code) =>{
    const [,title] = codes.find((item) => item.includes(code))
    return title;
}

export const formatToCuttency = (code, amount) =>{
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: code,
        maximumFractionDigits: 2
    }).format(amount);
}
// ???? Работа с временем
export const converTime = (data) =>{
    const option = {
        year:"numeric",
        month: 'long',
        day:'numeric',
    }

    return new Intl.DateTimeFormat('en-US', option).format(new Date(data));
}