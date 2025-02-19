# **QuizmeGPT** 🎓✨

_A ChatGPT-powered quiz generator built with Next.js, Vercel AI SDK, Generative UI, Supabase, and shadcn/ui._

![QuizmeGPT Banner](https://github.com/user-attachments/assets/fb80b023-b4a8-42cb-a05d-1d97eb8a95b9) <!-- Optional: Add a banner image -->

## 🚀 **Live Demo**

[🔗 Click here to try QuizmeGPT](https://assign-gpt.vercel.app/)

---

## 📌 **Overview**

QuizmeGPT is an AI-powered quiz generator designed to help users create quizzes effortlessly. Whether for education, training, or just for fun, QuizmeGPT allows users to generate quizzes dynamically using AI.

🔹 **Instant quiz generation** using AI  
🔹 **Customizable quiz topics**  
🔹 **Multiple-choice & open-ended questions**  
🔹 **User-friendly interface with shadcn/ui**  
🔹 **Built for speed & scalability with Next.js & Supabase**

---

## ⚡ **Tech Stack**

- **Next.js** – Full-stack React framework
- **Vercel AI SDK + Generative UI** – AI-powered chat & UI components
- **Supabase** – Backend database & authentication
- **shadcn/ui** – Elegant UI components

---

## 📸 **Screenshots**

<!-- Replace with actual screenshots -->

| Quiz Generation                                                                                   | Quiz View                                                                                       | Result Page                                                                                 |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Quiz Creation](https://github.com/user-attachments/assets/b69391da-b89d-49f0-969c-b4651aa98ee9) | ![Quiz Taking](https://github.com/user-attachments/assets/bb4d9439-9f26-42a9-99c5-8a32b1ae63d2) | ![Results](https://github.com/user-attachments/assets/c7f5b29c-d97b-4424-83c0-f476a389b726) |

---

## 🛠️ **Installation & Setup**

Clone the repo and install dependencies:

```bash
git clone https://github.com/yourusername/QuizmeGPT.git
cd QuizmeGPT
npm install  # or pnpm install / yarn install
```

To work in development you need supabase cli and and docker installed

**Install supabase cli**

```bash
npm install -g supabase-cli
```

Then start supabase

```
supabase start
```

Create a **.env.local** file and add the following environment variables:

```env
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_URL=
SUPABASE_DB_PASSWORD=
SUPABASE_ACCESS_TOKEN=
# to use Oauth
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=
SUPABASE_AUTH_GOOGLE_CLIENT_ID=
```

Run the development server:

```bash
npm run dev # or yarn dev
```

---

## 🎯 **Features**

✅ AI-generated quizzes  
✅ Save and manage quizzes in Supabase  
✅ User authentication (Supabase Auth)  
✅ Responsive UI with shadcn/ui  
✅ Seamless AI interaction with Vercel AI SDK

---

## 🙌 **Contributing**

We welcome contributions! Feel free to open an issue or submit a pull request.

1. **Fork the repo**
2. **Create a new branch**: `git checkout -b feature-branch`
3. **Commit changes**: `git commit -m "Added new feature"`
4. **Push to GitHub**: `git push origin feature-branch`
5. **Create a pull request**

---

## 📄 **License**

This project is licensed under the **MIT License**.

---

## ⭐ **Support the Project**

If you like **QuizmeGPT**, give this repo a ⭐ and share it with others!
