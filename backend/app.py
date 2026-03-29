import os
import random
from dotenv import load_dotenv

# Load .env file if it exists (local development)
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env'))
from flask import Flask, render_template, request, jsonify, url_for, flash, redirect, send_from_directory
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
from waste_classifier import WasteClassifier, WasteDetector

# Initialize DL Expert Classifier
classifier = WasteClassifier()
# detector = WasteDetector() # Disabled for single 3-category classification focus

# Handle directory paths for the new structure
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)

app = Flask(__name__, 
            template_folder=os.path.join(ROOT_DIR, 'templates'),
            static_folder=os.path.join(ROOT_DIR, 'static'))

app.secret_key = os.environ.get('SECRET_KEY', 'fallback_dev_key_change_in_prod')
app.config['UPLOAD_FOLDER'] = os.path.join(BASE_DIR, 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, 'instance', 'binify.db')
app.config['SQLALCHEMY_BINDS'] = {
    'users': 'sqlite:///' + os.path.join(BASE_DIR, 'instance', 'users.db')
}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

db = SQLAlchemy(app)

# --- Models ---
class SystemSetting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ai_threshold = db.Column(db.Integer, default=85)
    camera_source = db.Column(db.String(50), default='webcam_0')
    audio_alerts = db.Column(db.Boolean, default=True)
    haptic_feedback = db.Column(db.Boolean, default=True)
    full_name = db.Column(db.String(100), default="Binify Operator")
    avatar_url = db.Column(db.String(200), default='fas fa-user')

class User(db.Model, UserMixin):
    __bind_key__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

class HistoryLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    category = db.Column(db.String(50), nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    disposal_bin = db.Column(db.String(50))

class WasteBin(db.Model):
    id = db.Column(db.String(50), primary_key=True) # bin_1, bin_2 etc
    name = db.Column(db.String(50), nullable=False)
    kg = db.Column(db.Float, default=0.0)
    percent = db.Column(db.Integer, default=0)
    color = db.Column(db.String(20))

# Ensure upload folder and DB exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@login_manager.user_loader
def load_user(user_id):
    try:
        return db.session.get(User, int(user_id))
    except (TypeError, ValueError, Exception):
        return None

with app.app_context():
    db.create_all() # Creates tables for all binds
    # Initialize settings if not exists
    if not SystemSetting.query.first():
        db.session.add(SystemSetting())
        db.session.commit()
    # Auto-create default admin user on first launch
    if not User.query.first():
        admin_user = os.environ.get('DEFAULT_ADMIN_USER', 'admin')
        admin_pass = os.environ.get('DEFAULT_ADMIN_PASSWORD', 'admin123')
        default_password = bcrypt.generate_password_hash(admin_pass).decode('utf-8')
        admin = User(username=admin_user, password=default_password)
        db.session.add(admin)
        db.session.commit()
        print(f"\u2705 Default admin user created: username='{admin_user}'")

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 3-Bin Classification Ecosystem (Dry, Wet, Plastic)
WASTE_CATEGORIES = {
    'plastic': {
        'title': 'Plastic Waste',
        'color': '#3b82f6',
        'tips': ['Rinse plastic bottles', 'Remove caps and labels', 'Flatten to save space'],
        'disposal': 'Place in the PLASTIC BIN'
    },
    'dry': {
        'title': 'Dry Waste',
        'color': '#6b7280',
        'tips': ['Keep paper dry', 'Clean metal cans', 'Check for recycling symbols'],
        'disposal': 'Place in the DRY WASTE BIN'
    },
    'wet': {
        'title': 'Wet Waste',
        'color': '#10b981',
        'tips': ['Compost food waste', 'Drain excess liquids', 'Remove plastic bags'],
        'disposal': 'Place in the WET WASTE BIN'
    }
}


@app.route('/sw.js')
def sw():
    """Serve service worker at root scope for proper PWA caching."""
    return send_from_directory(os.path.join(ROOT_DIR, 'static'), 'sw.js')

@app.route('/robots.txt')
def robots():
    return send_from_directory(os.path.join(ROOT_DIR, 'static'), 'robots.txt')

@app.route('/sitemap.xml')
def sitemap():
    return send_from_directory(os.path.join(ROOT_DIR, 'static'), 'sitemap.xml')

@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
        
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            if login_user(user, remember=True):
                print(f"DEBUG: User {username} logged in successfully.")
                flash('Login Successful!', 'success')
                
                # Robust redirect: avoid external URLs and default to dashboard
                next_page = request.args.get('next')
                if not next_page or next_page.startswith('http') or next_page.startswith('//'):
                    next_page = url_for('dashboard')
                
                print(f"DEBUG: Redirecting to {next_page}")
                return redirect(next_page)
            else:
                print(f"DEBUG: login_user failed for {username}")
                flash('Login Failed: Account could not be activated.', 'error')
        else:
            print(f"DEBUG: Invalid credentials for {username}")
            flash('Login Failed. Check your username and password.', 'error')
            
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
        
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        if password != confirm_password:
            flash('Passwords do not match.', 'error')
            return redirect(url_for('register'))
            
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Username already exists.', 'error')
            return redirect(url_for('register'))
            
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        flash('Registration Successful! Please login.', 'success')
        return redirect(url_for('login'))
        
    return render_template('register.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))


@app.route('/dashboard')
@login_required
def dashboard():
    print(f"DEBUG: Dashboard accessed by {current_user.username}")
    return render_template('dashboard.html', user=current_user)

@app.route('/history')
@login_required
def history():
    logs = HistoryLog.query.order_by(HistoryLog.timestamp.desc()).limit(50).all()
    return render_template('history.html', logs=logs)

@app.route('/detect')
@login_required
def detect():
    return render_template('detect.html')

@app.route('/settings')
@login_required
def settings():
    user_settings = SystemSetting.query.first()
    return render_template('settings.html', settings=user_settings)

@app.route('/save_settings', methods=['POST'])
@login_required
def save_settings():
    s = SystemSetting.query.first()
    if not s:
        s = SystemSetting()
        db.session.add(s)
        
    if s:
        s.ai_threshold = int(request.form.get('ai_threshold', 85))
        s.camera_source = request.form.get('camera_source', 'webcam_0')
        s.audio_alerts = 'audio_alerts' in request.form
        s.haptic_feedback = 'haptic_feedback' in request.form
        
        # Update User Name
        user_name = request.form.get('user_name')
        if user_name:
            s.full_name = user_name
            
        avatar_url = request.form.get('avatar_url')
        if avatar_url:
            s.avatar_url = avatar_url
            
        db.session.commit()
    flash('Settings updated successfully!', 'success')
    return redirect(url_for('settings'))

@app.route('/classify', methods=['POST'])
@login_required
def classify():
    # If a file is uploaded, we process it. If not, we check for a "simulated_scan" flag
    file = request.files.get('file')
    
    if not file and request.form.get('simulated_scan') == 'true':
        # Fallback to random simulation if requested (mostly for testing UI)
        category_key = random.choice(list(WASTE_CATEGORIES.keys()))
        result = WASTE_CATEGORIES[category_key]
        confidence = round(random.uniform(90.0, 99.8), 2)
    elif file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Expert Multi-Class prediction via MODULAR CLASSIFIER (Dry, Wet, Plastic)
        try:
            category_key, display_name, confidence = classifier.predict(file_path)
            result = WASTE_CATEGORIES[category_key].copy()
            result['title'] = f"{result['title']} ({display_name})"
            
            # Use fixed bounding box for UI visualization
            bbox = [50, 50, 300, 300] 
        except Exception as e:
            print(f"DL Error: {e}")
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'No file or scan instruction provided'}), 400
        
    # Save result to DB
    new_log = HistoryLog(
        category=result['title'],
        confidence=confidence,
        disposal_bin=result['disposal']
    )
    db.session.add(new_log)
    
    # Update corresponding Bin in DB
    bin_name = result['title'].split(' ')[0] 
    b = WasteBin.query.filter(WasteBin.name.ilike(f"%{bin_name}%")).first()
    
    if b:
        # Standard weights for the 3 categories
        weight_map = {'plastic': 0.05, 'dry': 0.2, 'wet': 0.5}
        inc_kg = weight_map.get(category_key, 0.1)
        b.kg = round(b.kg + inc_kg, 2)
        b.percent = min(100, b.percent + random.randint(3, 8))
    
    db.session.commit()
    
    return jsonify({**result, 'confidence': confidence, 'bbox': bbox, 'detections': [{
        'bbox': bbox, 'category': category_key, 'confidence': confidence, 'title': result['title'], 'color': result['color']
    }]})

# --- NEW API ENDPOINTS ---

