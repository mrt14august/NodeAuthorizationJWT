1.
Here we are considering the authentication part is done, and just focusing on authorization part.
for authorization we used jsoonwebtoken

first here we created an array of object with username and title for dummy database 
and sent a post request [containing the username] to the server and received a token (having a sort of session id )

now that token is gonna help to retrieve the object containing desired username , if not present, give an messeage!!

all the testing can be done in postmanagerI here preffered .REST file to do..so that 
expakining end point could be easy with the given order of sending request.

2.
The tokens are sent to the server with with every susequent request and it uses HTTP header !
HTTP headers are key-value pairs.
Key is called authorization and value is jwt along with the word 'Bearer' in front of it. i.e. ::
   "Authorization" : Bearer Token(jwt)
   
   which can be extracted  from  : 
    req.headers['Authorization'] -> gives -> Bearer Token(jwt)

Thanks.
