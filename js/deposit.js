document.addEventListener("DOMContentLoaded", () => {
  const sessionData = localStorage.getItem("session");
  if (!sessionData) {
    window.location.href = "login.html";
    return;
  }

  const session = JSON.parse(sessionData);
  let user = window.DB.getUserByAccountNumber(session.accountNumber);

  if (!user) {
    localStorage.removeItem("session");
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("depositForm");
  const amountInput = document.getElementById("amount");
  const amountError = document.getElementById("amountError");
  const currentBalanceDisplay = document.getElementById("currentBalance");
  const resultCard = document.getElementById("resultCard");

  currentBalanceDisplay.textContent = user.balance.toLocaleString("en-IN");

  function validateAmount() {
    const value = amountInput.value;

    if (!value || value <= 0) {
      amountInput.classList.add("error");
      amountError.textContent = "Please enter a valid amount";
      amountError.classList.add("visible");
      return false;
    }

    amountInput.classList.remove("error");
    amountError.textContent = "";
    amountError.classList.remove("visible");
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateAmount()) {
      return;
    }

    const amount = parseFloat(amountInput.value);
    const newBalance = user.balance + amount;

    const result = window.DB.updateUser(user.accountNumber, {
      balance: newBalance,
    });

    if (result.success) {
      user = result.user;

      currentBalanceDisplay.textContent = user.balance.toLocaleString("en-IN");

      document.getElementById("resultAccountNumber").textContent =
        user.accountNumber;
      document.getElementById(
        "resultName"
      ).textContent = `${user.firstName} ${user.lastName}`;
      document.getElementById(
        "resultAmount"
      ).textContent = `₹${amount.toLocaleString("en-IN")}`;
      document.getElementById(
        "resultBalance"
      ).textContent = `₹${user.balance.toLocaleString("en-IN")}`;

      form.classList.add("hidden");
      resultCard.classList.remove("hidden");
    }
  }

  document.getElementById("anotherBtn").addEventListener("click", () => {
    amountInput.value = "";
    form.classList.remove("hidden");
    resultCard.classList.add("hidden");
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("session");
    window.location.href = "login.html";
  });

  amountInput.addEventListener("input", () => {
    if (amountInput.classList.contains("error")) {
      validateAmount();
    }
  });

  form.addEventListener("submit", handleSubmit);
});