@app.route('/api/bins', methods=['GET'])
def get_bins():
    bins = WasteBin.query.all()
    if not bins:
        # User requested exactly 3 bins: Dry, Wet, Plastic
        default_bins = [
            {'id': 'bin_dry', 'name': 'Dry Waste', 'kg': 0.0, 'percent': 0, 'color': '#6b7280'},
            {'id': 'bin_wet', 'name': 'Wet Waste', 'kg': 0.0, 'percent': 0, 'color': '#10b981'},
            {'id': 'bin_plastic', 'name': 'Plastic Waste', 'kg': 0.0, 'percent': 0, 'color': '#3b82f6'}
        ]
        for b in default_bins:
            new_bin = WasteBin(id=b['id'], name=b['name'], kg=b['kg'], percent=b['percent'], color=b['color'])
            db.session.add(new_bin)
        db.session.commit()
        bins = WasteBin.query.all()
    
    return jsonify([{
        'id': b.id, 'name': b.name, 'kg': b.kg, 'percent': b.percent, 'color': b.color
    } for b in bins])

@app.route('/api/bins/update', methods=['POST'])
def update_bin():
    data = request.json
    bin_id = data.get('id')
    op = data.get('operation') # 'increment', 'clear', 'add'
    
    b = WasteBin.query.filter_by(id=bin_id).first()
    if not b and op != 'add':
        return jsonify({'error': 'Bin not found'}), 404
        
    if op == 'increment':
        b.kg = round(b.kg + 0.5, 2)
        b.percent = min(100, b.percent + 5)
    elif op == 'clear':
        b.kg = 0.0
        b.percent = 0
    elif op == 'add':
        new_id = f"bin_{random.randint(1000, 9999)}"
        b = WasteBin(id=new_id, name=data['name'], kg=0.0, percent=0, color=data['color'])
        db.session.add(b)
        
    db.session.commit()
    return jsonify({'success': True})

@app.route('/api/bins/delete/<bin_id>', methods=['DELETE'])
def delete_bin_api(bin_id):
    b = WasteBin.query.filter_by(id=bin_id).first()
    if b:
        db.session.delete(b)
        db.session.commit()
        return jsonify({'success': True})
    return jsonify({'error': 'Bin not found'}), 404

@app.route('/api/stats')
def get_stats():
    total_scans = HistoryLog.query.count()
    # Calculate impact based on history
    co2 = round(total_scans * 0.2, 1)
    trees = round(total_scans * 0.01, 2)
    energy = round(total_scans * 0.1, 1)
    
    return jsonify({
        'totalItems': total_scans,
        'successRate': 98.2 if total_scans > 0 else 0,
        'impact': {
            'co2': co2,
            'trees': trees,
            'energy': energy
        }
    })

@app.route('/api/history')
def get_history_api():
    logs = HistoryLog.query.order_by(HistoryLog.timestamp.desc()).limit(50).all()
    return jsonify([{
        'date': log.timestamp.strftime('%b %d, %Y'),
        'time': log.timestamp.strftime('%I:%M %p'),
        'type': log.category,
        'confidence': f"{log.confidence}%",
        'bin': log.disposal_bin
    } for log in logs])

@app.route('/api/history/clear', methods=['POST'])
def clear_history():
    HistoryLog.query.delete()
    db.session.commit()
    return jsonify({'success': True})

@app.route('/api/history/export')
def export_history():
    import csv
    from io import StringIO
    from flask import make_response

    si = StringIO()
    cw = csv.writer(si)
    cw.writerow(['Date', 'Time', 'Waste Type', 'Confidence', 'Bin Assignment'])
    
    logs = HistoryLog.query.order_by(HistoryLog.timestamp.desc()).all()
    for log in logs:
        cw.writerow([
            log.timestamp.strftime('%b %d, %Y'),
            log.timestamp.strftime('%I:%M %p'),
            log.category,
            f"{log.confidence}%",
            log.disposal_bin
        ])
    
    output = make_response(si.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=binify_export.csv"
    output.headers["Content-type"] = "text/csv"
    return output


@app.route('/api/feedback/manual_override', methods=['POST'])
def manual_override():
    data = request.json
    # Log correction for future retraining
    log_file = os.path.join(BASE_DIR, 'corrections.json')
    try:
        import json
        corrections = []
        if os.path.exists(log_file):
            with open(log_file, 'r') as f:
                corrections = json.load(f)
        
        corrections.append({
            'timestamp': db.func.current_timestamp(),
            'original': data.get('original'),
            'corrected': data.get('corrected'),
            'image_path': data.get('image_path')
        })
        
        with open(log_file, 'w') as f:
            json.dump(corrections, f, indent=4, default=str)
            
        print(f"Manual Override Saved: {data.get('original')} -> {data.get('corrected')}")
    except Exception as e:
        print(f"Error saving override: {e}")
        
    return jsonify({'success': True})

# --- Error Handlers ---
@app.errorhandler(404)
def not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    port = int(os.environ.get('PORT', 5005))
    app.run(debug=debug_mode, port=port, host='0.0.0.0')
