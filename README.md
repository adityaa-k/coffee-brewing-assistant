# ☕ Coffee Brewing Assistant

Welcome to the official repository for the Coffee Brewing Assistant! This is an open-source project dedicated to helping home coffee brewers of all skill levels craft the perfect cup with confidence. Our mission is to make expert brewing advice accessible, friendly, and empowering.

**Live Site:** [**coffeebrewingassistant.com**](https://coffeebrewingassistant.com)


---

## ✨ Features

The Coffee Brewing Assistant is more than just a timer. It's a comprehensive platform designed for growth, learning, and perfect results.

* **Multi-Page Architecture:** A true multi-page site built with React Router for optimal SEO and user experience, featuring a landing page, brewer app, and blog.
* **Adaptive Recipe Calculator:** Intelligently calculates coffee, water, and ice ratios based on user preferences.
* **Guided Brewing:** An interactive, multi-phase brewing process with animated timers and step-by-step instructions.
* **Complete Customization:** Users can override the adaptive algorithm and save their own custom brew recipes and settings to their browser via `localStorage`.
* **Scalable Blog Engine:** A fully-featured blog where new articles can be added by simply editing a single `blogPosts.js` file, no code changes required.
* **Advanced SEO & AI Optimization:**
    * Dynamic metadata (`<title>`, `<meta name="description">`) for every page.
    * Automated `Article` JSON-LD Schema markup for all blog posts to enhance visibility in search results and AI Overviews.
* **Analytics Ready:** Integrated with Google Tag Manager and a custom `dataLayer` for deep analysis of user behavior.

---

## 🛠️ Tech Stack

This project is built with a modern, fast, and scalable front-end stack.

* **Framework:** [React](https://react.dev/) (with Hooks)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Routing:** [React Router](https://reactrouter.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async)
* **Deployment:** [Netlify](https://www.netlify.com/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en) (which includes npm) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/adityaa-k/coffee-brewing-assistant.git](https://github.com/adityaa-k/coffee-brewing-assistant.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd coffee-brewing-assistant
    ```
3.  **Install NPM packages:**
    ```bash
    npm install
    ```
4.  **Set up Analytics (Optional):**
    Open the `index.html` file and replace `YOUR_GTM_ID` with your own Google Tag Manager ID to enable analytics for local testing.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Your app should now be running on [http://localhost:5173](http://localhost:5173).

---

## 📝 Adding New Blog Posts

The blog is designed to be easily updated without touching the core application logic.

1.  **Open the Content File:** Navigate to `/src/blog/blogPosts.js`.
2.  **Add a New Object:** Copy an existing post object and paste it at the top of the `blogPosts` array.
3.  **Update the Content:** Modify the `slug`, `title`, `description`, `author`, `date`, `featuredImage`, and `content` for your new article. The `slug` must be unique.
4.  **Save the file.** Your new blog post will automatically appear on the blog index page.

---

## 🤝 How to Contribute

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/adityaa-k/coffee-brewing-assistant/issues).

---

## 📜 License

This project is open source and available to everyone.
