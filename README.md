# Electron-App-Template and DEMO

A template for quickly creating new **Electron.js** applications with **React**, **TypeScript**, and **auto-updater support**.  
This version includes a **live system monitoring demo**, displaying real-time **CPU, memory, disk, and network performance** in interactive charts and tables.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Dustin-Tripp/Electron_Demo.git
```

### 2️⃣ Navigate into the Project Folder
```sh
cd Electron_Demo
```

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Run the App in Development Mode
```sh
npm run dev
```

---

## 📊 Demo Features

This template includes a **real-time system performance dashboard** using Electron's **Node.js integration** and **React components**.

### 🔹 Home Page (Draggable Dashboard)
- ✅ Displays **live system stats** (CPU Load, Memory Usage, Disk Usage, Network Speed).
- ✅ Uses **MUI drag-and-drop cards** for a **customizable layout**.

### 📈 Graphs Page (Data Visualization)
- ✅ Allows users to **switch between different chart types** (**Line, Bar, Pie, Radar, Area**).
- ✅ **Graphs update every 5 seconds** with the latest system stats.
- ✅ Built using **Recharts**.

### 📄 Reports Page (Exportable System Stats)
- ✅ Displays **historical system performance** in a **sortable table**.
- ✅ Allows **CSV and PDF exports** with properly formatted timestamps.
- ✅ Uses **jsPDF + autoTable** for generating reports.

---

## ⚙️ Configuration

### 🔧 Updating the App Name
1. Open **VS Code**.
2. Use the **global search** (`Ctrl + Shift + F` / `Cmd + Shift + F` on Mac) for `"electron-app"`.
3. Replace **all instances** with your new app name.

### 🔄 Setting Up Auto-Updates
Edit the `electron-builder.yml` file to enable **auto-updates**. Fill in your **repository details**:

```yaml
publish:
  provider: github
  owner: "YOUR-GITHUB-USERNAME"
  private: true
  repo: "YOUR-REPO-NAME"
  token: "YOUR-GITHUB-TOKEN"
```

---

## 🏗️ Building the Application

### 🔨 Compile and Package the Application
```sh
npm run build
```

### 🖥️ Build for Windows
```sh
npm run build:win
```

The output will be located in the **`./dist`** folder.

---

## 🔄 Auto-Update Requirements

For **auto-updating** to work, the following files **must be included** in your **GitHub Releases**:

- ✅ `.exe`  
- ✅ `.exe.blockmap`  
- ✅ `latest.yml`  

---

## 📌 Technologies Used

- **Electron.js** – Cross-platform desktop application framework.  
- **React (TypeScript)** – Frontend UI components.  
- **MUI (Material-UI)** – Styling and UI framework.  
- **Recharts** – Data visualization (**graphs & charts**).  
- **jsPDF + autoTable** – Exporting reports as **PDF**.  
- **PapaParse** – **CSV** file generation.  

---

## 🚀 Ready to Use!

This **Electron-React template** is pre-configured with **auto-updates, a system monitoring demo, and modern UI components**.

✅ **Need customization?** Modify components in the **`/src`** directory.  
✅ **Want to add new features?** Extend the Electron **main process** (`electron/index.ts`).  
✅ **Deployment?** Package the app using **`electron-builder`**.  

---

🚀 **Enjoy building with Electron + React!** 🚀  
Let me know if you need any changes! 😃
