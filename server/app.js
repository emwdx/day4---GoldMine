//no way
Meteor.startup(function(){
    
   
if(Gold.find().count()===0){
  for(var i = 0;i<=amountOfGold;i++){
      
    var goldObject = {
        
      found:false,
      mass:Math.random()*100,
      x: Math.round(Math.random()*fieldSize),
      y: Math.round(Math.random()*fieldSize),
      easeOfMining:Math.random()
    }
    
    Gold.insert(goldObject);
        
    }
              
    } 
    
    
    
});

Meteor.users.allow({
    
remove: function(){
    
 return true;   
},
update:  function(){
    
 return true;   
}
    
});

