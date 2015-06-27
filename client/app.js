
field = [];
fieldSize = 20;

for(var i = 0;i<fieldSize;i++){
    var row=[];
    for(var j = 0;j<fieldSize;j++){
       row.push({x:j,y:i});
        
    }
    field.push(row);
}

Template.main.helpers({
    
locationRow: function(){
    
 return field;   
    
},
locationColumn: function(){
    
 return this;
    
},
    

});

Template.location.helpers({
    
hasGold:function(){
    
  a = Gold.find({x:this.x,y:this.y,found:false}).count();
  if(a>0){
   
  return "gold"    
    
}    
    
},
numOfGold:function(){
  
    return Gold.find({x:this.x,y:this.y,found:false}).count();
    
}
    
});

Template.location.events({
   'click .location':function(e){
       
    //If the user is logged in, let them mine for gold.   
     if(Meteor.user()){
        
        //Identify a piece of gold at the location clicked.
        currentGold = Gold.findOne({x:this.x,y:this.y,found:false});
        
        //if there is gold in the clicked location AND mining is successful, add gold to the user's total.
        var miningIsSuccessful = minedGold(currentGold.easeOfMining);
                
        if(currentGold.x!==null & miningIsSuccessful){
        
            Gold.update({_id:currentGold._id},{$set:{foundBy:Meteor.user().username,found:true}});
        
            if(Meteor.user().profile){
                var newTotal = Meteor.user().profile.goldTotal + currentGold.mass;
       
                Meteor.users.update({_id:Meteor.user()._id},{$set:      {"profile.goldTotal":newTotal}});            
    
            }
            else{
                alert();
                Meteor.users.update({_id:Meteor.user()._id},{$set:{"profile.goldTotal":currentGold.mass}}) ;  
        
                }
    
            }
        
        }
       
    //if user is not logged in:   
    else{
    
    alert("Sign in to mine for gold!")}
       
   }
    
    
});






Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});



var deleteAllGold = function(){
    
var allGold = Gold.find();    
allGold.forEach(function(gold){
   
    Gold.remove({_id:gold._id});
    
});
    
}

var randomlyPlaceGold = function(numOfPieces){
    
for(var i = 0;i<numOfPieces;i++){
    
  var goldObject = {
      
  found:false,
  mass:Math.random()*100,
  x: Math.round(Math.random()*fieldSize),
  y: Math.round(Math.random()*fieldSize),
  easeOfMining: Math.random()
  }
  
  Gold.insert(goldObject);
      
  }
    
}

var resetMiners = function(){
    
    
allusers = Meteor.users.find();    
allusers.forEach(function(user){
    
Meteor.users.update({_id:user._id},{$set:{"profile.goldTotal":0}});    
    
});
}

minedGold = function(easeOfMining){
    
 return (Math.random()<=easeOfMining);
    
    
}