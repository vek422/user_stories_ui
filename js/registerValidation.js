/**
 * Registration Form Validation
 * Handles client-side validation for the registration form
 */

document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const form = document.getElementById("registerForm");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const dobInput = document.getElementById("dob");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const termsCheckbox = document.getElementById("terms");
  const submitBtn = document.getElementById("submitBtn");

  // Error message elements
  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const dobError = document.getElementById("dobError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const termsError = document.getElementById("termsError");

  // Password toggle buttons
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );

  // Password strength elements
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");

  // Success message
  const successMessage = document.getElementById("successMessage");

  // Validation patterns
  const patterns = {
    fullName: /^[a-zA-Z\s]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{4,6}$/,
  };

  // Error messages
  const errorMessages = {
    fullName: {
      empty: "Full name is required",
      invalid: "Please enter a valid name (letters only, 2-50 characters)",
    },
    email: {
      empty: "Email address is required",
      invalid: "Please enter a valid email address",
    },
    phone: {
      empty: "Phone number is required",
      invalid: "Please enter a valid phone number",
    },
    dob: {
      empty: "Date of birth is required",
      underage: "You must be at least 18 years old to register",
      future: "Date of birth cannot be in the future",
    },
    password: {
      empty: "Password is required",
      short: "Password must be at least 8 characters long",
      weak: "Password must include uppercase, lowercase, number, and special character",
    },
    confirmPassword: {
      empty: "Please confirm your password",
      mismatch: "Passwords do not match",
    },
    terms: {
      unchecked: "You must agree to the Terms of Service and Privacy Policy",
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
   * Clear field state
   */
  function clearState(input, errorElement) {
    input.classList.remove("error", "success");
    errorElement.textContent = "";
    errorElement.classList.remove("visible");
  }

  /**
   * Validate full name
   */
  function validateFullName() {
    const value = fullNameInput.value.trim();
    if (!value) {
      showError(fullNameInput, fullNameError, errorMessages.fullName.empty);
      return false;
    }
    if (!patterns.fullName.test(value)) {
      showError(fullNameInput, fullNameError, errorMessages.fullName.invalid);
      return false;
    }
    showSuccess(fullNameInput, fullNameError);
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
   * Validate phone number
   */
  function validatePhone() {
    const value = phoneInput.value.trim();
    if (!value) {
      showError(phoneInput, phoneError, errorMessages.phone.empty);
      return false;
    }
    if (!patterns.phone.test(value)) {
      showError(phoneInput, phoneError, errorMessages.phone.invalid);
      return false;
    }
    showSuccess(phoneInput, phoneError);
    return true;
  }

  /**
   * Validate date of birth
   */
  function validateDob() {
    const value = dobInput.value;
    if (!value) {
      showError(dobInput, dobError, errorMessages.dob.empty);
      return false;
    }

    const dob = new Date(value);
    const today = new Date();

    // Check if date is in the future
    if (dob > today) {
      showError(dobInput, dobError, errorMessages.dob.future);
      return false;
    }

    // Check if user is at least 18
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    const isUnderage =
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));

    if (isUnderage) {
      showError(dobInput, dobError, errorMessages.dob.underage);
      return false;
    }

    showSuccess(dobInput, dobError);
    return true;
  }

  /**
   * Calculate password strength
   */
  function calculatePasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return "weak";
    if (score <= 3) return "fair";
    if (score <= 5) return "good";
    return "strong";
  }

  /**
   * Update password strength indicator
   */
  function updatePasswordStrength(password) {
    const strength = calculatePasswordStrength(password);

    // Remove all strength classes
    strengthBar.classList.remove("weak", "fair", "good", "strong");
    strengthText.classList.remove("weak", "fair", "good", "strong");

    if (password.length === 0) {
      strengthBar.style.width = "0%";
      strengthText.textContent = "";
      return;
    }

    strengthBar.classList.add(strength);
    strengthText.classList.add(strength);

    const strengthLabels = {
      weak: "Weak password",
      fair: "Fair password",
      good: "Good password",
      strong: "Strong password",
    };

    strengthText.textContent = strengthLabels[strength];
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

    if (value.length < 8) {
      showError(passwordInput, passwordError, errorMessages.password.short);
      return false;
    }

    // Check for password complexity
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^a-zA-Z0-9]/.test(value);

    if (!hasLowercase || !hasUppercase || !hasNumber || !hasSpecial) {
      showError(passwordInput, passwordError, errorMessages.password.weak);
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
   * Validate terms checkbox
   */
  function validateTerms() {
    const checkboxCustom = termsCheckbox
      .closest(".checkbox-label")
      .querySelector(".checkbox-custom");

    if (!termsCheckbox.checked) {
      checkboxCustom.classList.add("error");
      termsError.textContent = errorMessages.terms.unchecked;
      termsError.classList.add("visible");
      return false;
    }

    checkboxCustom.classList.remove("error");
    termsError.textContent = "";
    termsError.classList.remove("visible");
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
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isDobValid = validateDob();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsValid = validateTerms();

    return (
      isFullNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isDobValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isTermsValid
    );
  }

  /**
   * Handle form submission
   */
  async function handleSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      // Focus on the first error field
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Hide loading state
    submitBtn.disabled = false;
    btnText.classList.remove("hidden");
    btnLoader.classList.add("hidden");

    // Show success message
    successMessage.classList.remove("hidden");
    form.querySelectorAll(".form-group").forEach((group) => {
      group.style.opacity = "0.5";
      group.style.pointerEvents = "none";
    });
    submitBtn.style.display = "none";

    // Redirect after delay (simulated)
    setTimeout(() => {
      // In a real app, redirect to login or dashboard
      // window.location.href = 'login.html';
      console.log("Registration successful! Would redirect to login page.");
    }, 2000);
  }

  // Event listeners for real-time validation
  fullNameInput.addEventListener("blur", validateFullName);
  fullNameInput.addEventListener("input", () => {
    if (fullNameInput.classList.contains("error")) {
      validateFullName();
    }
  });

  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("error")) {
      validateEmail();
    }
  });

  phoneInput.addEventListener("blur", validatePhone);
  phoneInput.addEventListener("input", () => {
    if (phoneInput.classList.contains("error")) {
      validatePhone();
    }
  });

  dobInput.addEventListener("blur", validateDob);
  dobInput.addEventListener("change", validateDob);

  passwordInput.addEventListener("blur", validatePassword);
  passwordInput.addEventListener("input", () => {
    updatePasswordStrength(passwordInput.value);
    if (passwordInput.classList.contains("error")) {
      validatePassword();
    }
    // Re-validate confirm password if it has been touched
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

  termsCheckbox.addEventListener("change", validateTerms);

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
