# 🏷️ **Coupon Distribution Web Application**

This web application allows users to **claim coupons** in a **round-robin manner** with **cooldown restrictions** and provides an **Admin Panel** for managing coupons.

---

## 📋 **Features**
✅ **Guest Users** can claim coupons with cooldown restrictions (one claim every 10 minutes).  
✅ **Admin Panel** for adding, updating, deleting, and managing coupons.  
✅ **Cookie-Based Cooldown System** to prevent abuse.  
✅ **IP Tracking** to restrict multiple claims from the same IP.  
✅ **Real-Time Coupon Update** after successful claims.  
✅ **Responsive UI** with dynamic success/error notifications.  

---

## 🚀 **Setup Instructions**

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2️⃣ **Install Dependencies**

**For Backend**
```bash
cd backend
npm install
```

**For Frontend**
```bash
cd frontend
npm install
```

---

### 3️⃣ **Environment Variables Setup**
Create a `.env` file in the **backend** folder and add these keys:

```
PORT=5100
MONGO_URI= 'mongodb+srv://sakshamarya873:Saksham1234@cluster873.r4zst.mongodb.net/Coupons?retryWrites=true&w=majority&appName=Cluster873'
```

---

### 4️⃣ **Database Setup**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas).  
2. Create a **free cluster** and generate your **connection string**.  
3. Add the connection string to your `.env` file as `MONGO_URI`.

---

### 5️⃣ **Build the Frontend**
For **Vite** (Recommended):
```bash
cd frontend
npm run build
```

For **React (CRA)**:
```bash
cd frontend
npm run build
```

👉 Move the generated `/dist` (Vite) or `/build` (CRA) folder to `/backend/public`.

---

### 6️⃣ **Run the Project**

**For Backend**
```bash
cd backend
npm start
```

**For Frontend (Optional if not integrated with backend)**
```bash
cd frontend
npm run dev
```

---

### 7️⃣ **Access the Application**
- **Frontend URL:** [http://localhost:5100](http://localhost:5100)  
- **API URL:** [http://localhost:5100/api/v1](http://localhost:5100/api/v1)  

---

## 📺 **Project Structure**

```
/backend
 ├── /Routes
 │   ├── AdminRouter.js
 │   └── GuestUser.js
 ├── /Controllers
 │   ├── adminController.js
 │   └── guestController.js
 ├── /Models
 │   ├── Coupon.js
 │   ├── ClaimHistory.js
 │   └── Admin.js
 ├── /public (Frontend build files)
 │   ├── index.html
 │   └── assets/...
 ├── .env
 ├── server.js
 ├── package.json
 └── README.md
```

---

## 🛠️ **Key Implementation Details**

### 📀 **Backend Implementation**
✅ **Express.js Framework** for server-side logic.  
✅ **MongoDB with Mongoose** for data storage and coupon management.  
✅ **Routes:**  
- `/api/v1/admin` → Admin functionalities.  
- `/api/v1/guest` → Guest functionalities.  
✅ **Cookie-Based Cooldown Logic** to prevent spam claims.  
✅ **IP Tracking & Session Management** for security.  

---

### 📀 **Frontend Implementation**
✅ **React (with Vite)** for faster builds.  
✅ **React Router** for page navigation.  
✅ **MUI (Material UI)** for improved UI and alerts.  
✅ **Dynamic Feedback** with Snackbars for success/error alerts.  
✅ **Real-Time Data Refresh** every **5 seconds** for live coupon updates.  

---
