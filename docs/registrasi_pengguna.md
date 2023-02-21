Fitur: Registrasi Pengguna
Sebagai seorang pengguna, saya ingin mendaftarkan diri sebagai entitas untuk proses auentikasi.  

Payload:
* username (string)
* password (string)
* fullname (string)

Spesifikasi:
* Ketika mendaftar tanpa memberikan entias yang dibutuhkan: 
  - maka error
* Ketika mendaftar dengan memberikan entitas yang tipe datanya tidak sesuai:
  - maka error
* Ketika mendaftar dengan username lebih dari 50 karakter:
  - maka error
* ketika mendaftar dengan username yang sudah digunakan:
  - maka error
* Ketika mandaftar dengan payload yang benar:
  - maka user baru harus terbuat

Catatan sisi sistem:
* Enkripsi passwors user
* Simpan user baru pada database
* Kembalikan permintaan pengguna dengan nilai user yang dimasukan
* 
