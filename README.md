## Project SetUp
*** SETUP Dotenv - Database (Mysql) ***
## .env variables
    -  DB_HOST
    -  DB_PORT
    -  DB_USERNAME
    -  DB_PASSWORD
    -  DB_DATABASE
    -  GITHUB_USERNAME
    -  APP_PORT   

NB : Please kindly provide the necessary database credetials , Provide APP_PORT , if not privded it will default to 3000 , Provide GITHUB_USERNAME , if not provided it will default to chromium username 
......................................................................
  
## RUN Commands
    - npm install : To install all dependencies
    - npm run dev : To complie typescript to ES2017 and start the server with nodemon 

........................................................................

## Endpoints

*** Please note three endpoints are listed below ***

   - To fetch commits and repository information from github public Api 
   
   ## First Endpoint
   - *** api/repos/:username ***

      Optional or additional parameters 

      *** api/repos/:username?startDate=2019-08-11&endDate=2020-08-14 ***
    
      ------
      NB: endDate and startDate are optional , if not provided the system will use the current date and add extra 3 months , so the startDate will default to current date and the endDate will default to the next three month
      --------

   ## Second Endpoint
   - *** api/top-commit-authors ***
       
       Optional Parameters 
      
   -  *** api/top-commit-authors?limit=2 ***

      ------
      NB: limit is optional is not provided it will only bring 5 top authors but if the query params is set then it will fetch base on the number passed through the query params 
      --------

   ## Third Endpoint
   - *** api/commits/:repoName ***
      
       repoName : the name of the repository you wish to fetch commits for 

.................................................................................................
