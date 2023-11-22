# join-my-trip-backend


## Environment Variables
* 'JWT_SECRET' : secret for JWT tokens
* 'PG_CONNECTION_STR' : Postgres connection string
* 'PORT' : Port to run server on

## Api

* '/signin' :  Signin using email and password and get token
* '/admin/create' : {access: sadmin,admin} :
* '/admin/delete' : {access: sadmin} :
* '/admin/update' : {access: sadmin} :
* '/employee/create' : {access: sadmin,admin} :
* '/employee/delete' : {access: sadmin,admin} :
* '/employee/update' : {access: sadmin,admin} :
* '/session/start' : {access: employee} :
* '/session/end' : {access: employee} :
* '/session/pause' : {access: employee} :
* '/session/resume' : {access: employee} :
* '/project/create' : {access: sadmin,admin} :
* '/project/delete' : {access: sadmin,admin} :
* '/project/update' : {access: sadmin,admin} :
* '/project/assign' : {access: sadmin,admin} :
