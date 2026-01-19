/**
 * Registration Form Validation
 * Handles client-side validation for the registration form
 */

document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const form = document.getElementById("registerForm");
  const aadharIdInput = document.getElementById("aadharId");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const contactNumberInput = document.getElementById("contactNumber");
  const addressInput = document.getElementById("address");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const submitBtn = document.getElementById("submitBtn");

  // Error message elements
  const aadharIdError = document.getElementById("aadharIdError");
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const contactNumberError = document.getElementById("contactNumberError");
  const addressError = document.getElementById("addressError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  // Password toggle buttons
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );

  // Validation patterns
  const patterns = {
    aadharId: /^\d{12}$/,
    name: /^[a-zA-Z\s]{1,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    contactNumber: /^\d{10}$/,
  };

  // Error messages
  const errorMessages = {
    aadharId: {
      empty: "Aadhar ID is required",
      invalid: "Please enter a valid 12-digit Aadhar ID",
    },
    firstName: {
      empty: "First name is required",
      invalid: "Please enter a valid name (letters only, max 50 characters)",
    },
    lastName: {
      empty: "Last name is required",
      invalid: "Please enter a valid name (letters only, max 50 characters)",
    },
    email: {
      empty: "Email address is required",
      invalid: "Please enter a valid email address",
    },
    contactNumber: {
      empty: "Contact number is required",
      invalid: "Please enter a valid 10-digit contact number",
    },
    address: {
      empty: "Address is required",
      invalid: "Address must be maximum 100 characters",
    },
    password: {
      empty: "Password is required",
      invalid: "Password must be maximum 30 characters",
    },
    confirmPassword: {
      empty: "Please confirm your password",
      mismatch: "Passwords do not match",
    },
  };

  /**
   * Show error message for a field
   */
  function showError(input, errorElement, message) {
    input.classList.remove("success");
    input.classList.add("error");
    errorElement.textContent = message;
    errorElement.classList.add("visible");
  }

  /**
   * Show success state for a field
   */
  function showSuccess(input, errorElement) {
    input.classList.remove("error");
    input.classList.add("success");
    errorElement.textContent = "";
    errorElement.classList.remove("visible");
  }

  /**
   * Validate Aadhar ID
   */
  function validateAadharId() {
    const value = aadharIdInput.value.trim();
    if (!value) {
      showError(aadharIdInput, aadharIdError, errorMessages.aadharId.empty);
      return false;
    }
    if (!patterns.aadharId.test(value)) {
      showError(aadharIdInput, aadharIdError, errorMessages.aadharId.invalid);
      return false;
    }
    showSuccess(aadharIdInput, aadharIdError);
    return true;
  }

  /**
   * Validate First Name
   */
  function validateFirstName() {
    const value = firstNameInput.value.trim();
    if (!value) {
      showError(firstNameInput, firstNameError, errorMessages.firstName.empty);
      return false;
    }
    if (!patterns.name.test(value)) {
      showError(
        firstNameInput,
        firstNameError,
        errorMessages.firstName.invalid
      );
      return false;
    }
    showSuccess(firstNameInput, firstNameError);
    return true;
  }

  /**
   * Validate Last Name
   */
  function validateLastName() {
    const value = lastNameInput.value.trim();
    if (!value) {
      showError(lastNameInput, lastNameError, errorMessages.lastName.empty);
      return false;
    }
    if (!patterns.name.test(value)) {
      showError(lastNameInput, lastNameError, errorMessages.lastName.invalid);
      return false;
    }
    showSuccess(lastNameInput, lastNameError);
    return true;
  }

  /**
   * Validate email
   */
  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      showError(emailInput, emailError, errorMessages.email.empty);
      return false;
    }
    if (!patterns.email.test(value)) {
      showError(emailInput, emailError, errorMessages.email.invalid);
      return false;
    }
    showSuccess(emailInput, emailError);
    return true;
  }

  /**
   * Validate contact number
   */
  function validateContactNumber() {
    const value = contactNumberInput.value.trim();
    if (!value) {
      showError(
        contactNumberInput,
        contactNumberError,
        errorMessages.contactNumber.empty
      );
      return false;
    }
    if (!patterns.contactNumber.test(value)) {
      showError(
        contactNumberInput,
        contactNumberError,
        errorMessages.contactNumber.invalid
      );
      return false;
    }
    showSuccess(contactNumberInput, contactNumberError);
    return true;
  }

  /**
   * Validate address
   */
  function validateAddress() {
    const value = addressInput.value.trim();
    if (!value) {
      showError(addressInput, addressError, errorMessages.address.empty);
      return false;
    }
    if (value.length > 100) {
      showError(addressInput, addressError, errorMessages.address.invalid);
      return false;
    }
    showSuccess(addressInput, addressError);
    return true;
  }

  /**
   * Validate password
   */
  function validatePassword() {
    const value = passwordInput.value;
    if (!value) {
      showError(passwordInput, passwordError, errorMessages.password.empty);
      return false;
    }
    if (value.length > 30) {
      showError(passwordInput, passwordError, errorMessages.password.invalid);
      return false;
    }
    showSuccess(passwordInput, passwordError);
    return true;
  }

  /**
   * Validate confirm password
   */
  function validateConfirmPassword() {
    const value = confirmPasswordInput.value;
    const password = passwordInput.value;

    if (!value) {
      showError(
        confirmPasswordInput,
        confirmPasswordError,
        errorMessages.confirmPassword.empty
      );
      return false;
    }

    if (value !== password) {
      showError(
        confirmPasswordInput,
        confirmPasswordError,
        errorMessages.confirmPassword.mismatch
      );
      return false;
    }

    showSuccess(confirmPasswordInput, confirmPasswordError);
    return true;
  }

  /**
   * Toggle password visibility
   */
  function togglePasswordVisibility(inputElement, toggleButton) {
    const eyeIcon = toggleButton.querySelector(".eye-icon");
    const eyeOffIcon = toggleButton.querySelector(".eye-off-icon");

    if (inputElement.type === "password") {
      inputElement.type = "text";
      eyeIcon.classList.add("hidden");
      eyeOffIcon.classList.remove("hidden");
    } else {
      inputElement.type = "password";
      eyeIcon.classList.remove("hidden");
      eyeOffIcon.classList.add("hidden");
    }
  }

  /**
   * Validate entire form
   */
  function validateForm() {
    const isAadharValid = validateAadharId();
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isContactValid = validateContactNumber();
    const isAddressValid = validateAddress();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    return (
      isAadharValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isContactValid &&
      isAddressValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    );
  }

  /**
   * Handle form submission
   */
  function handleSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      const firstError = form.querySelector(".error");
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    // Show loading state
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoader = submitBtn.querySelector(".btn-loader");
    submitBtn.disabled = true;
    btnText.classList.add("hidden");
    btnLoader.classList.remove("hidden");

    // Collect form data
    const userData = {
      aadharId: aadharIdInput.value.trim(),
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      contactNumber: contactNumberInput.value.trim(),
      address: addressInput.value.trim(),
      password: passwordInput.value,
    };

    // Create user using db.js
    const result = window.DB.createUser(userData);

    // Hide loading state
    submitBtn.disabled = false;
    btnText.classList.remove("hidden");
    btnLoader.classList.add("hidden");

    if (!result.success) {
      showError(emailInput, emailError, result.error);
      emailInput.focus();
      return;
    }

    // Success - show the success card
    const successCard = document.getElementById("successCard");
    const accountNumberDisplay = document.getElementById("accountNumber");
    const customerNameDisplay = document.getElementById("customerName");
    const goToLoginBtn = document.getElementById("goToLoginBtn");

    // Display customer details
    accountNumberDisplay.textContent = result.user.accountNumber;
    customerNameDisplay.textContent = `${result.user.firstName} ${result.user.lastName}`;

    // Hide form elements and show success card
    form.querySelectorAll(".form-group, .form-row").forEach((group) => {
      group.style.display = "none";
    });
    submitBtn.style.display = "none";
    successCard.classList.remove("hidden");

    // Handle login redirect button
    goToLoginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  // Event listeners for real-time validation
  aadharIdInput.addEventListener("blur", validateAadharId);
  aadharIdInput.addEventListener("input", () => {
    if (aadharIdInput.classList.contains("error")) {
      validateAadharId();
    }
  });

  firstNameInput.addEventListener("blur", validateFirstName);
  firstNameInput.addEventListener("input", () => {
    if (firstNameInput.classList.contains("error")) {
      validateFirstName();
    }
  });

  lastNameInput.addEventListener("blur", validateLastName);
  lastNameInput.addEventListener("input", () => {
    if (lastNameInput.classList.contains("error")) {
      validateLastName();
    }
  });

  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("error")) {
      validateEmail();
    }
  });

  contactNumberInput.addEventListener("blur", validateContactNumber);
  contactNumberInput.addEventListener("input", () => {
    if (contactNumberInput.classList.contains("error")) {
      validateContactNumber();
    }
  });

  addressInput.addEventListener("blur", validateAddress);
  addressInput.addEventListener("input", () => {
    if (addressInput.classList.contains("error")) {
      validateAddress();
    }
  });

  passwordInput.addEventListener("blur", validatePassword);
  passwordInput.addEventListener("input", () => {
    if (passwordInput.classList.contains("error")) {
      validatePassword();
    }
    if (
      confirmPasswordInput.value &&
      confirmPasswordInput.classList.contains("error")
    ) {
      validateConfirmPassword();
    }
  });

  confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
  confirmPasswordInput.addEventListener("input", () => {
    if (confirmPasswordInput.classList.contains("error")) {
      validateConfirmPassword();
    }
  });

  // Password toggle listeners
  togglePassword.addEventListener("click", () => {
    togglePasswordVisibility(passwordInput, togglePassword);
  });

  toggleConfirmPassword.addEventListener("click", () => {
    togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword);
  });

  // Form submit listener
  form.addEventListener("submit", handleSubmit);
});
