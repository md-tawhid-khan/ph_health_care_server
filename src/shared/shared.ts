const pick = <T extends Record<string,unknown> , K extends keyof T>(obj:T,keys:K[]):Partial<T> =>{

    const finalObjet:Partial<T>={} ;

  for(const key of keys){
    if(obj && Object.hasOwnProperty.call(obj,key)){
         finalObjet[key]=obj[key] ;
    }
  }
  

  return finalObjet ;
}

export default pick ;