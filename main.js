import { googleLogin, facebookLogin, sendOtp, verifyOtp, logout } from "./auth";

const googleLoginBtn = document.getElementById("googleLoginBtn");
const facebookLoginBtn = document.getElementById("facebookLoginBtn");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");
const userInfo = document.getElementById("userInfo");
const loginSection = document.querySelector(".login-section");

// Google Login
googleLoginBtn.addEventListener("click", async () => {
  try {
    const user = await googleLogin();
    displayUser(user.displayName);
  } catch (error) {
    alert("Google login failed!");
  }
});

// Facebook Login
facebookLoginBtn.addEventListener("click", async () => {
  try {
    const user = await facebookLogin();
    displayUser(user.displayName);
  } catch (error) {
    alert("Facebook login failed!");
  }
});

// Phone Login
let confirmationResult;
sendOtpBtn.addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phoneNumber").value;
  try {
    confirmationResult = await sendOtp(phoneNumber, "recaptcha-container");
    document.getElementById("otpSection").style.display = "block";
  } catch (error) {
    alert("Failed to send OTP!");
  }
});

verifyOtpBtn.addEventListener("click", async () => {
  const otpCode = document.getElementById("otpCode").value;
  try {
    const user = await verifyOtp(confirmationResult, otpCode);
    displayUser(user.phoneNumber);
  } catch (error) {
    alert("OTP verification failed!");
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await logout();
  loginSection.style.display = "block";
  userInfo.style.display = "none";
});

// Display User Info
function displayUser(name) {
  userName.textContent = name;
  userInfo.style.display = "block";
  loginSection.style.display = "none";
}
