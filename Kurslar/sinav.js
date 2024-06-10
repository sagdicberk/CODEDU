import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// Sonucları kontrol et
function SinavKontrol(user, kursAdi) {
  var userId = user.uid;
  var networkCevaplar = ['1-b', '2-b', '3-b', '4-b', '5-c', '6-c', '7-c', '8-b', '9-d', '10-b'];
  var osCevaplar = ['1-c', '2-d', '3-b', '4-a', '5-d', '6-a', '7-b', '8-b', '9-d', '10-c'];
  var csCevaplar = ['1-b', '2-b', '3-b', '4-b', '5-d', '6-b', '7-a', '8-c', '9-c', '10-b'];
  var webCevaplar = ['1-a', '2-c', '3-c', '4-a', '5-b', '6-c', '7-c', '8-b', '9-c', '10-b'];

  var dogruCevaplar;
  var dogruSayisi = 0;

  //Kurs ismine göre doğru cevap seçimi
  switch (kursAdi) {
    case 'network':
      dogruCevaplar = networkCevaplar;
      break;
    case 'OS':
      dogruCevaplar = osCevaplar;
      break;
    case 'CS':
      dogruCevaplar = csCevaplar;
      break;
    case 'Web':
      dogruCevaplar = webCevaplar;
      break;
    default:
      console.log('Bilinmeyen kurs adı:', kursAdi);
      break;
  }
  // Her bir soru için kontrol yap
  for (var i = 1; i <= 10; i++) {
    var soruId = i.toString();
    var secilenCevapId = null;

    // Doğru cevabın id'sini bul
    var cevaplar = document.querySelectorAll("input[type='radio'][name='Soru" + soruId + "']");
    for (var j = 0; j < cevaplar.length; j++) {
      if (cevaplar[j].checked) {
        secilenCevapId = cevaplar[j].id;
        break;
      }
    }

    // Doğru cevap seçilmişse dogruSayisi'ni artır
    if (secilenCevapId !== null && dogruCevaplar[i - 1] === secilenCevapId) {
      dogruSayisi++;
    }
  }

  // Sonucu göster
  alert("Toplam doğru sayısı: " + dogruSayisi);
  if (dogruSayisi > 7) {
    alert("Başarılı: " + dogruSayisi + " doğru cevap ile geçtiniz");
    kaydet(userId, kursAdi, 1);
    alert("0");
  } else {
    alert("Başarısız");
    kaydet(userId, kursAdi, 0);
    alert("1");

  }
}

// firebase'e kurs sonucu girilmesi
function kaydet(userId, kursAdi, basarili) {
  var value = basarili ? 1 : 0;
  const dbRef = ref(database, userId + '/' + kursAdi + '/Value');
  set(dbRef, value)
    .then(function () {
      console.log("Veri başarıyla kaydedildi!");
    })
    .catch(function (error) {
      console.error("Veri kaydederken hata oluştu: ", error);
    });
}

// Oturum durumunu dinle
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Oturum açık ise, buton dinleyicisini ekle
    var sinavTamamlaButton = document.getElementById("sinavTamamla");
    var kursAdi = sinavTamamlaButton.dataset.course;
    sinavTamamlaButton.addEventListener("click", () => {
      SinavKontrol(user, kursAdi);
    });
  }
});


