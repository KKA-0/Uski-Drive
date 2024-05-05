// Importing necessary libraries and configurations
const { DB, Table } = require("./../AWS.Config");
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const {
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  ScanCommand,
  UpdateItemCommand
} = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

// Hashes a password using bcrypt
const HASH = async (pass) => {
  const hashedpass = await bcrypt.hash(pass, 8);
  return hashedpass;
}

// Compares a provided password with a hashed one
const CheckHASH = async (hashed, providePass) => {
  const check = await bcrypt.compare(providePass, hashed);
  return check;
}

// Generates a JWT token for the user
const generateToken = userData => jwt.sign(userData, process.env.privateKey);

// Searches for a user by email in the database
const findUserByEmail = async email => {
  const parameters = {
    TableName: Table,
    FilterExpression: "email = :email",
    ExpressionAttributeValues: marshall({ ":email": email })
  };

  const { Items } = await DB.send(new ScanCommand(parameters));
  return Items?.length ? unmarshall(Items[0]) : null;
};

// Creates a new user and stores it in the database
const createUser = async userData => {
  const userId = uuidv4();
  const hashedPass = await HASH(userData.password);
  const userItem = {
    id: userId,
    name: userData.name,
    email: userData.email,
    password: hashedPass
  };

  const params = {
    TableName: Table,
    Item: marshall(userItem)
  };

  await DB.send(new PutItemCommand(params));
  return { user: userItem, token: generateToken({ id: userItem.id, name: userItem.name, email: userItem.email }) };
};

// Handles user signup, either creating a new user or validating an existing one
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await findUserByEmail(email);

    if (user) {
      // User exists, check if the password provided matches the stored hash
      const passwordMatch = await CheckHASH(user.password, password);
      
      if (passwordMatch) {
        // Password matches, respond with a token
        const token = generateToken(user);
        res.status(200).json({ user, token });
      } else {
        // Password doesn't match, respond with an error
        res.status(401).json({ message: "Password Incorrect" });
      }
    } else {
      // No user found with that email, proceed to create a new user
      const { user: newUser, token } = await createUser({ name, email, password });
      res.status(201).json({ user: newUser, token });
    }
  } catch (error) {
    // On error, respond with a server error message
    console.error("signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieves user data based on the user ID
exports.getUser = async (req, res) => {
  try {
    const params = {
      TableName: Table,
      Key: marshall({ "id": req.params.id })
    };
    
    const { Item } = await DB.send(new GetItemCommand(params));

    if (Item) {
      // User found, respond with the user data
      res.status(200).json({ data: unmarshall(Item) });
    } else {
      // No user found, respond with a not found error message
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // On error, respond with a server error message
    console.error("getUser error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
