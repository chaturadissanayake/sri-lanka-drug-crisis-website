# The Shadow War: Sri Lanka's Drug Crisis (2018–2025)

**A Scrollytelling Data Story on Arrests, Seizures, and Treatment**

This repository contains the source code for an interactive data story that visualises and analyses Sri Lanka's ongoing drug crisis from **2018 to 2025**.

The project uses a **scrollytelling** format to guide the reader through key findings, policy shifts, and geographic disparities in the national response, highlighting the critical imbalance between law enforcement and public health support.

---

## 🚀 Key Features

* **Scrollytelling Format:** An immersive narrative experience where the story unfolds as the user scrolls, with content steps tied to data visualisations.
* **Dual-Theme Support:** Easy-to-use toggle button to switch between the default **Dark Mode** and an alternate **Light Mode**.
* **Dynamic Data Visualisations:** Integration points for key charts that become visible upon scrolling, covering topics like Arrests vs. Treatment, Shifting Substance Trends (Methamphetamine rise), Seizures, and Rehabilitation Capacity.
* **Accessibility & Interactivity:** Includes a persistent **scroll progress bar**, a fixed dot-navigation bar for jumping between sections, and a dedicated **Keyboard Shortcuts** modal (`Shift + ?` to view).
* **Image Lightbox:** A feature to enlarge and view data visualisations or images in a modal window.
* **Citation Tool:** A built-in feature to easily copy the citation in Journalistic, APA, and BibTeX formats.

---

## 💻 Tech Stack

This is a pure front-end application built with modern web standards, requiring no complex build tools or frameworks.

* **HTML5:** Main structure and content organisation.
* **CSS3:** Highly organized stylesheet using **CSS Variables (Design Tokens)** to power the easy theme-switching functionality.
* **Vanilla JavaScript (`app.js`):** Powers all interactive features, including the scrollytelling logic, theme toggle, lightbox functionality, keyboard shortcuts, and animation control via the **Intersection Observer API**.
* **Fonts:** Uses **Inter** (for body text) and **Playfair Display** (for headlines).

---

## ⚙️ Setup and Usage

To run this project locally, no server or external dependencies are required.

1.  **Clone the Repository:**
    ```bash
    git clone [repository-url]
    cd the-shadow-war
    ```
2.  **Open the File:**
    Open the `index.html` file in any modern web browser.

    ```bash
    open index.html
    ```

---

## 📝 Citation

If you use this work or its code as a reference, please be sure to cite it appropriately. The default journalistic format is:

> Chatura Dissanayake. (2025). *The Shadow War: Unpacking Sri Lanka's Drug Crisis*. Retrieved from **[Website URL]**

---

## ⚖️ License

All text and original visualisations are available under a **[Creative Commons BY-NC 4.0 License](https://creativecommons.org/licenses/by-nc/4.0/)**.

***

*Built by Chatura Dissanayake, Information Designer.*
