# ZoneFunnel - Website & Developer Guide

This guide provides instructions for setting up and running the ZoneFunnel website project locally. This project is built with a standard Vite + React + TypeScript setup.

---

## 1. Clean Up Your Project Directory

Your current directory is a mix of old and new files. Before you can run the project, you must **delete** the following obsolete files and folders from your project's root directory:

-   `design-system.html`
-   `figma-import.html`
-   `design-tokens.json`
-   `metadata.json`
-   `public/global.css`
-   `public/style-guide.css`
-   `components/ContactSection.tsx` (This component is no longer used)

After deleting these, your folder should only contain the files needed for the Vite project.

---

## 2. Final Project Structure

After cleaning up, your project structure should look exactly like this:

```
zonefunnel-project/
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── public/
│   └── favicon.svg
├── README.md
├── src/
│   ├── App.tsx
│   ├── components/
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   ├── utils/
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 3. Local Development Setup

To run this project, you will need [Node.js](https://nodejs.org/) (which includes `npm`) or [Yarn](https://yarnpkg.com/) installed on your machine.

**Step 1: Install Dependencies**
Open your terminal in the project's root directory and run:

```bash
# Using npm
npm install

# Or using Yarn
yarn
```
This will install all the necessary packages listed in `package.json`, such as React, Vite, and Tailwind CSS.

**Step 2: Set Up Environment Variable (API Key)**
The application requires a Google Gemini API key for the chatbot to function.

1.  Create a new file in the project's root directory named `.env.local`
2.  Add your API key to this file like so:

    ```
    VITE_API_KEY=YOUR_GEMINI_API_KEY
    ```

**Step 3: Run the Development Server**
Now you can start the local development server:

```bash
# Using npm
npm run dev

# Or using Yarn
yarn dev
```

This will start the Vite server, typically on `http://localhost:5173`. The site will open in your browser and will automatically reload whenever you save a change to a file.
# Zone-funnel
