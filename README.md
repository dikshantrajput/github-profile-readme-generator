# GitHub Profile README Generator

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/dikshantrajput/github-profile-readme-generator.svg)](https://github.com/dikshantrajput/github-profile-readme-generator/issues)
[![GitHub stars](https://img.shields.io/github/stars/dikshantrajput/github-profile-readme-generator.svg)](https://github.com/dikshantrajput/github-profile-readme-generator/stargazers)

> A quick, easy tool for creating a personalized GitHub profile README, complete with your choice of templates.

## Overview

Creating a GitHub profile README that stands out can be time-consuming. **GitHub Profile README Generator** simplifies the process by allowing users to log in via GitHub, choose a template, and instantly generate a README tailored for their profile. It’s designed to save time and ensure your profile looks polished and professional.

**Try it out:** [Generate your own GitHub profile README](https://gh-readme-gen.vercel.app) and see it in action!

This project is entirely open source, and we welcome contributions! See our [Contributing Guidelines](./CONTRIBUTING.md) if you’d like to get involved.

## Features

- **GitHub Login:** Securely log in using your GitHub account to access the generator.
- **Template Selection:** Choose from a variety of templates to suit your style, covering different sections like "About Me," "Projects," and "Skills."
- **Instant Generation:** Automatically create a customized README based on your selected template, ready to copy-paste into your GitHub profile.

## Getting Started

Follow these instructions to get the project running locally for development and testing purposes.

### Prerequisites

- Node.js (>= 16.x)
- GitHub Developer Account (for OAuth setup)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dikshantrajput/github-profile-readme-generator.git
   cd github-profile-readme-generator
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up GitHub OAuth credentials**:

   To allow users to log in with GitHub, you'll need to configure a GitHub OAuth application and set up the credentials in Supabase.

   - Go to [GitHub's Developer Settings](https://github.com/settings/developers).
   - Select **OAuth Apps** > **New OAuth App**.
   - Fill in the required details:
     - **Application name**: GitHub Profile README Generator
     - **Homepage URL**: `http://localhost:5173` 
     - **Authorization callback URL**: Copy the callback url from supabase project
   - Click **Register Application**.

   Once created, GitHub will provide a **Client ID** and **Client Secret**. These will be used in your Supabase settings.

4. **Configure Supabase for GitHub OAuth**:

   - Go to your Supabase Dashboard or create a new project from [here](database.new), select your project, and navigate to **Authentication** > **Providers**.
   - Enable **GitHub** as a provider.
   - Paste your **Client ID** and **Client Secret** from GitHub into the corresponding fields in Supabase.
   - Save the changes.

5. **Set up environment variables**:

   Copy the `.env.example` file and name it `.env` and paste your creds from your supabase project

6. **Run the development server**:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:5173](http://localhost:5173) in your browser to start using the generator.

## Usage

1. **Log in**: Click the "Login with GitHub" button to authenticate.
2. **Choose a Template**: Browse and select from various README templates available.
3. **Generate**: Click "Generate" to create a README based on the selected template. You can preview and edit the generated markdown file or copy it directly to your clipboard.

## Contributing

Contributions are welcome! If you have suggestions for new templates or features, or if you want to fix any issues, please follow our [Contributing Guidelines](./contributing.md).

### Reporting Issues

Found a bug? Please [open an issue](https://github.com/dikshantrajput/github-profile-readme-generator/issues) and let us know.

## Roadmap

We have exciting plans for future updates:

- Add more customizable template options.
- Support for more sections like “Certifications,” “Blog Posts,” and “Achievements.”
- Enhanced styling options with interactive sections.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

Special thanks to the open-source community for inspiring the creation of this project, and to all the contributors who have helped improve it. 
