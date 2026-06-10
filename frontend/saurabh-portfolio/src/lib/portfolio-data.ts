import jarvis from "@/assets/jarvis.png";
import shagun from "@/assets/shagun.png";
import vasudev from "@/assets/vasudev.png";
import disease from "@/assets/disease.png";
import gemini from "@/assets/gemini.png";
import ipl from "@/assets/ipl.png";
import internship from "@/assets/internship.jpeg";
import star from "@/assets/star.jpeg";
import hackathon from "@/assets/hackathon.jpeg";
import gate from "@/assets/gate.jpg";
import java from "@/assets/java.jpg";
import html_css_js from "@/assets/html_css_js.jpg";
import freedom_with_ai from "@/assets/freedom_with_ai.jpg";
import ppt_winner from "@/assets/ppt_winner.jpg";
import Python from "@/assets/Python.jpg";

export const heroStats = [
  { label: "GATE 2026 AIR", value: "7409" },
  { label: "GATE Score", value: "503" },
  { label: "Projects Built", value: "10+" },
  { label: "DSA Solved", value: "400+" },
];

export const metrics = [
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 400, suffix: "+", label: "DSA Problems Solved" },
  { value: 185, suffix: "", label: "Day Coding Streak" },
  { value: 2, suffix: "", label: "GATE Qualifications" },
  { value: 1, suffix: "", label: "Internship Completed" },
  { value: 1, suffix: "", label: "Off-Campus Offer" },
];

export const achievements = [
  { title: "GATE 2026 Qualified", detail: "AIR 7409 · Score 503", year: "2026" },
  { title: "GATE 2025 Qualified", detail: "Computer Science & IT", year: "2025" },
  { title: "TCS Off-Campus Offer", detail: "Selected via off-campus drive", year: "2025" },
  { title: "ISTE × ANDROMEDA Hackathon", detail: "Winner · NIT Hamirpur", year: "2024" },
  { title: "Star Performer Award", detail: "Softpro India — Python with DS & ML", year: "2024" },
  { title: "400+ DSA Problems", detail: "4-Star on GeeksforGeeks", year: "Ongoing" },
  { title: "185-Day Coding Streak", detail: "Highest personal streak", year: "2024" },
  { title: "3× PPT Competition Winner", detail: "Technical & business presentations", year: "2023–24" },
];

export const techStack = {
  Frontend: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  Backend: ["Django", "Flask"],
  Languages: ["Python", "Java", "C++", "SQL","PostgreSQL","SQLite"],
  "AI / ML": ["Pandas", "NumPy","Matplotlib", "Scikit-Learn", "TensorFlow", "Data Analysis", "Machine Learning"],
  Cloud: ["AWS EC2","Render","GoDaddy","Vercel"],
  Tools: ["Git", "GitHub","VS Code"],
};

export type Project = {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  challenges: string;
  duration: string;
  status: "Live" | "Open Source" | "Client Project";
  responsive: boolean;
  image: string;
  github?: string;
  demo?: string;
  highlight?: string;
};

