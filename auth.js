<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login to Online Library</title>
</head>
<body>
  <!-- Google Login Button -->
  <button id="google-login-btn">Login with Google</button>

  <!-- Phone Authentication -->
  <input type="text" id="phone-input" placeholder="Enter phone number" />
  <button id="send-otp-btn">Send OTP</button>
  <input type="text" id="otp-input" placeholder="Enter OTP" />
  <button id="verify-otp-btn">Verify OTP</button>

  <!-- reCAPTCHA container -->
  <div id="recaptcha-container"></div>

  <script type="module">
    // Import Firebase SDK for Authentication
    import { initializeApp } from "firebase/app";
    import { getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDRiBT5iE-PZ3KgItSjCfIA70SZq7dDAds",
      authDomain: "booknook-7d21f.firebaseapp.com",
      projectId: "booknook-7d21f",
      storageBucket: "booknook-7d21f.firebasestorage.app",
      messagingSenderId: "904735160402",
      appId: "1:904735160402:web:9212c2368340635061078b",
      measurementId: "G-0M49RYXSJ3"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Google Login Function
    const googleLogin = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in with Google:", user);
        alert(`Welcome ${user.displayName}`);
  
        // Redirect to the main home page of the site
        window.location.href = "/home.html";  // Adjust the path if needed
      } catch (error) {
        console.error("Error signing in with Google:", error);
        alert("Google login failed: " + error.message);
      }
    };

    // Phone Authentication (OTP)
    const sendOTP = async (phoneNumber) => {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { size: 'normal' }, auth);
      const appVerifier = window.recaptchaVerifier;

      try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        window.confirmationResult = confirmationResult;
        console.log("OTP sent to the phone number:", phoneNumber);
        alert("OTP sent successfully.");
      } catch (error) {
        console.error("Error sending OTP:", error);
        alert("Error sending OTP: " + error.message);
      }
    };

    // Verify OTP
    const verifyOTP = async (otpCode) => {
      try {
        const confirmationResult = window.confirmationResult;
        const result = await confirmationResult.confirm(otpCode);
        const user = result.user;
        console.log("Phone number authenticated:", user);
        alert(`Phone number authenticated: Welcome ${user.phoneNumber}`);
  
        // Redirect to the main home page of the site
        window.location.href = "/index.html";  // Adjust the path if needed
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("OTP verification failed: " + error.message);
      }
    };

    // Event listeners for Google login
    document.getElementById("google-login-btn").addEventListener("click", async () => {
      await googleLogin();
    });

    // Event listeners for Phone Authentication (OTP)
    document.getElementById("send-otp-btn").addEventListener("click", async () => {
      const phoneNumber = document.getElementById("phone-input").value;
      if (phoneNumber) {
        await sendOTP(phoneNumber);
      } else {
        alert("Please enter a valid phone number.");
      }
    });

    document.getElementById("verify-otp-btn").addEventListener("click", async () => {
      const otpCode = document.getElementById("otp-input").value;
      if (otpCode) {
        await verifyOTP(otpCode);
      } else {
        alert("Please enter the OTP code.");
      }
    });
  </script>
</body>
</html>
