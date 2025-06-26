# 🚀 Awesome Resume

A personal resume project with GitHub contribution calendar integration.

## 📋 Table of Contents

- [🚀 Getting Started](#getting-started)
- [📅 GitHub Contribution Calendar](#github-contribution-calendar)
- [📄 License](#license)

## 🚀 Getting Started

Before you begin, please ensure that a LaTeX compiler such as `pdflatex` is installed on your system.

### 📝 Step 1: Customize Your Resume  
Edit the source file located at **`./src/cv.tex`** to tailor your resume content according to your preferences.

### 🔨 Step 2: Compile the LaTeX Source  
Generate the PDF output by running the following command in your terminal:

```bash
pdflatex -output-directory=dist ./src/cv.tex
```

### 📁 Step 3: Locate the Output  
The compiled PDF file will be available in the **`./dist/`** directory.

## 📅 GitHub Contribution Calendar

This project includes functionality to generate and display your GitHub contribution calendar as a PNG image.

### 🎯 How to Get Your Contribution Calendar

1. **📦 Install Dependencies**
   ```bash
   pnpm i
   ```

2. **⚡ Execute the Script**
   ```bash
   pnpm run get
   ```

3. **📸 Get the Result**
   The generated contribution calendar will be saved as `github-contributions.png` in the `./assets/` directory.

## 📄 License

This project is licensed under the MIT License.
