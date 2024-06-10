function ac(id) {
    var icerik = document.getElementById('icerik' + id);
    if (icerik.style.display === 'none' || icerik.style.display === '') {
        icerik.style.display = 'block';
    } else {
        icerik.style.display = 'none';
    }
}

  
  function tamamla(id) {
    
    // Belirtilen id'ye sahip dairenin arka plan rengini yeşil yap
    document.getElementById("daire" + id).style.background = "green";
    
    // Belirtilen id'ye sahip içeriği gizle
    document.getElementById("icerik" + id).style.display = "none";
    
    // Eğer id 4'ten küçükse, bir sonraki içeriği göster
    if (id < 4) {
        document.getElementById("icerik" + (id + 1)).style.display = "block";
    }
    
    // Kontrol et fonksiyonunu çağır
    kontrolEt();
}

function kontrolEt() {
    var daire1 = document.getElementById("daire1").style.background;
    var daire2 = document.getElementById("daire2").style.background;
    var daire3 = document.getElementById("daire3").style.background;
    var daire4 = document.getElementById("daire4").style.background;
  
    // Eğer tüm dairler yeşilse
    if (daire1 === "green" && daire2 === "green" && daire3 === "green" && daire4 === "green") {
        // Tüm içerikleri gizle
        for (var i = 1; i <= 4; i++) {
            document.getElementById("icerik" + i).style.display = "none";
        }
        // Sonraki sayfayı göster
        document.getElementById("sinavgiris").style.display = "block";
    }
}

function NetSin() {
    document.getElementById("icerik1").style.display = "none";
    document.getElementById("icerik2").style.display = "none";
    document.getElementById("icerik3").style.display = "none";
    document.getElementById("icerik4").style.display = "none";
    document.getElementById("kurs").style.display = "none";
    document.getElementById("sinavgiris").style.display = "none";
    document.getElementById("sorular").style.display = "block";
    document.getElementById("sinavTamamla").style.display = "block";
}