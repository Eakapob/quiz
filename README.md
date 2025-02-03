# README

## ระบบร้านค้าสินค้าออนไลน์

โปรเจกต์นี้เป็นระบบร้านค้าออนไลน์ที่พัฒนาโดยใช้ **React.js** สำหรับฝั่ง Frontend และ **Node.js (Express.js)** สำหรับฝั่ง Backend พร้อมกับการเชื่อมต่อฐานข้อมูล MySQL

---

## 1. Backend

### เทคโนโลยีที่ใช้
- Node.js
- Express.js
- MySQL
- CORS
- FS (File System)
- Path

### การติดตั้งและรันเซิร์ฟเวอร์
```sh
cd backend
npm install express mysql cors fs path
node server.js
```

### พอร์ตที่ใช้งาน
- Backend ทำงานบน **port 3001**

---

## 2. Frontend

### โครงสร้างโปรเจกต์
- **App.js** → เป็นไฟล์หลักที่ใช้กำหนดเส้นทาง (Route) ของหน้าเว็บ
- **components/Document.js** → เป็นหน้าหลักสำหรับซื้อสินค้า
- **components/Cart.js** → เป็นหน้าตะกร้าสินค้า มีการเก็บข้อมูลในตะกร้าแบบ Local Storage

### การติดตั้งและรันเว็บแอป
```sh
cd frontend
npm install
npm install lucide-react  # ติดตั้งไอคอนที่ใช้ในโปรเจกต์
npm start
```

### เทคโนโลยีที่ใช้
- React.js
- Lucide-react (สำหรับไอคอนต่างๆ)

---

## วิธีใช้งาน
1. รัน Backend ก่อนโดยใช้คำสั่ง `node server.js`
2. รัน Frontend โดยใช้คำสั่ง `npm start`
3. เปิดเบราว์เซอร์และเข้าใช้งานที่ `http://localhost:3000`

---

