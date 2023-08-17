

    
                           //delete data method. data delete time check one condition .the condition is return marking to
                           // now date  morthan 30 days  then sucssfully delete .    



        module.exports.data_delete=(retundate)=>{

           
        
            return new Promise((resolve,reject)=>{
        
                if(!retundate){
                
                   resolve({redate:true});
            
                    return 
            
                    
                  }else{
            
            
                    const repartdate=retundate;
            
                   
            
                    let today = new Date();
                    let year = today.getFullYear();
                    let mon = today.getMonth()+1;
                    let day = today.getDate();
                    
                    let cudate =mon+"-"+day+"-"+year;
            
                    let redate= new Date(repartdate);
            
                    let curentdate= new Date(cudate);
            
            
                    let Difference_In_Time = curentdate.getTime() - redate.getTime();
                  
               
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            
            
                    console.log(Difference_In_Days);
            
                     }
            
            
                     if(Difference_In_Days >= 30){
        
        
                        resolve({flag:true});
            
                        }else{
        
                        resolve({flag:false});
                    
                    }
        
        
            });
        
         
        };



                                                           //end
        
        