export const projects: Project[] = [
  {
    title: "AI Voice Assistant (Jarvis)",
    description:
      "Voice-controlled AI assistant with speech recognition, TTS, web search, app control, and mobile automation.",
    longDescription:
      "A fully voice-driven personal assistant built in Python. It listens through SpeechRecognition, responds via TTS, opens websites, controls desktop apps, and even automates an Android device over ADB for tasks like sending messages and toggling settings.",
    tech: ["Python", "NLP", "SpeechRecognition", "ADB", "pyttsx3"],
    features: [
      "Wake-word and continuous listening",
      "Web search & app launching",
      "Android automation via ADB",
      "Context-aware command routing",
    ],
    challenges:
      "Handling noisy audio input and bridging desktop ↔ mobile control with reliable ADB sessions.",
    duration: "2 months",
    status: "Open Source",
    responsive: false,
    image: jarvis,
    github: "https://github.com/saurabhmaurya6746/Jarvis",
  },
  {
    title: "Shagun Vashtralay — E-Commerce",
    description:
      "Full-stack e-commerce platform with auth, cart, orders, admin dashboard, and product management.",
    longDescription:
      "An end-to-end e-commerce platform for a traditional-wear brand. Customers browse categories, manage carts and orders; admins manage inventory, orders, and users from a custom dashboard.",
    tech: ["Django", "SQLite", "Bootstrap", "JavaScript"],
    features: [
      "User authentication & profiles",
      "Cart & order workflow",
      "Admin dashboard",
      "Category & product management",
    ],
    challenges:
      "Designing a clean order state-machine and a smooth admin UX on top of Django templating.",
    duration: "3 months",
    status: "Live",
    responsive: true,
    image: shagun,
    demo: "https://shagun-vastralay-1.onrender.com/",
  },
  {
    title: "Vasudev Bird Control",
    description: "Production client website delivered to a real business for lead generation.",
    longDescription:
      "A delivered client project for Vasudev Bird Control. Built marketing pages, services, gallery, and a lead-capture flow optimized for conversions and SEO.",
    tech: ["Django", "Bootstrap", "SQLite"],
    features: [
      "SEO-optimised marketing pages",
      "Service catalogue & gallery",
      "Lead capture & contact flow",
      "Deployed on production domain",
    ],
    challenges:
      "Translating client requirements into a high-conversion site with strong SEO foundations.",
    duration: "1 month",
    status: "Client Project",
    responsive: true,
    image: vasudev,
    demo: "https://vasudevbirdcontrol.com/",
    highlight: "Delivered to real business client on live production domain",
  },
  {
    title: "Disease Prediction System",
    description: "ML models to predict Diabetes and Heart Disease from clinical inputs.",
    longDescription:
      "Multi-disease prediction system using classical ML. Streamlit-style UI with separate forms for Diabetes, Heart Disease, and Parkinson's, each backed by a trained Scikit-Learn model.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    features: [
      "Diabetes prediction",
      "Heart disease prediction",
      "Parkinson's prediction",
      "Clean clinical input UI",
    ],
    challenges: "Cleaning noisy medical datasets and tuning models to reduce false negatives.",
    duration: "1 month",
    status: "Open Source",
    responsive: true,
    image: disease,
    github: "https://github.com/saurabhmaurya6746/Disease-prediction",
  },
  {
    title: "IPL Score Prediction",
    description: "Deep-learning model that forecasts IPL innings scores in real time.",
    longDescription:
      "An LSTM-based regression model trained on historical IPL ball-by-ball data to predict final innings scores given current match state.",
    tech: ["TensorFlow", "Python", "LSTM", "Pandas"],
    features: [
      "Real-time score forecasting",
      "Feature engineering on ball-by-ball data",
      "LSTM sequence model",
      "Evaluation against historical matches",
    ],
    challenges: "Modelling temporal dependencies and handling sparse late-over scenarios.",
    duration: "3 weeks",
    status: "Open Source",
    responsive: false,
    image: ipl,
    github: "https://github.com/saurabhmaurya6746/IPL-Score-Prediction",
  },
  {
    title: "Gemini AI Chatbot Clone",
    description: "Conversational chatbot UI inspired by Gemini with context-aware replies.",
    longDescription:
      "A web-based chatbot clone with a Gemini-style interface. Maintains conversation history, supports multi-turn context, and provides smooth typing animations.",
    tech: ["HTML", "CSS", "JavaScript", "NLP"],
    features: [
      "Gemini-style UI",
      "Conversation history",
      "Typing animation",
      "Responsive layout",
    ],
    challenges: "Building a polished chat UX in vanilla JS without a framework.",
    duration: "2 weeks",
    status: "Open Source",
    responsive: true,
    image:gemini,
    github: "https://github.com/saurabhmaurya6746/Gemini-AI-Chatbot-Clone-",
  },
];

export const experience = {
  role: "Data Science & Machine Learning Intern",
  company: "Softpro India",
  duration: "July 2024 – August 2024",
  bullets: [
    "Built machine learning solutions for real-world datasets",
    "Developed Django applications and integrated ML models",
    "Performed data analysis using Pandas and NumPy",
    "Created visualisations with Matplotlib",
    "Worked with Git/GitHub and deployed projects",
  ],
};

export const education = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Dr. A.P.J. Abdul Kalam Technical University",
    score: "CGPA 8.46",
  },
  { degree: "Intermediate", school: "Kamla Nehru Inter College", score: "81.4%" },
  { degree: "High School", school: "Manyawar Kanshiram Ji Inter College", score: "80.83%" },
];

export const certificates = [
  { title: "Softpro Internship Certificate", image: internship },
  { title: "Star Performer Award During Intership", image: star },
  { title: "GATE 2026 Scorecard", image: gate },
  { title: "ISTE × ANDROMEDA Hackathon Winner", image: hackathon },
  { title: "Three-Time PPT Presentation Competition Winner", image: ppt_winner },
  { title: "Java Programming Certificate", image: java },
  { title: "Python Certificates", image: Python },
  { title: "Freedom With AI Certificate", image: freedom_with_ai },
  { title: "HTML, CSS & JavaScript Certificate", image: html_css_js },
];

export const profiles = [
  { name: "GitHub", url: "https://github.com/saurabhmaurya6746", handle: "@saurabhmaurya6746", detail: "Open-source projects & contributions" },
  { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/profile/saurabhmaurpx2", handle: "@saurabhmaurpx2", detail: "400+ problems · 4-Star · 185-day streak" },
  { name: "LeetCode", url: "https://leetcode.com/u/Saurabh_Maurya_67/", handle: "@Saurabh_Maurya_67", detail: "Algorithmic problem solving" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/saurabh-maurya-2805m/", handle: "@saurabh-maurya-2805m", detail: "Growing Network of 6700+ Linkedin Followers" },
];

export const contact = {
  phone: "+91 95557 02945",
  email: "saurabhmauryajnp28@gmail.com",
  linkedin: "https://www.linkedin.com/in/saurabh-maurya-2805m/",
  github: "https://github.com/saurabhmaurya6746/",
};

export const RESUME_URL = "/resume.pdf";
