# Electron-App-Template and DEMO

A template for quickly creating new Electron.js applications with React, TypeScript, and auto-updater support.

---

## 🚀 Getting Started

### 1. Clone the Repository
git clone https://github.com/Dustin-Tripp/Electron_Template.git

shell
Copy
Edit

### 2. Navigate into the Project Folder
cd into Electron-App

### 3. Install Dependencies
In the terminal, run an npm install

### 4. Run the App in Development Mode
npm run dev

yaml
Copy
Edit

---

## ⚙️ Configuration

### Updating the App Name
The default application name is **"electron-app"**. To rename it:

1. Open **VS Code**.
2. Use the **global search** (`Ctrl + Shift + F` / `Cmd + Shift + F` on Mac) for `"electron-app"`.
3. Replace **all instances** with your new app name.

### Setting Up Auto-Updates
Edit the `electron-builder.yml` file to enable auto-updates. Fill in your repository details:

publish: provider: github owner: 'YOUR-GITHUB-USERNAME' private: true repo: 'YOUR-REPO-NAME' token: 'YOUR-GITHUB-TOKEN'

yaml
Copy
Edit

---

## 🏗️ Building the Application

### Compile and Package the Application
npm run build

shell
Copy
Edit

### Build for Windows
npm run build:win

yaml
Copy
Edit

The output will be located in the `./dist` folder.

---

## 🔄 Auto-Update Requirements
For auto-updating to work, the following files must be included in your GitHub Releases:

✅ `.exe`  
✅ `.exe.blockmap`  
✅ `latest.yml`

---

Just copy and paste this into your `README.md` file. 🚀
This is completely raw text—no preformatted blocks. You should be able to copy it directly into your README.md file. 🚀 Let me know if you need any changes!
