# Strider App

**Strider App** is a safe space to log and journal—built for the moments when things feel like they’re slowly going out of control. This Node.js application is containerized with Docker, making it easy to run anywhere without installing dependencies globally.

---

## Prerequisites

Make sure you have the following installed:

* [Docker](https://www.docker.com/get-started) (version 20+ recommended)
* [Docker Compose](https://docs.docker.com/compose/install/)

---

## Getting Started

1. **Download the Project**

* **Clone with Git**:

```bash
git clone https://github.com/cascade-coding/strider-app.git
cd strider-app
```

* **Or download the ZIP** from GitHub and extract it. Then navigate into the project folder:

```bash
cd path/to/strider-app
```

2. **Start the app with Docker Compose**

```bash
docker-compose up
```

3. **Open the app in your browser**

Go to [http://localhost:4000](http://localhost:4000)

> Changes you make to the code will automatically reload thanks to Docker volume mounting.

4. **Stop the app**

Press `Ctrl+C` in the terminal and then run:

```bash
docker-compose down
```

---

## License

[MIT](LICENSE)

