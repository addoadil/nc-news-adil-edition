# Northcoders News API

For any developer reading this, to successfully connect to the databases, you need to ensure you have created two env files. One for connecting to the test database and the other for connecting to the main development database. Ensure you add PGDATABASE= followed by the database name in the env files. Once this is done, then ensure the files are linked correctly with dotenv. :)

LINK TO APPLICATION HOSTED IN THE CLOUD:

https://news-application-f2jb.onrender.com

SUMMARY OF PROJECT:

This is one part of a bigger project in which I will be creating a full-stack application
for a news website. This is the backend project built using Restfil API. The database used is PSQL
which is being interacted using node-postgres. The API endpoints enable users to read and post articles, 
vote on articles, delete articles, type out comments, view current users, view articles based on specific 
params/queries. 

To see what API endpoints are available to navigate to please read the endpoints.json
file.

Built using:

JS,
Express,
PostgreSQL,
node,
node-Postgres,
jest,
husky,
SuperTest

INSTRUCTIONS:

If you would like to access this project on your local machine these are the steps to follow:

1. Start by forking the repo. This can be done by going to the nc-news project repository made public
on my GitHub and clicking on the fork button.

2. Once you have cloned it, you will have access to your own version of this project in your GitHub account.
This will be the same repo name but will have your GitHub username before the project name as a form of URL 
stored on your GitHub account. Look for it in your repositories section.

3. Grab the link of your new forked repo and type 'git clone' and then paste the link next to 'git clone'

4. Press enter and it should produce all files and clone them locally in your specified directory. It may prompt
you for a GitHub username and password, ensure you type your username and for the password give a personal access token
that can be created in your GitHub account.

5. Once you have the project locally setup and can see the files within your code editor, there are some additional steps 
you will need to follow to ensure that you are set up to run the project files.

6. First start by installing all local dependencies. Run the command in your terminal (within the directory the project is located)
'npm install' This will install all dependencies needed for the project to work properly.

7. To get the local database up and running, it is important we seed the database with some data beforehand. To do this please run the
following commands: 'npm run setup-dbs' and then proceed to run 'run seed' This should get the database ready with dummy data.

8. To view the database, you can type psql followed by the database name within the terminal and then run psql commands
to see the data there.

10. To run the tests simply type 'npm t' and this will run all tests for the project. 

Author: Adil Jawaid

