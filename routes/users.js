const express = require('express');
const router = express.Router(); // Create a new router object

let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];





// GET request: Retrieve all users
// Define a route handler for GET requests to the root path "/"
router.get("/",(req,res)=>{
  console.log("GET request received at /users");
  // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
  res.send(JSON.stringify({users}, null, 4));

  //res.json({ users });
  //users is an array; but user is still the route from index.js
});

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split('-');
  return new Date(yyyy + "/" + mm + "/" + dd);
}

// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
  console.log("GET request received at /users/sort");
  // Sort the users array by DOB in ascending order
    //look for ref for sort()... the parameter is a function that compares two elements of the array
  let sorted_users = users.sort(function(a, b) {
    console.log(a.DOB);
    console.log(b.DOB);

      let d1 = getDateFromString(a.DOB);
      let d2 = getDateFromString(b.DOB);
      return d1 - d2;
  });
  // Send the sorted_users array as the response to the client
  res.send(sorted_users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  //`email` is user defined; it can be anything


  // you can access the value of :email using req.params.email
  // Extract the email parameter from the request URL
  const email = req.params.email;
  /* :email is a route parameter. When a request is made to /john@example.com, req.params.email will be "john@example.com". */
  let filtered_users = users.filter((user) => user.email === email);

  // Send the filtered_users array as the response to the client
  res.send(filtered_users);

});


router.get("/lastName/:lastName",(req,res)=>{
  const lastName = req.params.lastName;
  
  let filtered_lastname = users.filter((user) => user.lastName === lastName);

  res.send(filtered_lastname);
});

// POST request: Create a new user
router.post("/",(req,res)=>{
  
  // Push a new user object into the users array based on query parameters from the request
  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  })
  
  res.send("The user " + req.query.firstName + " has been added!");


});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  
  if (filtered_users.length > 0) {
      // Select the first matching user and update attributes if provided
      let filtered_user = filtered_users[0];
      
      // Extract and update data if provided
      
      let DOB = req.query.DOB;    
      if (DOB) {
          filtered_user.DOB = DOB;
      }
      
      let firstNAme = req.query.firstName;
      if (firstNAme) {
          filtered_user.firstName = firstNAme;
      }

      let lastName = req.query.lastName;
      if (lastName) {
          filtered_user.lastName = lastName;
      }
      
      // Replace old user entry with updated user
        //delete old user with same email
      users = users.filter((user) => user.email != email);
        //add new user with same email
      users.push(filtered_user);
      
      // Send success message indicating the user has been updated
      res.send(`User with the email ${email} updated.`);
  } else {
      // Send error message if no user found
      res.send("Unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email != email);
  // Send a success message as the response, indicating the user has been deleted
  res.send(`User with the email ${email} deleted.`);
});

module.exports=router;
