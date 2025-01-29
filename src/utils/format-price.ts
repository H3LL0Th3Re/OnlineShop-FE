export const formatPrice =(price:number):string =>{
    return new Intl.NumberFormat('id-ID',{
        style:"decimal",
        maximumFractionDigits:0
    }).format(price)
}