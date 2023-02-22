## Studi Kasus Clean Architecture + TDD: Membangun Auth API

Proyek membangun RESTful API. Akan menerapkan 100% coverage testing, serta mengikuti prinsip Clean Architecture dalam dependency rule.  

Tujuan latihan kali ini adalah menciptakan aplikasi yang bersifat:  
- Mudah dikembangkan;
- Mudah diadaptasi oleh berbagai framework;
- Teruji dan terhindar dari bugs;

TODO:  
- [x] Custom Error
  * ClientError
  * InvariantError
  * AuthenticationError
  * NotFoundError
- [x] Fitur Registrasi Penguna
- [ ] Fitur Autentikasi atau proses login
  * [ ] Memperbaharui authentikasi atau refresh token
  * [ ] Menghapus autentikasi atau peoses logout

Tips dalam mengembangkan fitur baru: 
  * Kebutuhan bisnis seperti domain model dan repository interface + unit test.
  * Alur bisnis atau use case dan service interface yang dibutuhkan use case + unit test.
  * Kebutuhan infrastructure seperti database (termasuk pembuatan tabel jika diperlukan), repository concreate, service concreate + integration testing.
  * Kebutuhan interface HTTP server seperti routing dan handler + functional testing.
