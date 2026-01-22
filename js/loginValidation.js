document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const accountNumberInput = document.getElementById("accountNumber");
  const passwordInput = document.getElementById("password");

  const accountNumberError = document.getElementById("accountNumberError");
  const passwordError = document.getElementById("passwordError");

  const togglePassword = document.getElementById("togglePassword");

  const successPopup = document.getElementById("successPopup");

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

  function showError(input, errorElement, message) {
    input.classList.remove("success");
    input.classList.add("error");
    errorElement.textContent = message;
    errorElement.classList.add("visible");
  }

  function showSuccess(input, errorElement) {
    input.classList.remove("error");
    input.classList.add("success");
    errorElement.textContent = "";
    errorElement.classList.remove("visible");
  }

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

  function validatePassword() {
    const value = passwordInput.value;
    if (!value) {
      showError(passwordInput, passwordError, errorMessages.password.empty);
      return false;
    }
    showSuccess(passwordInput, passwordError);
    return true;
  }

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

  function validateForm() {
    const isAccountValid = validateAccountNumber();
    const isPasswordValid = validatePassword();
    return isAccountValid && isPasswordValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = form.querySelector(".error");
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    const accountNumber = accountNumberInput.value.trim();
    const password = passwordInput.value;

    const user = window.DB.getUserByAccountNumber(accountNumber);

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

    localStorage.setItem(
      "session",
      JSON.stringify({ accountNumber: user.accountNumber })
    );

    successPopup.classList.remove("hidden");

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1500);
  }

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
