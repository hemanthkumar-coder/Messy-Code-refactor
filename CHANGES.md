# Steps to Test project
-clone this repo to your machine

-open terminal and enter below command
'''cd messy-migration-refractoring using nodejs'''

-npm install to install all dependencies

-Run npm run test to start the server and connect to database

There are some sample data inserted in the DataBase.



# OVERVIEW
*   I refactored the whole code using nodejs
*   I chose Node.js with Express because it offers non-blocking,event-driven          architecture, which is ideal for building scalable and high-performance web applications. 
*   Node.js also has a large ecosystem, fast development cycles, and is well-suited for handling asynchronous operations, making it a great choice for modern web APIs compared to traditional Python frameworks.

# Issues I Noticed
- In the Legacy python code response is not being returned in JSON format.

- Password is stored in the Database Directly

- No Proper validation of emails which results in entry of invalid emails or entry of duplicate emails into database as we are logging in with email and password,this issue can cause multiple account holding by users with same email

- Raw Queries is Being used to interact with DB which exposes users data with numnerous Data Breaching issues

- No proper status codes is being used.

- All code is Written in single file for routing and db connection.There is no proper folder structure

# Changes I made

- I created project with proper folder structure for code readability.I used MVC(Model-View-Controller) Architecture which divides folders in a meaningfull way.

- With MVC Architecture errors can be found easily and code readability is also increased

-Instead of Raw Queries to Commicate with Database I Used Sequelize ORM (Object RelationShip Mapper) which acts as a abstraction layer between application and database.

-I Used Sequelize because it Provides various methods to interacts with DB

- I Used bcrypt package for hashing the password,which stores hashed password in DataBase while user is created

-Implemented project with proper validation of emails which unique emails in DB.

-Proper status codes is used for responses like 200 for data retrieval,201 for resource created,400 for bad request,404 for not found data,500 for server error

-Response is sent in JSON format which can be used by frontend application to use the data.

- I used cors(CrossOrigin Resource Sharing) to make production ready project

- Several functionality can be implemented for rate-limiting and caching,etc as just refactored the but havent implemented new features

