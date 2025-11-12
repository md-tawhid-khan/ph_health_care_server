import { Server } from 'http';
import app from './app';

const port= 3000 ;

async function main() {
   const server:Server = app.listen(port,()=>{
      console.log('app is listening on port :',port);
   });

   const exitHandler = async()=>{
   if(server){
      server.close(()=>{
         console.log('server closed') ;
      })
   }
} ;

process.on('uncaughtException',(error)=>{
   console.log(error) ;
   exitHandler() ;
}) ;

process.on('unhandledRejection',(error)=>{
   console.log(error);
   exitHandler() ;
})

}




main()