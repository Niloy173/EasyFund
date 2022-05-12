const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20')
const {google} = require("../important")
const {User} = require("../db/usefulInfo")


passport.serializeUser((user,done)=>{

  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  
      User.findById({_id : id}).then((user)=>{

        done(null,user);
      });
});


passport.use(new GoogleStrategy({

    callbackURL : '/login/google/redirect',
      clientID : google.clientID,
      clientSecret : google.clientSecret,
},(accessToken, refreshToken, profile,done)=>{
  User.findOne({googleId : profile.id})
  .then((currUser)=>{

       if(currUser)
       {
         console.log("signed in with "+currUser.username);
         done(null,currUser);
       }else{

        new User({

          username :  profile.displayName,
          googleId : profile.id,
          picturelink : profile.photos[0].value,
          email : profile.emails[0].value,
          
         }).save().then((newUser)=>{
        
          console.log(`The new user created`)
          done(null,newUser);
         });
       }
  })

})

)