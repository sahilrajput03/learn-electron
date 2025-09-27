# Intelligent Assistant

Source: [Click here](https://electron-vite.org/guide/#scaffolding-your-first-electron-vite-project)

**Notes:**

- The inconsistent logs fixing is done by removing listeners on ondestroy in app.svelte and removing listeners in preload/index.ts file before attaching the custom-event listener.

## ❤️ Building

Source: [ChatGPT](https://chatgpt.com/c/68b57bdf-72ec-832c-bcdc-dade5506f7b4)

- To change the name of the app you can set it from `build.productName` in `package.json`.
  - Use of any emoji like 🚀 in `productName` is PROHIBITED, if you use emoji the build process throws error - "Permission denied to create directory for NAME_OF_APP_HERE".
- ❤️In macos you must **build** the app to have the name of the application changed in the dock using `nr build:mac`.
  - ✅ The build is produced at `dist/{productName}-{version}.dmg`
- ⭐️Uninstall app in macOS: [Click here](https://docs.google.com/document/d/1d4Tq28JC17lFqkoz3lqodACnOlCihFj-MnzNb2Vcqd8/edit?tab=t.0#heading=h.6227jtpwqhic)

## **Todos:**

- [x] Switch window to frontend every 1 hour to get feedback on progress.
- TODO: I can minimise or switch back to previous window after giving the feedback using the submit button and only after the response is submitted successfuly.
- TODO: Get feedback on the entire day about my feedback so I can know my psychology of working throughout the day.

## I created this project via below command:

```bash
npm create @quick-start/electron@latest .

# Need to install the following packages:
# @quick-start/create-electron@1.0.28
# Ok to proceed? (y) y


# > npx
# > create-electron .

# ✔ Package name: … electron-app1
# ✔ Select a framework: › svelte
# ✔ Add TypeScript? … YES
# ✔ Add Electron updater plugin? … YES
# ✔ Enable Electron download mirror proxy? … YES

npm i

# 🚀 For development simply run:
nr dev
```

Thanks.
