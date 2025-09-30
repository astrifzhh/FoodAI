<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<h3 align="center">FoodAI 🍕</h3>
  <p align="center">
    FoodAI is an intelligent web application that harnesses the power of the IBM Granite AI model to provide personalized food recommendations tailored to your taste. Discover new dishes, save your favorites, and provide reviews, all within one intuitive platform.
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    &middot;
    <a href="https://github.com/github_username/repo_name/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/github_username/repo_name/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## Overview The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<!-- Here's a blank template to get started. To avoid retyping too much info, do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`, `project_license` -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Vue][Vue.js]][Vue-url]
- [![Angular][Angular.io]][Angular-url]
- [![Svelte][Svelte.dev]][Svelte-url]
- [![Laravel][Laravel.com]][Laravel-url]
- [![Bootstrap][Bootstrap.com]][Bootstrap-url]
- [![JQuery][JQuery.com]][JQuery-url] -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## About The Project

Amidst a sea of culinary choices, we often struggle to decide what to eat. FoodAI is here to solve this problem by providing an AI-driven platform that understands user preferences—such as spice level, cuisine type (e.g., Asian, Western), or main ingredients—and delivers relevant and exciting dish recommendations.

This project is still in its early stages of development, with core functionalities currently running on client-side state management.

### Key Features

- 🤖 Smart Recommendations: Enter your preferences and let the IBM Granite AI find the perfect dish for you.
- 💾 Save Favorites: Keep track of interesting food recommendations so you don't lose them.
- ⭐ Provide Reviews: Give a rating or a short review on the recommended food to help the AI learn (currently stored in state).

### Tech Stack

- Artificial Intelligence (AI): IBM Granite
- [![React][React.js]][React-url]
- Styling: Tailwind CSS
- Backend: Node.js & Express.js
- Deployment: Vercel / Netlify

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation Guide

To run this project locally, follow these steps.

1.  Prerequisites<br>
    Make sure you have Node.js (v16 or higher) installed.
2.  Prerequisites<br>
    Clone the Repository<br>
    _(Note: This project is not yet available in a public repository. This step is a placeholder.)_

    ```sh
    git clone [https://github.com/your-username/food-ai.git](https://github.com/your-username/food-ai.git)
    cd food-ai
    ```

3.  Install Dependencies<br>
    Navigate into the frontend and backend directories separately and install the dependencies.
4.  Configure Tailwind CSS (For Initial Setup)<br>
    If you are starting the frontend project from scratch with Vite, follow these steps to integrate Tailwind CSS:
    a. Install Tailwind CSS and its dependencies:

    ```sh
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

    This command will create and (`postcss.config.js`) files.

    b. Configure your template paths:<br>
    Open the (`tailwind.config.js`) file and add the paths to all of your template files.

    ```sh
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

    c. Add the Tailwind directives to your CSS:<br>
    Open your main CSS file (`e.g., ./src/index.css`) and add the following lines at the top.

    ```sh
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

5.  Configure Environment Variables<br>
    Create a (`.env`) file in the root of the frontend directory (`/client`) and add your API key.
6.  Run the Application<br>
    Run the backend server and the frontend development server separately (in two terminals).

        ````sh # Terminal 1: Run the Backend
        cd server
        npm run start # or 'npm run dev' if using nodemon

                # Terminal 2: Run the Frontend
                cd client
                npm run dev

            ```

        The frontend application will be running at `http://localhost:5173`.
        ````

    <p align="right">(<a href="#readme-top">back to top</a>)</p>

### Usage

1. Open `http://localhost:5173` in your browser.
2. On the main page, enter your food preferences. Example: "I want a spicy Asian dish, with chicken as the main ingredient."
3. Click the "Find Recommendations" button.
4. The AI will process your request and display several food options.
5. You can save the recommendations or provide a short review.

### Development Roadmap

We have a grand vision for FoodAI. Here are the features we plan to develop next:<br>

- [ ] Database Integration: Implement MongoDB or PostgreSQL.
- [ ] User Authentication System: Login and registration for personal profiles.
- [ ] Sharing & Community Features: Allow users to share their culinary experiences.
- [ ] Application Feedback Form: Provide a form for feedback on the app.
- [ ] Location-Based Recommendations (GPS): Integrate GPS for nearby restaurant suggestions.

### Contributing

Contributions from the community are highly appreciated! If you'd like to contribute, please follow these steps:

1. Fork this repository (once it's publicly available).
2. Create a new branch (git checkout -b feature/AmazingFeature).
3. Make your changes and commit them (git commit -m 'Add some AmazingFeature').
4. Push to your branch (git push origin feature/AmazingFeature).
5. Open a Pull Request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
## Contact

Your Name - [@instagram_handle](https://www.instagram.com/astrifzhh_/) - hi.astrifzh@gmail.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: /public/images/readme/preview_app.png

<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
