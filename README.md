# NFTurist

A NFT for turists in Peru 💰

## Features:

- ✍️ Register location of places visited by the users 
- ✍️ Allows them to upload picture as a proof
- 📱 Such picture will be sent back to the user Phantom Wallet as an NFT
- 👨‍💼 Includes a button to link the wallet of User and Admin
- 👑 Admin has the rights to send Solana to User wallets as CashBacks.
- 📸  Admin can see all pictures Users upload
  > >

## Routes

### **Credentials**

- **Administrator:**
  email: arturo@gmail.com
  password: Perro12345

- **Recently registered user:**
   email: eduardo@nfturistperu.com
  password: Perro12345

## Home
---
### **get** Home page

```
http://localhost:5005/api/
```

## User Routes

---

### **GET** profile

```
http://localhost:5005/api/user/my-profile
```

---

### **Post** upload photo

```
http://localhost:5005/api/user/my-profile/singleUpload
```

```
http://localhost:5005/api/user/my-profile/uploadReceipt
```


---



## Auth Routes


---

### **POST** login

```
http://localhost:5005/api/auth/login
```

```
{
 email: arturo@gmail.com
  password: Perro12345
}
```

---

### **POST** signup

```
http://localhost:5005/api/auth/login
```

```
{
firstName:
lastName:
email: eduardo@nfturistperu.com
password: Perro12345
confirmPassword: Perro12345
walletAddress:HrK7q7MsddzJYztFd59T79FrUt8kQMTbdJxpwzUCTZvQ
}
```

---
