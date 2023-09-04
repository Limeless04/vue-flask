# vue-flask
## Twitter Backend
Untuk library yang dibutuhkan ada pada file requirenment.txt

untuk menjalankan flask pada terminal
```flask run --debug```
Untuk menjalankan flask pada production dengan gunicorn dapat menggunakan perintah berikut
```gunicorn --bind 127.0.0.1:5000 “app:create_app()”```
untuk itu dapat menginstall gunicorn terlebih dahulu pada linux dengan perintah
```sudo apt install gunicorn```
Peting:
Untuk membuat flask-admin terintegrasi dengan frontend tambahkan konfigurasi berikut:
- tambahkan file .env pada flask
- buat agar flask menembak ip/port yang digunakan oleh frontend

## Twitter Frontend
Untuk menginstall library yang dibutuhkan oleh vue cukup jalankan
```npm install```

untuk menjalankan vue
```npm run dev```
jika ingin membuilt vue
```npm run build```
