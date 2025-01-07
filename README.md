![image](https://github.com/user-attachments/assets/bfc63f02-d279-43f1-a520-4c496f69dc4c)
<p align="center"><h1 align="center">USKI-DRIVE.GIT</h1></p>

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

<code>❯ Uski Drive is a secure cloud storage solution that allows users to store, manage, and share their files easily. This project consists of a frontend built with React and Vite, and a backend built with Node.js, Express, and AWS services. The infrastructure is managed using Terraform. </code>

---

##  Features

### Frontend
- Built with React and Vite
- User authentication and authorization
- File and folder management
- File upload and preview
- Responsive design
### Backend
- Built with Node.js and Express
- RESTful API for file and user management
- AWS Lambda for serverless functions
- AWS S3 for file storage
- AWS DynamoDB for data storage

---

##  Project Structure

```sh

.github/
  workflows/
    backend.yaml
    frontend.yaml
backend/
  .gitignore
  AWS.Config.js
  Controller/
  index.js
  package.json
  README.md
  Routes/
  serverless.setup.yml
  serverless.yml
frontend/
  .dockerignore
  .env
  .eslintrc.cjs
  .gitignore
  Dockerfile
  index.html
  nginx.conf
  package.json
  public/
  README.md
  src/
  vite.config.js
infra/
  .gitignore
  .terraform/
  .terraform.lock.hcl
  apigateway.tf
  lambda.tf
  terraform-config.tf
  terraform.tfstate
  terraform.tfstate.backup
  terraform.tfvars
  variables.tf
```

##  Getting Started

###  Prerequisites

Before getting started with Uski-Drive.git, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Npm
- **Container Runtime:** Docker


###  Installation

Install Uski-Drive.git using one of the following methods:

**Build from source:**

1. Clone the Uski-Drive.git repository:
```sh
❯ git clone https://github.com/KKA-0/Uski-Drive.git
```

2. Navigate to the project directory:
```sh
❯ cd Uski-Drive.git
```



###  Usage

**Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ docker run -p 3000:80 -d kka01/uskidrive-frontend:latest 
```

---
##  Project Roadmap
- [ ] **`Task 1`**: Github action backend deploy not working fix
- [ ] **`Task 2`**: Github action frontend deploy not working fix
- [ ] **`Task 3`**: Configure cloudwatch and alarms
- [ ] **`Task 4`**: Deploy the application in multiple AWS regions using AWS Global Accelerator or Route 53
latency-based routing.
**`Task 5`**: Implement disaster recovery (DR) with cross-region backups of DynamoDB and S3 buckets.
---


##  Contributing

- **💬 [Join the Discussions](https://github.com/KKA-0/Uski-Drive.git/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/KKA-0/Uski-Drive.git/issues)**: Submit bugs found or log feature requests for the `Uski-Drive.git` project.
- **💡 [Submit Pull Requests](https://github.com/KKA-0/Uski-Drive.git/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/KKA-0/Uski-Drive.git
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/KKA-0/Uski-Drive.git/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=KKA-0/Uski-Drive.git">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
