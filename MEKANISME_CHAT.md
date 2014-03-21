Mekanisme chat dilakukan sebagai berikut :

* [Komputer user1] Pertama login memasukkan id dia sendiri dan id yang ingin diajak ngobrol (user2)
* [Sistem] Menyimpan nama id user1 pada variable global user. Jika id tersebut ada, maka tolak chat.
* [Sistem] Cek apakah user1 dan user2 (atau sebaliknya) ada di dalam variabel global chat. Jika belum, simpan nama id user1 dan user2 pada variabel global, inisiasi seed kalau bisa.
* [Sistem] Menggiring user1 ke halaman chat
* [Komputer user1] Inisiasi koneksi (emit connect) socketIO ke sistem, kirimkan sessID socketIO dirinya sendiri 
* [Sistem] Cek apakah user2 sudah tersimpan di variabel user, Karena belum, infinite loop terus.
* [Komputer user2] Login dengan id user2 dan tujuan user1
* [Sistem] Menyimpan nama id user2 pada variable global user. Jika id tersebut ada, maka tolak chat.
* [Sistem] Cek apakah user1 dan user2 (atau sebaliknya) ada di dalam variabel global, karena sudah ada, abaikan
* [Sistem] Menggiring user2 ke halaman chat.
* [Komputer user2] Inisiasi koneksi (emit connect) socketIO ke sistem, kirimkan sessID socketIO dirinya sendiri
* [Sistem] Cek apakah user1 sudah tersimpan di variabel user, Karena sudah, lanjut
* [Sistem] Infinite loop untuk user1 dihentikan dan emit chatStart ke user1
* [Sistem] emit chatStart juga ke komputer2 

# Mengirim pesan
* [Komputer user1] Mengirimkan pesan terenkripsi ke user1, emit sendMessage
* [Sistem] Menerima emit sendMessage, emit receiveMessage ke klien tujuan dengan pesan tersebut
* [Komputer user2] emit receiveMessage diterima, pesan didekripsi.
