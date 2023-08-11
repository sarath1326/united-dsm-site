





        module.exports.data_delete=(retundate)=>{

           
        
            return new Promise((resolve,reject)=>{
        
                if(!retundate){
                
                   resolve({redate:true})
            
                    return 
            
                    
                  }else{
            
            
                    const repartdate="08/1/2023"
            
                   
            
                    let today = new Date();
                    let year = today.getFullYear();
                    let mon = today.getMonth()+1;
                    let day = today.getDate();
                    
                    let cudate =mon+"-"+day+"-"+year;
            
                    let redate= new Date(repartdate)
            
                    let curentdate= new Date(cudate)
            
            
                    let Difference_In_Time = curentdate.getTime() - redate.getTime();
                  
               
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            
            
                    console.log(Difference_In_Days)
            
                     }
            
            
                     if(Difference_In_Days >= 7){
        
        
                        resolve({flag:true})
            
                        }else{
        
                        resolve({flag:false})
                    
                    }
        
        
            })
        
         
        }
        
        