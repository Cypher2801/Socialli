### 🌐 **Try it Now!**  
Check out our live deployment: [**Try it**](https://supermind-hack.vercel.app/)  

---

📊 **Socialli : A Social Media Analyzer**

![Screenshot 2025-01-08 212020](https://res.cloudinary.com/dzgllt3ca/image/upload/v1736361988/Screenshot_2025-01-09_001305_slddsw.png)

✨ **Welcome to Hack Code's Pre-Hackathon Assignment: Social Media Performance Analysis!**  

### **Our Dynamic Team**  
👨‍💻 Kushagra Gupta 
👨‍💻 Aniz Agarwal  
👨‍💻 Naveen Patidar

---

This project provides an analytics module for analyzing social media engagement using **Langflow** and **DataStax Astra DB**. It enables users to generate insights from engagement data such as likes, shares, comments and engagement. The project includes a chatbot interface for interacting with the system.

-----

### 🚀 **Features**  
1. **Fetch Engagement Data**  
   Simulates and stores mock social media engagement data in **DataStax Astra DB**.  
   Simulated dataset includes metrics like:  
   - ❤️ **Likes**  
   - 💪 **Shares**  
   - 💬 **Comments**  
   - 🎬 **Videos**  
   - Post types: 🎢 **Carousel**, 🎥 **Reels**, **Videos**, and 🖼️ **Static Images**  

2. **Analyze Post Performance**  
   A **Langflow workflow** was created to:  
   - 💡 Accept input for post types
   - 🔎 Query the dataset in Astra DB
   - 📈 Calculate average engagement metrics for each post type

3. **Generate Insights**  
   Use **Gemini-powered Langflow workflows** to provide actionable insights  

4. **Interactive Chatbot**  
   Engage with the analytics module through a **chatbot interface**  

---

### 🛠️ **Technology Stack**  
- **Frontend**: 
  - **React JS** as the core framework
  - **ShadCN UI** for modern, accessible components and clean design patterns
  - **Magic UI** for enhanced visual effects and smooth animations
  - **Acertainty UI** for sophisticated design elements and polished user experience
  - Features include:
    - Responsive and mobile-friendly design
    - Consistent and professional styling
    - Interactive animations and transitions
    - Accessible components by default
    - Modern and intuitive user interface
- **Backend**: NodeJS (ExpressJS and Socket IO)
- **Database**: DataStax Astra DB  
- **Workflow Creation**: Langflow  
- **Deployment**: Vercel  

---

### 🗂️ **Directory Structure**  
```
shelkesanchit-Social-Media-Performance-Analyzer/
├── README.md
├── social_media_posts.csv
└── Frontend/
    ├── ....
    ├── ....
└── Backend/
    ├── ....
    └── ....
```

---

### 🧩 **Environment Variables**  
Set the following environment variables in Frontend:  
- `VITE_BACKEND_URL`: Backend URL   

Set the following environment variables in Backend:  
- `LANGFLOW_API_URL`: Your Langflow API URL  
- `LANGFLOW_ID`: Your Langflow instance ID  
- `FLOW_ID`: The ID of your Langflow workflow  
- `ASTRA_TOKEN`: Authentication token for the Langflow API  
- `FRONTEND_URL`: Frontend URL  

---

### ⚡ **Quick Start**  

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/KraitOPP/SuperMind-Hackathon-SocialAnalyzer.git
   cd SuperMind-Hackathon-SocialAnalyzer
   ```  

2. **Install Dependencies**:  

   Frontend Dependencies
   ```bash
   cd ./Frontend
   npm install
   ```  

   Backend Dependencies
   ```bash
   cd ./Backend
   npm install
   ```  

3. **Set Environment Variables**:  
   Create a `.env` file in the root directory and add the required variables.  

4. **Run the Application**:  
   
   Run Backend
   ```bash
   cd Backend
   npm start
   ```  

   Run Frontend
   ```bash
   cd Frontend
   npm run dev
   ```  

5. **Access the Application**:  
   Visit [http://localhost:5173](http://localhost:5173) in your browser.  

---

### 📊 **Showcase**  

#### **Home Page**  
![home1](https://res.cloudinary.com/dzgllt3ca/image/upload/v1736361988/Screenshot_2025-01-09_001305_slddsw.png)

![home2](https://res.cloudinary.com/dzgllt3ca/image/upload/v1736362002/Screenshot_2025-01-09_001315_dghn1b.png)

#### **Chatbot Interface**  
![chabot](https://res.cloudinary.com/dzgllt3ca/image/upload/v1736362001/Screenshot_2025-01-09_001354_irnypg.png)

#### **Dashboard**  
![dashboard1](https://res.cloudinary.com/dzgllt3ca/image/upload/v1736362000/Screenshot_2025-01-09_001335_rvibig.png)

![dashboard2](https://res.cloudinary.com/dzgllt3ca/image/upload/v1736361997/Screenshot_2025-01-09_001409_amadjj.png)

---

### 🎥 **YouTube Video**  
Watch our project in action:  
https://youtu.be/to_be_added?feature=shared 

---