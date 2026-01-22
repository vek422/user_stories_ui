document.addEventListener("DOMContentLoaded", () => {
  const sessionData = localStorage.getItem("session");
  if (!sessionData) {
    window.location.href = "login.html";
    return;
  }

  const session = JSON.parse(sessionData);
  const user = window.DB.getUserByAccountNumber(session.accountNumber);

  if (!user) {
    localStorage.removeItem("session");
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("profileForm");
  const accountNumberInput = document.getElementById("accountNumber");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const aadharIdInput = document.getElementById("aadharId");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");
  const contactNumberInput = document.getElementById("contactNumber");
  const submitBtn = document.getElementById("submitBtn");

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const aadharIdError = document.getElementById("aadharIdError");
  const emailError = document.getElementById("emailError");
  const addressError = document.getElementById("addressError");
  const contactNumberError = document.getElementById("contactNumberError");

  const successPopup = document.getElementById("successPopup");
  const closePopup = document.getElementById("closePopup");

  accountNumberInput.value = user.accountNumber;
  firstNameInput.value = user.firstName;
  lastNameInput.value = user.lastName;
  aadharIdInput.value = user.aadharId;
  emailInput.value = user.email;
  addressInput.value = user.address;
  contactNumberInput.value = user.contactNumber;

  const patterns = {
    name: /^[a-zA-Z\s]{1,50}$/,
    aadharId: /^\d{12}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    contactNumber: /^\d{10}$/,
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

  function validateFirstName() {
    const value = firstNameInput.value.trim();
    if (!value) {
      showError(firstNameInput, firstNameError, "First name is required");
      return false;
    }
    if (!patterns.name.test(value)) {
      showError(firstNameInput, firstNameError, "Invalid name format");
      return false;
    }
    showSuccess(firstNameInput, firstNameError);
    return true;
  }

  function validateLastName() {
    const value = lastNameInput.value.trim();
    if (!value) {
      showError(lastNameInput, lastNameError, "Last name is required");
      return false;
    }
    if (!patterns.name.test(value)) {
      showError(lastNameInput, lastNameError, "Invalid name format");
      return false;
    }
    showSuccess(lastNameInput, lastNameError);
    return true;
  }

  function validateAadharId() {
    const value = aadharIdInput.value.trim();
    if (!value) {
      showError(aadharIdInput, aadharIdError, "Aadhar ID is required");
      return false;
    }
    if (!patterns.aadharId.test(value)) {
      showError(aadharIdInput, aadharIdError, "Enter valid 12-digit Aadhar ID");
      return false;
    }
    showSuccess(aadharIdInput, aadharIdError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      showError(emailInput, emailError, "Email is required");
      return false;
    }
    if (!patterns.email.test(value)) {
      showError(emailInput, emailError, "Invalid email format");
      return false;
    }
    showSuccess(emailInput, emailError);
    return true;
  }

  function validateAddress() {
    const value = addressInput.value.trim();
    if (!value) {
      showError(addressInput, addressError, "Address is required");
      return false;
    }
    if (value.length > 100) {
      showError(addressInput, addressError, "Max 100 characters allowed");
      return false;
    }
    showSuccess(addressInput, addressError);
    return true;
  }

  function validateContactNumber() {
    const value = contactNumberInput.value.trim();
    if (!value) {
      showError(
        contactNumberInput,
        contactNumberError,
        "Contact number is required"
      );
      return false;
    }
    if (!patterns.contactNumber.test(value)) {
      showError(
        contactNumberInput,
        contactNumberError,
        "Enter valid 10-digit number"
      );
      return false;
    }
    showSuccess(contactNumberInput, contactNumberError);
    return true;
  }

  function validateForm() {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isAadharValid = validateAadharId();
    const isEmailValid = validateEmail();
    const isAddressValid = validateAddress();
    const isContactValid = validateContactNumber();

    return (
      isFirstNameValid &&
      isLastNameValid &&
      isAadharValid &&
      isEmailValid &&
      isAddressValid &&
      isContactValid
    );
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

    const updates = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      aadharId: aadharIdInput.value.trim(),
      email: emailInput.value.trim(),
      address: addressInput.value.trim(),
      contactNumber: contactNumberInput.value.trim(),
    };

    const result = window.DB.updateUser(user.accountNumber, updates);

    if (result.success) {
      successPopup.classList.remove("hidden");
    }
  }

  closePopup.addEventListener("click", () => {
    successPopup.classList.add("hidden");
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("session");
    window.location.href = "login.html";
  });

  firstNameInput.addEventListener("blur", validateFirstName);
  lastNameInput.addEventListener("blur", validateLastName);
  aadharIdInput.addEventListener("blur", validateAadharId);
  emailInput.addEventListener("blur", validateEmail);
  addressInput.addEventListener("blur", validateAddress);
  contactNumberInput.addEventListener("blur", validateContactNumber);

  form.addEventListener("submit", handleSubmit);
});
