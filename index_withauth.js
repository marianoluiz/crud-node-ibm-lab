const express = require('express');
const routes = require('./routes/users.js');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
const PORT = 5000;

/* you will see a lot of .use(); these are middleware */

// Parse JSON request bodies
app.use(express.json());

/* with the express-session middleware, the session ID is generated automatically. */

// Initialize session middleware
app.use(session({
    secret:"fingerprint", //This is a secret key used to sign the session ID cookie. This key is used to prevent tampering with the session ID cookie.

    // if session id is abc123... The session ID and the signature are combined to form the signed cookie, which might look like abc123.hmacSHA256_signature

    resave: true, //forces the session to be saved back to the session store, even if it wasn't modified during the request. This could be:  In-Memory Store: If no store is specified, EXPRESS sessions are stored in the server's memory (RAM (Random Access Memory) of the server where your application is running); Database Store; Cache Store; File Store. 

    //storing session is important so that user can remain logged in as they navigate through different pages of the application without having to log in again on each page. preferences as well would stored, cart items would be save, forms input would be save.

     saveUninitialized: true //forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
    }))

// Middleware for user authentication
// All the endpoints starting with /user will go through this middleware
app.use("/user", (req, res, next) => {


    /* req might look like dis
    {
        baseUrl: "/user",
        body: {}, // Contains parsed body data (e.g., from a POST request)
        cookies: {}, // Contains cookies sent by the client
        ...
        session: {
            authorization: {
                accessToken: "your-jwt-token" // JWT token used for authentication
                },
                ...
                },
            headers: {
                "host": "example.com",
                ...
        },
        ...
    }
    */
    // Check if user is authenticated
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken']; // accessing the accessToken property within the authorization object. The accessToken is a token (usually a JWT - JSON Web Token) that is used to verify the user's identity and permissions for accessing protected resources.
        
        // Verify JWT token for user authentication
        jwt.verify(token, "access", (err, user) => {
            // access is the key
            // token is the JWT that needs to be verified
            //verify(), checks if JWT is authentic

            //user object contains the decoded token payload, which typically includes user information such as user ID, roles, and other claims. 

            /* 
            user might look like this:
            {
                "id": "12345",
                "username": "johndoe",
                "email": "johndoe@example.com",
                "role": "admin"
                } 
            */
            if (!err) {
                req.user = user; // Set authenticated user data on the request object

                //Before the line req.user = user; is executed, req.user is typically undefined unless it has been set by some previous middleware or route handler. In most cases, req.user is not set until the JWT verification middleware assigns the decoded token payload to it.
                next(); // Proceed to the next middleware
            } else {
                console.log("not authenticated")
                return res.status(403).json({ message: "User not authenticated" }); // Return error if token verification fails
            }
        });
        
        // Return error if no access token is found in the session
    } else {
        console.log("not logged in")
        return res.status(403).json({ message: "User not logged in" });
    }
});

// next() is called to pass control to the next middleware function or route handler.

// User routes
app.use("/user", routes);

// Login endpoint
app.post("/login", (req, res) => {

    // you would use this as payload later in the JWT
    const user = req.body.user;
    /*  this is what you log in the format is: 
        {
        "user":{
            "name":"abc",
            "id":1
            }
        } 
    */
    if (!user) {
        return res.status(404).json({ message: "Body Empty" });
    }
    // Generate JWT access token
    let accessToken = jwt.sign({
        //payload
        data: user
        //secret and the option object
    }, 'access', { expiresIn: 60 * 60 });
    //An access token that is valid for one hour is generated. 

    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    
    //This access token is set into the session object. only authenticated users can access the endpoints for that length of time.
    console.log("logged in successfully")
    return res.status(200).send("User successfully logged in");
});

// Start server
app.listen(PORT, () => console.log("Server is running at port " + PORT));
