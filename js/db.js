/**
 * Database Layer for LocalStorage Operations
 * Handles user data storage and retrieval
 *
 * Storage Structure:
 * {
 *   "users": {
 *     "1234567890": { ...userObject },
 *     "0987654321": { ...userObject }
 *   }
 * }
 */

const DB_KEYS = {
  USERS: "users",
};

/**
 * Generate a random 10-digit account number
 * @returns {string} 10-digit account number
 */
function generateAccountNumber() {
  // Ensure the first digit is not 0
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  const remainingDigits = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, "0");
  return `${firstDigit}${remainingDigits}`;
}

/**
 * Generate a unique user ID
 * @returns {string} UUID-like identifier
 */
function generateUserId() {
  return "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

/**
 * Get all users from localStorage as an object
 * @returns {Object} Object with account numbers as keys and user objects as values
 */
function getAllUsers() {
  const usersJson = localStorage.getItem(DB_KEYS.USERS);
  return usersJson ? JSON.parse(usersJson) : {};
}

/**
 * Save users object to localStorage
 * @param {Object} users - Object with account numbers as keys
 */
function saveUsers(users) {
  localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
}

/**
 * Get user by email address
 * @param {string} email - Email to search for
 * @returns {Object|null} User object or null if not found
 */
function getUserByEmail(email) {
  const users = getAllUsers();
  const lowerEmail = email.toLowerCase();

  for (const accountNumber in users) {
    if (users[accountNumber].email.toLowerCase() === lowerEmail) {
      return users[accountNumber];
    }
  }
  return null;
}

/**
 * Get user by account number (O(1) lookup)
 * @param {string} accountNumber - Account number to search for
 * @returns {Object|null} User object or null if not found
 */
function getUserByAccountNumber(accountNumber) {
  const users = getAllUsers();
  return users[accountNumber] || null;
}

/**
 * Create a new user
 * @param {Object} userData - User data object
 * @param {string} userData.aadharId - User's Aadhar ID (12 digits)
 * @param {string} userData.firstName - User's first name
 * @param {string} userData.lastName - User's last name
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @param {string} userData.address - User's address
 * @param {string} userData.contactNumber - User's contact number (10 digits)
 * @returns {Object} Result object with success status and user data or error
 */
function createUser(userData) {
  // Check for duplicate email
  const existingUser = getUserByEmail(userData.email);
  if (existingUser) {
    return {
      success: false,
      error: "Email already registered",
    };
  }

  // Generate unique account number
  const accountNumber = generateAccountNumber();

  // Create user object
  const newUser = {
    accountNumber: accountNumber,
    aadharId: userData.aadharId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    address: userData.address,
    contactNumber: userData.contactNumber,
    balance: 0,
    createdAt: new Date().toISOString(),
  };

  // Add to users object using spread and save
  const users = getAllUsers();
  saveUsers({
    ...users,
    [accountNumber]: newUser,
  });

  return {
    success: true,
    user: newUser,
  };
}

/**
 * Update an existing user
 * @param {string} accountNumber - Account number of user to update
 * @param {Object} updates - Fields to update
 * @returns {Object} Result object with success status
 */
function updateUser(accountNumber, updates) {
  const users = getAllUsers();

  if (!users[accountNumber]) {
    return {
      success: false,
      error: "User not found",
    };
  }

  // Update user with spread operator
  const updatedUser = {
    ...users[accountNumber],
    ...updates,
    accountNumber: accountNumber, // Prevent changing account number
  };

  saveUsers({
    ...users,
    [accountNumber]: updatedUser,
  });

  return {
    success: true,
    user: updatedUser,
  };
}

// Export for use in other scripts
window.DB = {
  generateAccountNumber,
  generateUserId,
  getAllUsers,
  getUserByEmail,
  getUserByAccountNumber,
  createUser,
  updateUser,
};
