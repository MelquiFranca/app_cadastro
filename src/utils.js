/* eslint-disable prettier/prettier */
/* eslint-disable semi */
export const dataFormatadaUsuario = (data) => {
    if(!data) return

    const dia = (data.getDate().toString().length === 1) ? `0${data.getDate()}` : data.getDate()
    const mes = (data.getMonth().toString().length === 1) ? `0${data.getMonth()+1}` : data.getMonth()+1
    const ano = data.getFullYear()
    
    return `${dia}/${mes}/${ano}`
}

export const dataFormatadaBanco = (data) => {
    if(!data) return

    const dia = (data.getDate().toString().length === 1) ? `0${data.getDate()}` : data.getDate()
    const mes = (data.getMonth().toString().length === 1) ? `0${data.getMonth()+1}` : data.getMonth()+1
    const ano = data.getFullYear()
    
    return `${ano}-${mes}-${dia}`
}