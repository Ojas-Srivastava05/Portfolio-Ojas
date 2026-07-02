# 🚀 Ojas Srivastava - Portfolio

⚡ **Built in just 16 hours** - A modern, animated portfolio showcasing my projects and skills.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> A modern, interactive portfolio website showcasing my journey as a Artificial Intelligence student, Full-Stack Developer, and Machine Learning enthusiast.

## 🌐 Live Demo

**🔗 [View Live Portfolio](https://ojas-srivastava.vercel.app/)**

> Deployed on Vercel with GitHub auto-deploy from `main` → [Portfolio-Ojas](https://github.com/Ojas-Srivastava05/Portfolio-Ojas)

## ✨ Features

- **🎨 Modern UI/UX**: Built with React and Framer Motion for smooth animations and transitions
- **🌌 3D Graphics**: Interactive 3D elements using Three.js and React Three Fiber
- **📊 Live Coding Stats**: Real-time integration with coding platforms (GitHub, LeetCode, CodeChef, Codeforces, Kaggle)
- **💼 Project Showcase**: Dynamic project cards with detailed information and live demos
- **🛠️ Technology Toolkit**: Comprehensive display of skills across Web Dev, AI/ML, and DevOps
- **📱 Fully Responsive**: Optimized for all screen sizes and devices
- **⚡ Performance Optimized**: Fast loading times with Vite and modern build techniques
- **🎯 Custom Cursor**: Interactive custom cursor for enhanced user experience
- **✉️ Contact Section**: Easy-to-use contact form for networking opportunities

## 🎓 About

This portfolio represents my work as a B.Tech student in Artificial Intelligence at **Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat**. I specialize in:

- **Web Development**: Full-stack development with React, Node.js, and modern frameworks
- **Machine Learning**: Building intelligent systems with TensorFlow, PyTorch, and scikit-learn
- **Competitive Programming**: Active problem solver on platforms like LeetCode, CodeChef, and Codeforces
- **Data Structures & Algorithms**: Strong foundation in DSA with C++ and Python

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: TailwindCSS 3.4.18
- **Animations**: Framer Motion 12.23.25, GSAP 3.13.0
- **3D Graphics**: Three.js 0.181.2, React Three Fiber 9.4.2, React Three Drei 10.7.7

### Development Tools
- **Language**: JavaScript (ES6+)
- **Linting**: ESLint 9.39.1
- **CSS Processing**: PostCSS 8.5.6, Autoprefixer 10.4.22
- **Package Manager**: npm

### Key Libraries
- `clsx` & `tailwind-merge`: Utility class management
- `@gsap/react`: Advanced animation capabilities
- Custom UI components with Spring physics

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Ojas-Srivastava05/Portfolio-Ojas.git
cd Portfolio-Ojas
```

2. **Install dependencies**
```bash
cd my-portfolio
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🚀 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

### Project Structure

```
my-portfolio/
├── public/                  # Static assets
│   ├── favicon.svg
│   ├── Ojas-Srivastava-Resume.pdf
│   ├── logiflow-preview.png
│   └── airhelp-preview.png
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Background.jsx  # Animated background
│   │   ├── CustomCursor.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── magicui/        # Custom animated UI components
│   │   └── ui/             # Base UI components
│   ├── sections/           # Main page sections
│   │   ├── Hero.jsx        # Landing section
│   │   ├── About.jsx       # About me section
│   │   ├── Projects.jsx    # Project showcase
│   │   ├── CodingStats.jsx # Coding platform statistics
│   │   ├── Toolkit.jsx     # Tech stack display
│   │   └── Contact.jsx     # Contact form
│   ├── hooks/              # Custom React hooks
│   │   └── useCodingStats.js
│   ├── utils/              # Utility functions
│   │   ├── codingPlatformAPIs.js
│   │   └── particleUtils.js
│   ├── data/               # Static data files
│   │   ├── projects.jsx
│   │   └── skills.jsx
│   ├── lib/                # Helper libraries
│   │   └── utils.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   ├── App.css
│   └── index.css
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
├── eslint.config.js        # ESLint configuration
└── package.json            # Project dependencies
```

## 🎨 Key Features in Detail

### Interactive 3D Background
- Dynamic particle system with Three.js
- Responsive to user interactions
- Optimized performance with efficient rendering

### Coding Platform Integration
- **GitHub**: Repository stats and contributions
- **LeetCode**: Problem-solving statistics
- **CodeChef**: Contest ratings and rankings
- **Codeforces**: Competitive programming achievements
- **Kaggle**: Data science and ML competition participation

### Smooth Animations
- Page transitions with Framer Motion
- GSAP-powered scroll animations
- Custom spring physics for interactive elements
- Typing and rotating text effects

### Custom UI Components
- Encrypted button effects
- Spring-based card interactions
- Shuffle text animations
- Rotating role display

## 🌐 Deployment

The portfolio can be deployed to various platforms:

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd my-portfolio
vercel
```

### Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
```

### GitHub Pages
```bash
# Build the project
npm run build

# Deploy the dist folder to GitHub Pages
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

While this is a personal portfolio, I'm open to suggestions and improvements! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

**Ojas Srivastava**
- 💼 LinkedIn: [linkedin.com/in/ojas-srivastava05](https://www.linkedin.com/in/ojas-srivastava05)
- 🐱 GitHub: [@Ojas-Srivastava05](https://github.com/Ojas-Srivastava05)
- 📧 Email: srivastavaojas454@gmail.com
- 💻 LeetCode: [Oju_Srivastava](https://leetcode.com/Oju_Srivastava)
- 🏆 CodeChef: [ojassrivastava](https://www.codechef.com/users/ojassrivastava)
- 🎯 Codeforces: [oju](https://codeforces.com/profile/oju)
- 📊 Kaggle: [ojassrivastava05](https://www.kaggle.com/ojassrivastava05)

---

<div align="center">
  <p>Built with ❤️ by Ojas Srivastava</p>
  <p>© 2024 Ojas Srivastava. All rights reserved.</p>
</div>

## Contact Form Setup

The contact form uses **FormSubmit.co** (free service, no backend needed).

### First-Time Setup:
1. Submit the contact form once from your deployed website
2. Check your email (`srivastavaojas454@gmail.com`) for a verification link from FormSubmit
3. Click the verification link to activate the form
4. All future submissions will be sent directly to your email

### Features:
- ✅ No backend required
- ✅ AJAX submission (no page reload)
- ✅ Success/error notifications
- ✅ Form validation
- ✅ Spam protection built-in
