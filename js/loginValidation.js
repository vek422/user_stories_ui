/**
 * Login Form Validation
 * Handles client-side validation and authentication
 */

document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const form = document.getElementById("loginForm");
  const accountNumberInput = document.getElementById("accountNumber");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("submitBtn");

  // Error message elements
  const accountNumberError = document.getElementById("accountNumberError");
  const passwordError = document.getElementById("passwordError");

  // Password toggle
  const togglePassword = document.getElementById("togglePassword");

  // Success popup
  const successPopup = document.getElementById("successPopup");

  // Error messages
  const errorMessages = {
    accountNumber: {
      empty: "Account number is required",
      invalid: "Please enter a valid 10-digit account number",
      notFound: "Account not found",
    },
    password: {
      empty: "Password is required",
      incorrect: "Incorrect password",
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
   * Validate account number
   */
  function validateAccountNumber() {
    const value = accountNumberInput.value.trim();
    if (!value) {
      showError(
        accountNumberInput,
        accountNumberError,
        errorMessages.accountNumber.empty
      );
      return false;
    }
    if (!/^\d{10}$/.test(value)) {
      showError(
        accountNumberInput,
        accountNumberError,
        errorMessages.accountNumber.invalid
      );
      return false;
    }
    showSuccess(accountNumberInput, accountNumberError);
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
    showSuccess(passwordInput, passwordError);
    return true;
  }

  /**
   * Toggle password visibility
   */
  function togglePasswordVisibility() {
    const eyeIcon = togglePassword.querySelector(".eye-icon");
    const eyeOffIcon = togglePassword.querySelector(".eye-off-icon");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.add("hidden");
      eyeOffIcon.classList.remove("hidden");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("hidden");
      eyeOffIcon.classList.add("hidden");
    }
  }

  /**
   * Validate entire form
   */
  function validateForm() {
    const isAccountValid = validateAccountNumber();
    const isPasswordValid = validatePassword();
    return isAccountValid && isPasswordValid;
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

    const accountNumber = accountNumberInput.value.trim();
    const password = passwordInput.value;

    // Check if user exists
    const user = window.DB.getUserByAccountNumber(accountNumber);

    // Hide loading state
    submitBtn.disabled = false;
    btnText.classList.remove("hidden");
    btnLoader.classList.add("hidden");

    if (!user) {
      showError(
        accountNumberInput,
        accountNumberError,
        errorMessages.accountNumber.notFound
      );
      return;
    }

    if (user.password !== password) {
      showError(passwordInput, passwordError, errorMessages.password.incorrect);
      return;
    }

    // Login successful - store session
    localStorage.setItem(
      "session",
      JSON.stringify({ accountNumber: user.accountNumber })
    );

    // Show success popup
    successPopup.classList.remove("hidden");

    // Redirect to home after delay
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1500);
  }

  // Event listeners
  accountNumberInput.addEventListener("blur", validateAccountNumber);
  accountNumberInput.addEventListener("input", () => {
    if (accountNumberInput.classList.contains("error")) {
      validateAccountNumber();
    }
  });

  passwordInput.addEventListener("blur", validatePassword);
  passwordInput.addEventListener("input", () => {
    if (passwordInput.classList.contains("error")) {
      validatePassword();
    }
  });

  togglePassword.addEventListener("click", togglePasswordVisibility);
  form.addEventListener("submit", handleSubmit);
});
