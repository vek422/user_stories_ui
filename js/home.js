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

  document.getElementById(
    "customerName"
  ).textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById("accountNumber").textContent = user.accountNumber;
  document.getElementById("balance").textContent =
    user.balance.toLocaleString("en-IN");

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("session");
    window.location.href = "login.html";
  });
});
