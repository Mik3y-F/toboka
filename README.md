# Toboka: Real-Time Collaboration Text Editor

Toboka is a real-time collaboration text editor. It's built using a modern tech stack including Next.js, Slatejs, WebSockets, and Tailwind CSS. The editor allows users to collaborate on documents in real-time, with changes reflected instantly across all connected users.

**Demo:** [https://toboka.vercel.app](https://toboka.vercel.app/)

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Development](#development)
6. [License](#license)

## Features

- Real-time collaboration: Multiple users can edit a document simultaneously. Changes made by any user are instantly visible to others.
- Live User Cursors - a visual cue of where each user is working or focusing, helping to prevent editing conflicts and improve communication.
- Responsive Design: Tailwind CSS is used for a mobile-first, responsive design.

## Requirements

- Node.js v14.0.0 or later
- npm v6.14.4 or later

## Installation

Before starting the installation, ensure that you have Node.js and npm installed on your machine.

1. Clone the repository:

    ```bash
    git clone https://github.com/Mik3y-F/toboka.git
    ```

2. Navigate into the project directory:

    ```bash
    cd toboka
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

Once you've installed the dependencies, you can run the application locally using:

```bash
npm run dev
```

This starts the Next.js development server, and you can access the application at `http://localhost:3000`.

## Development

To make changes to the application, follow the installation and usage instructions to get the application running locally.

You can make changes to the source code in the `src` directory. We use ESLint for linting and Prettier for code formatting. Make sure to run these before committing your changes:

```bash
npm run lint
```

## License

Toboka is licensed under the MIT license. See [LICENSE](LICENSE) for the full license text.
