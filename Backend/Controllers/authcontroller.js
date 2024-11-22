const ClientModal = require("../modals/user"); 
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;


        if (!username || !email || !phone || !password) {
        return res.status(400).json({
            message: "Missing required fields. Please provide username, email, phone, and password.",
        });
        }
 
        const existingUser = await ClientModal.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
        return res.status(400).json({
            message: "Email or phone number is already registered.",
        });
        }
    
        const newClient = await ClientModal.create({
        username,
        email,
        phone,
        password
        });

    
        return res.status(201).json({
        message: "Signup successful!",
        user: {
            id: newClient._id,
            username: newClient.username,
            email: newClient.email,
            phone: newClient.phone,
        },
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
        message: "An error occurred during signup. Please try again later.",
        });
    }
    };


    const login = async (req, res) => {
        const { email, password } = req.body;
    
        try {
            // Find the user in the database using the provided email
            const user = await ClientModal.findOne({ email });
    
            // If user is not found
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }
    
            // Check if the password matches (you should ideally hash passwords in a real application)
            if (user.password !== password) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }
    
            // Create a JWT token
            const token = jwt.sign({ email: user.email, id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    
            // Send success response with the token
            return res.json({
                message: 'Login successful!',
                token, // Send back the JWT token
            });
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({
                message: "An error occurred during login. Please try again later.",
            });
        }
    };


const getAllData = async (req, res) => {
  try {
    // Fetch all data from the database
    const clients = await ClientModal.find();
    
    // Send the fetched data as a response
    res.status(200).json({ data: clients });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'An error occurred while fetching data.' });
  }
};

  
module.exports = {
  signup, login, getAllData,
};
