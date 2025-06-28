
# 🚀 Happie – Your Mental Wellness Companion

**Happie** is a full-stack platform focused on mental wellness. It helps students connect with supportive resources and enables investors to fund well-being initiatives.

---

## 🌟 Key Highlights

- 🔒 Secure Role-Based Access – 3 distinct user roles: Student, Investor, Admin
- ✍️ Project Submission & Review Pipeline
- 💼 Escrow System with Milestone-Based Fund Disbursement
- 💬 Real-Time Admin-Student Chat with Socket.IO
- 🧠 Intelligent Admin Assignment Logic
- 💸 ROI Payouts for Passive Investors

---


## 🧩 User Roles & Functionality

### 🎓 Student Entrepreneur
- Register with 2-step verification
- Submit multiple startup projects
- Create milestones and submit proofs
- Communicate with assigned admin in real time
- Receive phased fund disbursement after admin approval

### 💰 Investor
- Browse and invest in active student projects
- Invest flexible amounts
- Automatically receive principal + interest at maturity
- No involvement in project management

### 🛡️ Administrator
- Review and approve submitted student projects
- Initiate contact to assign self to a project
- Approve or reject milestone proofs
- Release funds in stages from escrow
- Mark project as complete after all milestones are done

---

## 🛠 Tech Stack

| Layer      | Technology                               |
|------------|-------------------------------------------|
| Frontend   | NextJS, Tailwind CSS                      |
| Backend    | NextJS                                    |
| Database   | PostgreSQL, Prisma ORM                   |
| Real-Time  | Socket.IO                                |
| Auth       | Next Auth                                |

---

## 📂 Project Structure
```
bdapps/  
├── app/
├── prisma/ 
├── server.mts
└── README.md
```

---

## 🚦 How to Run Locally


### 🔧 Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Mutiur03/bdapps.git
cd bdapps
````

2. **Install dependencies**
    

```bash
npm install
```

3. **Configure environment variables**
    

Create a `.env` file 

#### `.env`

```env
DATABASE_URL=...
NEXTAUTH_SECRET=...
PORT=3000
NEXT_PUBLIC_CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
```

4. **Run development servers**
    

```bash
npx prisma generate && npx prisma migrate deploy && npx prisma db seed
```

---

## 🧪 Testing Flow

1. Register as a **Student**, submit a project
    
2. Log in as **Admin**, approve project and start chat
    
3. Log in as **Investor**, fund a project
    
4. Submit and approve milestones through real-time chat
    

---

## 🚀 Live Demo 

🔗 **Live Site:** [Live](https://happie.example.com/)
🎥 **Detailed Video:** [YouTube](https://www.youtube.com/watch?v=AvoooD7cLzQ)
---

## ✅ Future Roadmap

- 📊 Admin dashboard analytics
    
- 📱 Mobile-first PWA support
    
- 📩 Email/SMS notifications for milestone approvals
    
- 📂 File management for student documents and pitch decks
    
- 🧾 Transaction history and receipts
    


---

## 🤝 Contact

Looking to collaborate or hire for full-stack projects?  
📬 Reach out via [LinkedIn](https://www.linkedin.com/in/mutiur-rahman-mr/) or [Fiverr](https://www.fiverr.com/mutiur_rahman03)

---
