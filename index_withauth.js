const express = require('express');
const routes = require('./routes/users.js');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
const PORT = 5000;

//you will see a lot of .use(); these are not called manually. Instead, they are automatically executed by the Express.js framework when a request is received.

// Parse JSON request bodies
app.use(express.json());

// Initialize session middleware
app.use(session({secret:"fingerprint",resave: true, saveUninitialized: true}))



// Middleware for user authentication
// All the endpoints starting with /user will go through this middleware
app.use("/user", (req, res, next) => {
    // Check if user is authenticated
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken']; // This is accessing the accessToken property within the authorization object. The accessToken is a token (usually a JWT - JSON Web Token) that is used to verify the user's identity and permissions for accessing protected resources.
        
        // Verify JWT token for user authentication
        jwt.verify(token, "access", (err, user) => {
            // access is the key
            // token is the JWT that needs to be verified
            //verify(), checks if JWT is authentic

            //user object contains the decoded token payload, which typically includes user information such as user ID, roles, and other claims.

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
    const user = req.body.user;
    if (!user) {
        return res.status(404).json({ message: "Body Empty" });
    }
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });
    //An access token that is valid for one hour is generated. 

    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    //This access token is set into the session object. only authenticated users can access the endpoints for that length of time.

    return res.status(200).send("User successfully logged in");
});

// Start server
app.listen(PORT, () => console.log("Server is running at port " + PORT));
