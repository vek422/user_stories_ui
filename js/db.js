const DB_KEYS = {
  USERS: "users",
};

function generateAccountNumber() {
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  const remainingDigits = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, "0");
  return `${firstDigit}${remainingDigits}`;
}

function generateUserId() {
  return "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

function getAllUsers() {
  const usersJson = localStorage.getItem(DB_KEYS.USERS);
  return usersJson ? JSON.parse(usersJson) : {};
}

function saveUsers(users) {
  localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
}

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

function getUserByAccountNumber(accountNumber) {
  const users = getAllUsers();
  return users[accountNumber] || null;
}

function createUser(userData) {
  const existingUser = getUserByEmail(userData.email);
  if (existingUser) {
    return {
      success: false,
      error: "Email already registered",
    };
  }

  const accountNumber = generateAccountNumber();

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

function updateUser(accountNumber, updates) {
  const users = getAllUsers();

  if (!users[accountNumber]) {
    return {
      success: false,
      error: "User not found",
    };
  }

  const updatedUser = {
    ...users[accountNumber],
    ...updates,
    accountNumber: accountNumber,
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

window.DB = {
  generateAccountNumber,
  generateUserId,
  getAllUsers,
  getUserByEmail,
  getUserByAccountNumber,
  createUser,
  updateUser,
};
