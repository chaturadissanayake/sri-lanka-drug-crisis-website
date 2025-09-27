This is a request to synthesise a `README.md` file from a collection of web development source files (`index.html`, `style.css`, `app.js`).

The project is a **scrollytelling data story** titled "**The Shadow War: Sri Lanka's Drug Crisis (2018–2025)**." The README should cover the project's purpose, features, technology stack, setup instructions, and citation information, as derived from the code.

Here is the generated `README.md`:

````markdown
# The Shadow War: Sri Lanka's Drug Crisis (2018–2025)

**A Scrollytelling Data Story on Arrests, Seizures, and Treatment**

This repository contains the source code for an interactive data story that visualises and analyses Sri Lanka's ongoing drug crisis from 2018 to 2025. The project is designed using a **scrollytelling** format to guide the reader through key findings, policy shifts, and geographic disparities in the national response, highlighting the critical imbalance between law enforcement and public health support.

## 🚀 Key Features

* **Scrollytelling Format:** A modern, immersive narrative experience where the story unfolds as the user scrolls, featuring distinct steps tied to data visualisations.
* **Dual-Theme Support (Dark/Light Mode):** Users can easily toggle between a refined dark theme (default) and a light theme using a dedicated button.
* **Dynamic Data Visualisations:** Integration points for six key charts that become visible upon scrolling, covering topics like Arrests vs. Treatment, Shifting Substance Trends (Methamphetamine rise), Seizures, Rehabilitation Capacity, Policy Timelines, and Geographic Distribution.
* **Persistent Scroll Progress Bar:** A thin bar at the top of the viewport to indicate reading progress.
* **News Ticker:** A continuously scrolling banner for high-level updates and key facts.
* **Side Navigation:** A fixed dot-navigation bar that allows readers to jump between story sections and shows the current step.
* **Image Lightbox:** A feature to enlarge and view data visualisations or images in a modal.
* **Interactive Citation:** Provides easy copy functionality for **Journalistic**, **APA Style**, and **BibTeX** citation formats.
* **Accessibility & Interactivity:** Includes keyboard shortcuts (`Shift + ?` to view shortcuts, `T` to toggle theme, `Esc` to close modals).

## 💻 Tech Stack

The project is a pure front-end application built with modern web standards:

* **HTML5:** Structure and content organisation.
* **CSS3:** Styled using **CSS Variables (Design Tokens)** for easy theming and a consistent design language.
* **Vanilla JavaScript (`app.js`):** Powers all interactive features (scrollytelling logic, Intersection Observer for animations, theme toggle, lightbox, copy-to-clipboard, keyboard shortcuts, etc.).
* **Fonts:** Uses **Inter** (for body text) and **Playfair Display** (for headlines) for a strong visual hierarchy.

## ⚙️ Setup and Usage

To view and run this project locally, follow these simple steps:

1.  **Clone the Repository:**
    ```bash
    git clone [repository-url]
    cd the-shadow-war
    ```
2.  **Open the File:**
    Open the `index.html` file in any modern web browser.

    ```bash
    # For example, using a simple command-line utility, open index.html
    ```

The project requires no build tools or external dependencies to run—all functionality is self-contained within the three core files.

## 🔗 Project Structure

````

.
├── index.html          \# Main HTML structure and content
├── style.css           \# All custom CSS, design tokens, and theming logic
├── app.js              \# All JavaScript logic for interactivity and scrollytelling
└── assets/             \# Directory for images, charts, and favicons (not included in upload but referenced)
├── chart-\*.png     \# Data visualization images
└── ...

```

## 📝 Citation

If you use this work or its code as a reference, please cite it as follows (using the Journalistic format for simplicity):

> Chatura Dissanayake. (2025). *The Shadow War: Unpacking Sri Lanka's Drug Crisis*. Retrieved from **[Website URL]**

## ⚖️ License

All text and original visualisations are available under a **[Creative Commons BY-NC 4.0 License](https://creativecommons.org/licenses/by-nc/4.0/)**.

***

*Built by Chatura Dissanayake, Information Designer.*
```
