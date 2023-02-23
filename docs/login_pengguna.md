Fitur: Login Pengguna
Sebagai seoran pengguna, saya ingin login sebagai entitas yang yang sah.

payload:
username (string)
password (string)

Spesifikasi:
* Ketika masuk tanpa memberikan entitas yang dibutuhkan:
  - maka error
* ketika masuk dengan memberikan entitas yang tipe datanya tidak sesuai:
  - maka error
* Ketika masuk dengan username tidak terdafter:
  - maka error
* Ketika masuk dengan payload yang benar:
  - maka pengguna dapat token autentikasi

Catatan sisi server:
* Verifikasi username di database
* Encrypsi password
* Kembalikan permintaan pengguna dengan nilai kembalian token.
