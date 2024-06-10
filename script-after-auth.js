import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Firebase'in başlatılması
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
var database = getDatabase(firebaseApp);

// Kullanıcı emailinin gösterilmesi
function displayUserEmail(user) {
  // Fonksiyonun geri kalan kısmı
  if (user) {
    const userEmail = user.email;
    document.getElementById('user-email').innerText = userEmail;
  } else {
    document.getElementById('user-email').innerText = 'User Email: Not signed in';
  }
}

// Profil sayfasında bitirilen kursları gösteren elementlerin referanslarını alalım
const webDaire = document.getElementById('web');
const networkDaire = document.getElementById('network');
const csDaire = document.getElementById('CS');
const osDaire = document.getElementById('OS');

// Kullanıcının bitirdiği kursların değerlerini dinamik olarak kontrol eden ve dairenin rengini ayarlayan fonksiyon
function setDaireRenk(daire, userId, kursAdi) {
  console.log("User ID:", userId);
  console.log("Kurs Adı:", kursAdi);
  const dbRef = ref(database, userId + '/' + kursAdi + '/Value');
  onValue(dbRef, (snapshot) => {
    const kursDurumu = snapshot.val();
    console.log("Kurs Durumu:", kursDurumu);
    if (kursDurumu === 1) {
      daire.style.backgroundColor = 'green';
    } else {
      daire.style.backgroundColor = 'gray';
    }
  });
}

// şifre Değiştirme işlemi
//////////////////////////////////////
function sifreSifirla(user) {
  if (!user) {
    alert('Could not find user information');
    return;
  }
  const userEmail = user.email;
  if (!userEmail) {
    alert('Could not find your email address');
    return;
  }
  sendPasswordResetEmail(auth, userEmail)
    .then(() => {
      alert('Password reset email sent');
    })
    .catch((error) => {
      console.error(error);
      alert('Error sending password reset email: ' + error.message);
    });
}

// Çıkış Fonksiyonu 
function cikisYap() {
  signOut(auth)
    .then(() => {
      console.log("Signout Başarılı");
      window.location.href = "index.html";
      alert("Başarıyla hesabınızdan çıkış yaptınız");
    })
    .catch((error) => {
      console.log("Signout Başarısız");
    });
}

function sil() {
  const user = auth.currentUser;
  // Kullanıcının tekrar giriş yapması için hesap silme işlemi başarısız olursa gereken adımları içeren fonksiyon
  const handleRequiresRecentLoginError = () => {
    // Hata mesajını göster
    alert("Hesabınızı silmek için tekrar giriş yapmanız gerekmektedir.");
    // Kullanıcıyı giriş yapma sayfasına yönlendir
    window.location.href = "login.html";
  };
  // Kullanıcının hesabını sil
  user.delete().then(() => {
    // Kullanıcı hesabı başarıyla silindiğinde yapılacak işlemler
    console.log("Kullanıcı hesabı başarıyla silindi.");
    // Örneğin, kullanıcıyı başka bir sayfaya yönlendirebilirsiniz
    window.location.href = "index.html";
  }).catch((error) => {
    // Hesap silinirken bir hata oluştuğunda yapılacak işlemler
    console.error("Kullanıcı hesabı silinirken bir hata oluştu:", error);
    // Hatanın nedeni "auth/requires-recent-login" ise gerekli adımları uygula
    if (error.code === "auth/requires-recent-login") {
      handleRequiresRecentLoginError();
    } else {
      // Diğer hata durumlarını ele alabilirsiniz
      alert("Kullanıcı hesabı silinirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  });
}


// Main Fonk gibi düşün
// İlk olarak kullanıcı emailini göster
onAuthStateChanged(auth, (user) => {

  displayUserEmail(user);

  // Kurs İlerleme Ekranı
  const userId = user.uid;
  console.log("User ID:", userId); // Konsola userId değerini yazdır

  // Her bir kurs için dairenin rengini ayarlayalım
  setDaireRenk(webDaire, userId, 'Web');
  setDaireRenk(networkDaire, userId, 'network');
  setDaireRenk(csDaire, userId, 'CS');
  setDaireRenk(osDaire, userId, 'OS');


  // Şifre Değiştirme
  document.getElementById("degis").addEventListener("click", () => {
    sifreSifirla(user);
  });
  // Çıkış Yapma
  document.getElementById("btn-signout").addEventListener("click", () => {
    cikisYap();
  });
  // Hesap Silme
  document.getElementById("sil").addEventListener("click", () => {
    sil();
  });
});
