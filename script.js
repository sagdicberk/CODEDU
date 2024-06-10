// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,    
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

document.getElementById("btn-signup").addEventListener("click", () => {
    const email = document.getElementById("txt-email-signup").value.trim();
    const password = document.getElementById("txt-password-signup").value.trim();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Kayıt başarılı!");
            console.log(user);
            window.location.href = "profile.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Signup hatası:");
            console.log(errorMessage);
        });
});

document.getElementById("btn-login").addEventListener("click", () => {
    const email = document.getElementById("txt-email-login").value.trim();
    const password = document.getElementById("txt-password-login").value.trim();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Login başarılı!");
            console.log(user);
            window.location.href = "profile.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Login hatası:");
            console.log(errorMessage);
            // hata kutusunu göstermek için
            document.getElementById("hata-box").style.display = "flex";
            setTimeout(() => {
                document.getElementById("hata-box").style.display = "none"; // 5 saniye sonra error box'u gizle
            }, 5000);
        });
});
