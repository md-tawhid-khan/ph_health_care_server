type TOptions={
    page?:string,
    limit?:string,
    sortOrder?:string,
    sortBy?:string
}

type TOptionsReturn={
    page:number,
    limit:number,
    skip:number,
    sortOrder:string,
    sortBy:string
}
const calculatePagination=(options:TOptions):TOptionsReturn=>{
      const page:number=Number(options.page)  || 1 ;
      const limit:number = Number(options.limit) || 10 ;
      const skip = (page-1)*limit ;

      return {
        page,
        limit,
        skip,
        sortOrder:options.sortOrder || 'desc',
        sortBy:options.sortBy || 'createAt'
      }

} 

export const paginationHelper={
    calculatePagination
}