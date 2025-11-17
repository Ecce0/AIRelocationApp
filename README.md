# RelocationCalculationApp
# ☁️ Relo.Calc.App

## Project Overview

This repository contains the technical implementation of the AI Relocation App.

Click here for the **[Product Documentation](https://github.com/Ecce0/AIRelocationApp/wiki)** - Product vision, strategy, customer personas, and product management artifacts

Click here for the **[Project Board](https://github.com/users/Ecce0/projects/3)** - Active backlog and sprint planning

---

Relo.Calc.App is a full-stack **serverless relocation insights platform** that compares salaries, cost-of-living data, and affordability metrics across U.S. cities. It helps users evaluate where their careers and finances can go further — all powered by real-time cloud data. 

---

##Background

This project began as **Relo.AI.App**, originally envisioned to include **Amazon SageMaker** for AI-driven relocation predictions. Over time, the focus shifted toward **cloud engineering and serverless architecture**, emphasizing **scalability & automation** rather than machine learning.  
That evolution inspired the new name — **Relo.Calc.App** — reflecting its focus on **cloud-based computation** instead of AI integration.

---

##Architecture Overview

Relo.Calc.App is built with a **fully serverless AWS stack**, separating concerns across networking, compute, and data layers.

### **Networking Layer**
- **Amazon API Gateway (HTTP API)** – lightweight, cost-efficient endpoints that handle requests between the frontend and AWS Lambda functions  
- **AWS Lambda (Node.js 22.x runtime)** – serverless compute for backend logic  
- **Amazon S3 (Static Website Hosting)** – hosts the React frontend for public access

### **Application Layer**
- **Frontend:** React + TypeScript + Vite  
- **UI Frameworks:** TailwindCSS + DaisyUI 
- **State Management:** React hooks + React Context  
- **Backend:** Node.js + Lambda functions (ES modules)  
- **API Integrations:** Previously used OpenWebNinja (salary data), Zyla Labs (cost-of-living data)

### **Data Layer**
- **Amazon DynamoDB** – main data store with composite keys for job, city, and professional level  
- **DynamoDB TTL** – no-expiration cache to control API costs  
- **SSM Parameter Store** – stores API keys and configuration secrets securely  
- **CloudWatch Logs** – monitoring and tracing for all Lambda functions

---

## 💡 Features

- Compares salaries across 200+ U.S. metro areas  
- Adjusts for cost of living to calculate affordability  
- Caches API results for performance and cost control  
- Provides detailed metrics for cloud engineer-related roles  
- Clean, dark-mode UI with glassmorphism and universal card layout  

---

## Technologies Used

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React, TypeScript, Vite, TailwindCSS, DaisyUI |
| **Backend** | Node.js, AWS Lambda, AWS API Gateway |
| **Database / Storage** | DynamoDB, SSM Parameter Store, S3 |
| **Infrastructure / IaC** | Terraform, AWS CLI, IAM Roles/Policies |
| **External APIs** | Previously used OpenWebNinja (Salary), Zyla Labs (Cost of Living) |
| **Version Control / CI** | GitHub Actions, GitHub Workflows |
| **Obersvability** | AWS Cloudwatch |

---

## What This Project Demonstrates

Relo.Calc.App highlights:
- Practical **AWS serverless design** and multi-tier architecture  
- Secure API integration with external data providers - Zylalabs API service; previously OpenNinjaWeb API service
- Cost-efficient and scalable data caching using DynamoDB using infinte TTL  
- Strong understanding of **cloud computing principles** and **infrastructure automation**  
- Frontend + backend cohesion in a monorepo structure  



