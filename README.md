# Premium Developer Portfolio

A world-class, highly interactive, and cinematic developer portfolio built to showcase your skills, projects, and achievements. Designed with Awwwards-level aesthetics in mind, this project features 60fps GPU-accelerated animations, smooth page transitions, and a premium glassmorphism dark theme. 

Perfect for developers, designers, and creatives who want to stand out and leave a lasting impression on recruiters and clients.

## ✨ Features
- **Cinematic Hero Section:** Engaging background video/visuals with smooth text staggers.
- **60fps GPU-Accelerated Animations:** Buttery smooth interactions powered by Framer Motion and GSAP.
- **Dynamic Projects Showcase:** Beautifully animated project cards with filtering capabilities.
- **Interactive Skills Grid:** Hover and tap interactions optimized for both desktop and mobile.
- **Education & Experience Timeline:** Visually appealing chronological timeline for your journey.
- **Dark/Light Theme Ready:** Premium color palette designed for high contrast and readability.
- **Fully Responsive Layout:** Flawless experience across mobile phones, tablets, and desktops.
- **High Performance:** Lazy loading, asset optimization, and mobile-specific rendering fallbacks.

## 🛠 Tech Stack
- **Frontend Framework:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (with custom utility classes and glassmorphism)
- **Animations:** Framer Motion & GSAP (GreenSock)
- **Routing:** React Router DOM

## ⚙️ Requirements before running
Before you begin, ensure you have the following installed on your machine:
- **Node.js**: [Download here](https://nodejs.org/) (Version 16.x or higher recommended)
- **npm**: Comes bundled with Node.js
- *Note: A database like MongoDB is not required for this purely frontend React application.*

## 🚀 Installation steps

Follow these simple steps to set up the project locally:

1. **Download and extract** the source code zip file to your desired folder.
2. **Open the project folder** in your preferred code editor (e.g., VS Code).
3. **Open an integrated terminal** in your editor (In VS Code: `Ctrl + \``).
4. **Install dependencies** by running the following command:
   ```bash
   npm install
   ```
   *Note: The `node_modules` folder is excluded from the zip file to save space and ensure security. Running `npm install` will automatically download and set up all required dependencies.*

##  Running the project
Once the installation is complete, you can start the development server:

1. In your terminal, ensure you are in the root directory of the project.
2. Run the start command:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the provided local URL (usually `http://localhost:5173/`).

## 🏗 Build instructions
When you are ready to deploy your portfolio to production, create a highly optimized build:

1. Run the build command in your terminal:
   ```bash
   npm run build
   ```
2. Wait for the process to finish. The optimized, minified production files will be automatically grouped inside a newly generated `dist/` folder.

## 🎨 Editable sections for customization
This portfolio is built to be easily customized to fit your personal brand. Here is what you can easily change:

- **UI Text & Data:** All personal information, projects, and skills are strictly organized within the `src/data/content.js` file. Edit this single file to update the entire website's content!
- **Images/Assets:** Replace the placeholder images and videos in the `public/` folder with your own profile pictures, project thumbnails, and background media.
- **Colors/Styles:** Global styling variables and custom Tailwind settings can be modified in `tailwind.config.js` and `src/index.css`.

## 📁 Folder structure overview
```text
/
├── public/           # Static assets (images, videos, fonts, robots.txt)
├── src/
│   ├── components/   # Reusable UI elements (Navbar, Buttons, Cursor, PageTransitions)
│   ├── data/         # content.js (Your central hub for updating portfolio text/links)
│   ├── pages/        # Main route views (Home, About, Projects, Contact, Skills)
│   ├── App.jsx       # Root React component connecting routing and structure
│   └── index.css     # Global CSS and Tailwind directives
├── index.html        # Main HTML entry point
├── package.json      # Project dependencies and running scripts
├── tailwind.config.js# Tailwind CSS configuration and theme colors
└── vite.config.js    # Vite bundler configuration
```

## 🌐 Deployment guide
Deploying this Vite/React application is incredibly straightforward.

**Frontend on Vercel or Netlify:**
1. Upload your customized project to a GitHub repository.
2. Log into [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
3. Import your GitHub repository.
4. Set the Build Command to `npm run build` and the Output Directory to `dist`.
5. Click **Deploy**. Your site will be live in minutes!

## 🔧 Troubleshooting section
If you run into issues, try these common fixes:

- **If `npm install` fails:** Ensure you are using the correct version of Node.js. Try deleting `package-lock.json` and running `npm cache clean --force` followed by `npm install` again.
- **If the port is already running:** The terminal will usually assign the next available port (like `5174`). Alternatively, stop other running servers in your terminal with `Ctrl + C`.
- **Missing assets:** Ensure you placed your images exactly in the `/public` folder and referenced them with absolute paths (e.g., `/my-picture.jpg`).

## ⚠️ Important note
This source code package does not include the `node_modules` folder for security and file size optimization. **You must run `npm install` before you can view the project.** 

## 📞 Contact / Support
For any questions, installation issues, or bug reports regarding this source code, please contact:
**your-email@example.com**

---
*Thank you for purchasing! Enjoy your new premium portfolio.*
