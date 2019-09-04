// HELPFUL POSTGRES INFO:
//-----------------------------------------------
// General Notes:

  1)

//-----------------------------------------------
// ACCESSING POSTGRES VIA TERMINAL:

  > psql -d <database name>

  OR if it hasn't been created yet:

  > psql    //this will log you into the default db

  > DefaultDB=# \l   //this will list all the databases and users

  > \c <database name>  //this allows you to switch to a specific db

  > \dt   //this shows all the tables in the db you are in

  > \q    //exit the database

//-----------------------------------------------
// COMMON SQL COMMANDS:

  CREATE DATABASE <database name>;
  SELECT * FROM <table name>;
  DROP DATABASE [ IF EXISTS ] <database name>;

  See more RAW sql commands in helpfulSQLInfo.js