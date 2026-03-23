# Automated-Ai-Waste-Segregation-System
Automated AI Waste Segregation System is an intelligent system that uses Artificial Intelligence and Computer Vision to automatically classify waste into different categories such as biodegradable, recyclable, and non-recyclable. The system captures images of waste materials and uses a trained machine learning model to predict the correct category.
# ♻️ BINIFY | The AI-Powered Enterprise Waste OS

![BINIFY Header](https://raw.githubusercontent.com/debasisdash/AWSS/main/static/images/hero_tech.png)

**BINIFY** is a next-generation waste intelligence platform using state-of-the-art **Computer Vision** and **Deep Learning** to optimize recycling and environmental impact scan-by-scan.

---

## 🚀 Key Features

- **🧠 Real-time AI Classification**: Expert-level identification of **Dry**, **Wet**, and **Plastic** waste using a high-capacity ResNet-34 neural model.
- **📊 Interactive Dashboard**: A premium, glassmorphism-inspired UI to track environmental metrics like CO2 saved, trees planted, and energy conserved.
- **📱 PWA & Mobile Support**: Full progressive web app support with lightning-fast caching and a mobile-first responsive design.
- **🌐 Multi-Language Interface**: Integrated support for English, Hindi, Odia, Punjabi, Telugu, and more with instant translation.
- **📉 Live Analytics**: Real-time bin level tracking with predictive warnings for collection optimization.
- **🛡️ Secure Enterprise Access**: Built-in authentication systems with persistent history logs and CSV data export for audits.

---

## 🛠️ Technology Stack

- **Backend**: [Flask](https://flask.palletsprojects.com/) (Python)
- **AI/ML**: [PyTorch](https://pytorch.org/) & [Torchvision](https://pytorch.org/vision/) (ResNet-34)
- **Frontend**: Vanilla JavaScript (ES6+), Modern CSS3 (CSS Variables, Flexbox, Grid)
- **Database**: [SQLAlchemy](https://www.sqlalchemy.org/) (SQLite for fast local persistence)
- **Icons**: [Font Awesome 6](https://fontawesome.com/) (Free Tier)
- **Deployment**: Production-ready with [Gunicorn](https://gunicorn.org/) and `Procfile`.

---

## 📦 Installation & Setup

### Prerequisites

- Python 3.10+
- Pip (Python Package Manager)

### 1. Clone & Initialize

```bash
git clone https://github.com/debasisdash/AWSS.git
cd AWSS
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Copy `.env.example` (if using) or create a `.env` file:

```env
SECRET_KEY=your_secret_key
FLASK_DEBUG=True
PORT=5005
```

### 4. Launch the Platform

```bash
python3 backend/app.py
```

Access the dashboard at `http://localhost:5005`.

---

## 🏗️ Project Structure

- `backend/`: Core logic, AI models, and API routes.
- `static/`: Frontend assets (CSS, JS, Fonts, Images).
- `templates/`: HTML5 semantic blueprints with Jinja2 Templating.
- `DATASET/`: Training and testing data used for the ResNet model.
- `Procfile`: Configuration for production deployment on platforms like Railway/Render.

---

## 📈 Search Optimization (SEO)

BINIFY is fully optimized for search visibility with:

- **`sitemap.xml`**: Automatically indexed by Google Crawlers.
- **`robots.txt`**: Defined crawl-logic for search safety.
- **JSON-LD**: Rich snippets for search result clarity.
- **Open Graph**: Metadata for premium social media previews (X, LinkedIn, Facebook).

---

## 🤝 Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

_Created with ❤️ by the BINIFY Development Team._
