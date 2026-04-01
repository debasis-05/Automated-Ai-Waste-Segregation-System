let selectedFile = null;
let canvasElement, webcamElement;
let isFlashOn = false;

const i18n = {
  en: {
    active: "Healthy",
    detected_type: "Item Category",
    confidence: "AI Accuracy",
    detected_at: "Processed At",
    bin_status: "Waste Bins",
    bin_full_msg: " bin will be full soon (~",
    manual_override: "Fix Category",
    wrong_result: "Not correct? Tap the right one",
    heatmap_toggle: "Show AI Logic",
    nav_dashboard: "Dashboard",
    nav_history: "Scan History",
    nav_settings: "System Settings",
    footer_desc:
      "Revolutionizing waste management through artificial intelligence.",
    footer_nav: "Navigation",
    footer_resources: "Resources",
    footer_contact: "Contact Us",
    add_bin: "Add New Bin",
    total_scans: "Total Scan",
    ai_accuracy: "AI Accuracy",
    carbon_diverted: "Carbon Diverted",
    trees_saved: "Trees Saved",
    energy_saved: "Energy Saved",
    sys_status: "System Status",
    sys_updates: "System Updates",
    hide_all: "Hide All",
    history_title: "History / Logs",
    recent_logs: "Recent Segregation Logs",
    export_logs: "Export Logs",
    col_date: "Date",
    col_time: "Time",
    col_type: "Waste Type",
    col_conf: "Confidence",
    col_bin: "Bin Assignment",
    no_records: "No records found. Start scanning to see history!",
    settings_title: "System Settings",
    account_profile: "Account Profile",
    quick_avatar: "Quick Avatar selection:",
    full_name: "Full Name",
    emp_id: "Employee ID",
    scanner_pref: "Scanner Preferences",
    ai_sens: "AI Sensitivity (Threshold)",
    video_device: "Video Input Device",
    notifications: "Notifications",
    sound_alerts: "Sound Alerts",
    sound_desc: "Beep when a bin is full",
    ai_speech: "AI Result Speech",
    ai_speech_desc: "Announce identified materials",
    save_changes: "Save All Changes",
    bin_full: "FULL",
    bin_prediction_prefix: "Prediction: ~",
    bin_action_required: "⚠ Action Required",
    hours: "hours",
    add: "Add",
    clear: "Clear",
    scanner_title: "AI Waste Scanner",
    scanner_desc:
      "Upload an image of your waste to identify its category and get disposal tips.",
    drag_drop: "Drag & Drop your image here",
    or_click: "or click to browse from your device",
    browse_files: "Browse Files",
    analyze_image: "Analyze Image",
    analyzing: "AI is analyzing material composition...",
    detected: "Detected",
    disposal_instr: "Disposal Instructions:",
    recycling_tips: "Recycling Tips:",
    scan_another: "Scan Another Item",
    join_title: "Join BINIFY",
    join_desc:
      "Create your account. Your unique Employee ID will be assigned automatically upon joining.",
    username: "Username",
    email_addr: "Email Address",
    secure_pass: "Secure Password",
    create_acc: "Create Account",
    already_acc: "Already have an account?",
    sign_in: "Sign In",
    welcome_back: "Welcome Back",
    login_desc: "Access your enterprise waste management dashboard.",
    dont_have_acc: "Don't have an account?",
    sign_up: "Sign Up Now",
    hero_title: "Smart Recycling Made Simple",
    hero_desc:
      "Help our planet by scanning your waste. Our AI tells you exactly where it goes, making recycling easy for everyone.",
    start_scanning: "Start Scanning",
    how_it_works: "How it works",
    magic_scan: "Magic Scan",
    magic_desc:
      "Just show your item to the camera, and our AI identifies it in a snap.",
    helpful_tips: "Helpful Tips",
    tips_desc:
      "Get clear, simple instructions on which bin to use for your waste.",
    track_success: "Track Success",
    track_desc:
      "See the positive impact you're making on the planet every day.",
    our_mission: "Our Mission",
    zero_waste_title: "Paving the way for Zero Waste",
    mission_desc:
      "We believe technology is the key to solving the global waste crisis. By making segregation accessible to everyone, we can significantly reduce landfill waste and promote a circular economy.",
    lang_changed: "Language updated to English",
    mission_bullet_footprint: "Reducing environmental footprint",
    mission_bullet_communities: "Educating communities on recycling",
    mission_bullet_collection: "Optimizing waste collection routes",
    placeholder_username: "e.g. operator_alex",
    placeholder_email: "name@binify.ai",
    placeholder_fullname: "Alexander Smith",
    placeholder_password: "••••••••",
    placeholder_username_login: "Enter username",
  },
  hi: {
    active: "सक्रिय",
    detected_type: "वस्तु श्रेणी",
    confidence: "वर्गीकरण विश्वास",
    detected_at: "समय पर पता चला",
    bin_status: "कूड़ेदान की स्थिति",
    bin_full_msg: " कूड़ेदान जल्द भर जाएगा (~",
    manual_override: "श्रेणी सुधारें",
    wrong_result: "गलत परिणाम? सही श्रेणी चुनें",
    heatmap_toggle: "AI समझाएं",
    nav_dashboard: "डैशबोर्ड",
    nav_history: "स्कैन इतिहास",
    nav_settings: "सिस्टम सेटिंग्स",
    footer_desc: "कृत्रिम बुद्धिमत्ता के माध्यम से कचरा प्रबंधन में क्रांति।",
    footer_nav: "नेविगेशन",
    footer_resources: "संसाधन",
    footer_contact: "संपर्क करें",
    add_bin: "नया कूड़ेदान जोड़ें",
    total_scans: "कुल स्कैन",
    ai_accuracy: "AI सटीकता",
    carbon_diverted: "कार्बन डायवर्सन",
    trees_saved: "बचाए गए पेड़",
    energy_saved: "बचत ऊर्जा",
    sys_status: "सिस्टम की स्थिति",
    sys_updates: "सिस्टम अपडेट",
    hide_all: "सब छुपाएं",
    history_title: "इतिहास / लॉग",
    recent_logs: "हाल के लॉग",
    export_logs: "लॉग एक्सपोर्ट करें",
    col_date: "तारीख",
    col_time: "समय",
    col_type: "कचरा प्रकार",
    col_conf: "सटीकता",
    col_bin: "कूड़ेदान",
    no_records: "कोई रिकॉर्ड नहीं मिला। इतिहास देखने के लिए स्कैन शुरू करें!",
    settings_title: "सिस्टम सेटिंग्स",
    account_profile: "अकाउंट प्रोफाइल",
    quick_avatar: "त्वरित अवतार चयन:",
    full_name: "पूरा नाम",
    emp_id: "कर्मचारी आईडी",
    scanner_pref: "स्कैनर प्राथमिकताएं",
    ai_sens: "AI संवेदनशीलता",
    video_device: "वीडियो इनपुट डिवाइस",
    notifications: "सूचनाएं",
    sound_alerts: "ध्वनि अलर्ट",
    sound_desc: "बिन भर जाने पर बीप",
    ai_speech: "AI परिणाम भाषण",
    ai_speech_desc: "पहचानी गई सामग्रियों की घोषणा करें",
    save_changes: "सभी परिवर्तन सहेजें",
    bin_full: "भरा हुआ",
    bin_prediction_prefix: "पूर्वानुमान: ~",
    bin_action_required: "⚠ कार्रवाई आवश्यक",
    hours: "घंटे",
    add: "जोड़ें",
    clear: "साफ़ करें",
    scanner_title: "AI कचरा स्कैनर",
    scanner_desc:
      "अपनी कचरा श्रेणी की पहचान करने और निपटान सुझाव प्राप्त करने के लिए छवि अपलोड करें।",
    drag_drop: "अपनी छवि यहाँ खींचें और छोड़ें",
    or_click: "या अपने डिवाइस से ब्राउज़ करने के लिए क्लिक करें",
    browse_files: "फ़ाइलें ब्राउज़ करें",
    analyze_image: "छवि का विश्लेषण करें",
    analyzing: "AI सामग्री संरचना का विश्लेषण कर रहा है...",
    detected: "पहचाना गया",
    disposal_instr: "निपटान निर्देश:",
    recycling_tips: "रीसाइक्लिंग टिप्स:",
    scan_another: "एक और आइटम स्कैन करें",
    join_title: "BINIFY में शामिल हों",
    join_desc:
      "अपना खाता बनाएं। शामिल होने पर आपकी विशिष्ट कर्मचारी आईडी स्वचालित रूप से असाइन की जाएगी।",
    username: "उपयोगकर्ता नाम",
    email_addr: "ईमेल पता",
    secure_pass: "सुरक्षित पासवर्ड",
    create_acc: "खाता बनाएं",
    already_acc: "पहले से ही एक खाता है?",
    sign_in: "साइन इन करें",
    welcome_back: "वापसी पर स्वागत है",
    login_desc: "अपने इंटरप्राइज कचरा प्रबंधन डैशबोर्ड तक पहुंचें।",
    dont_have_acc: "खाता नहीं है?",
    sign_up: "अभी साइन अप करें",
    hero_title: "स्मार्ट रीसाइक्लिंग अब आसान",
    hero_desc:
      "कचरे को स्कैन करके हमारे ग्रह की मदद करें। हमारा AI आपको बताता है कि यह कहाँ जाता है, जिससे रीसाइक्लिंग आसान हो जाती है।",
    start_scanning: "स्कैन शुरू करें",
    how_it_works: "यह कैसे काम करता है",
    magic_scan: "मैजिक स्कैन",
    magic_desc:
      "बस अपना आइटम कैमरा को दिखाएं, और हमारा AI इसे तुरंत पहचान लेता है।",
    helpful_tips: "उपयोगी टिप्स",
    tips_desc:
      "कचरे के लिए किस बिन का उपयोग करना है, इसके स्पष्ट निर्देश प्राप्त करें।",
    track_success: "ट्रैक सफलता",
    track_desc: "देखें कि आप हर दिन ग्रह पर क्या सकारात्मक प्रभाव डाल रहे हैं।",
    our_mission: "हमारा उद्देश्य",
    zero_waste_title: "जीरो वेस्ट के लिए मार्ग प्रशस्त करना",
    mission_desc:
      "हमारा मानना है कि वैश्विक कचरा संकट को हल करने के लिए तकनीक ही कुंजी है। पृथक्करण को सुलभ बनाकर, हम लैंडफिल कचरे को कम कर सकते हैं।",
    lang_changed: "भाषा हिंदी में बदल दी गई है",
    mission_bullet_footprint: "पर्यावरण पदचिह्न कम करना",
    mission_bullet_communities: "रीसाइक्लिंग पर समुदायों को शिक्षित करना",
    mission_bullet_collection: "कचरा संग्रह मार्गों का अनुकूलन",
    placeholder_username: "उदा. operator_alex",
    placeholder_email: "name@binify.ai",
    placeholder_fullname: "Alexander Smith",
    placeholder_password: "••••••••",
    placeholder_username_login: "उपयोगकर्ता नाम दर्ज करें",
  },
  or: {
    // Odia
    active: "ସକ୍ରିୟ",
    detected_type: "ବର୍ଜ୍ୟବସ୍ତୁ ଶ୍ରେଣୀ",
    confidence: "ପୂର୍ବାନୁମାନ ବିଶ୍ୱାସ",
    detected_at: "ସମୟ",
    bin_status: "ଡବା ସ୍ଥିତି",
    bin_full_msg: " ଡବା ଶୀଘ୍ର ଭର୍ତ୍ତି ହୋଇଯିବ (~",
    manual_override: "ଶ୍ରେଣୀ ସୁଧାରନ୍ତୁ",
    wrong_result: "ଭୁଲ୍ ଫଳାଫଳ? ସଠିକ୍ ବାଛନ୍ତୁ",
    heatmap_toggle: "AI ବ୍ୟାଖ୍ୟା",
    nav_dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    nav_history: "ସ୍କାନ୍ ଇତିହାସ",
    nav_settings: "ସେଟିଂସ",
    footer_desc: "AI ମାଧ୍ୟମରେ ବର୍ଜ୍ୟବସ୍ତୁ ପରିଚାଳନା।",
    footer_nav: "ନେଭିଗେସନ୍",
    footer_resources: "ସମ୍ବଳ",
    footer_contact: "ଯୋଗାଯୋଗ",
    add_bin: "ନୂଆ ଡବା ଯୋଡନ୍ତୁ",
    total_scans: "ମୋଟ ସ୍କାନ୍",
    ai_accuracy: "AI ସଠିକତା",
    carbon_diverted: "କାର୍ବନ୍ ସଞ୍ଚୟ",
    trees_saved: "ବଞ୍ଚାଯାଇଥିବା ଗଛ",
    energy_saved: "ସଞ୍ଚୟ ଶକ୍ତି",
    sys_status: "ସିଷ୍ଟମ୍ ସ୍ଥିତି",
    sys_updates: "ସିଷ୍ଟମ୍ ଅପଡେଟ୍",
    hide_all: "ସବୁ ଲୁଚାନ୍ତୁ",
    history_title: "ଇତିହାସ / ଲଗ୍",
    recent_logs: "ନିକଟ ଅତୀତର ଲଗ୍",
    export_logs: "ଲଗ୍ ସେଭ୍ କରନ୍ତୁ",
    col_date: "ତାରିଖ",
    col_time: "ସମୟ",
    col_type: "ବର୍ଜ୍ୟବସ୍ତୁ ପ୍ରକାର",
    col_conf: "ସଠିକତା",
    col_bin: "ବର୍ଜ୍ୟବସ୍ତୁ ଡବା",
    no_records:
      "କୌଣସି ରେକର୍ଡ ମିଳିଲା ନାହିଁ। ଇତିହାସ ଦେଖିବା ପାଇଁ ସ୍କାନ୍ ଆରମ୍ଭ କରନ୍ତୁ!",
    settings_title: "ସିଷ୍ଟମ୍ ସେଟିଂସ",
    account_profile: "ଆକାଉଣ୍ଟ ପ୍ରୋଫାଇଲ୍",
    quick_avatar: "ଅବତାର ଚୟନ:",
    full_name: "ପୁରା ନାମ",
    emp_id: "କର୍ମଚାରୀ ID",
    scanner_pref: "ସ୍କାନର୍ ପସନ୍ଦ",
    ai_sens: "AI ସମ୍ବେଦନଶୀଳତା",
    video_device: "ଭିଡିଓ ଇନପୁଟ୍ ଉପକରଣ",
    notifications: "ସୂଚନା",
    sound_alerts: "ଶବ୍ଦ ଆଲର୍ଟ",
    sound_desc: "ଡବା ଭର୍ତ୍ତି ହେଲେ ଶବ୍ଦ ହେବ",
    ai_speech: "AI ଫଳାଫଳ ଭାଷଣ",
    ai_speech_desc: "ସାମଗ୍ରୀର ନାମ କୁହନ୍ତୁ",
    save_changes: "ସମସ୍ତ ପରିବର୍ତ୍ତନ ସେଭ୍ କରନ୍ତୁ",
    bin_full: "ଭର୍ତ୍ତି",
    bin_prediction_prefix: "ପୂର୍ବାନୁମାନ: ~",
    bin_action_required: "⚠ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ ଆବଶ୍ୟକ",
    hours: "ଘଣ୍ଟା",
    add: "ଯୋଡନ୍ତୁ",
    clear: "ଖାଲି କରନ୍ତୁ",
    scanner_title: "AI ବର୍ଜ୍ୟବସ୍ତୁ ସ୍କାନର୍",
    scanner_desc: "ବର୍ଜ୍ୟବସ୍ତୁ ଚିହ୍ନଟ କରିବା ଏବଂ ଟିପ୍ସ ପାଇଁ ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ |",
    drag_drop: "ଏଠାରେ ଫଟୋ ରଖନ୍ତୁ",
    or_click: "କିମ୍ବା ଡିଭାଇସରୁ ଫଟୋ ବାଛନ୍ତୁ",
    browse_files: "ଫାଇଲ୍ ଖୋଜନ୍ତୁ",
    analyze_image: "ବିଶ୍ଳେଷଣ କରନ୍ତୁ",
    analyzing: "AI ବିଶ୍ଳେଷଣ କରୁଛି...",
    detected: "ଚିହ୍ନଟ ହୋଇଛି",
    disposal_instr: "ନିଷ୍କାସନ ନିର୍ଦ୍ଦେଶାବଳୀ:",
    recycling_tips: "ରିସାଇକ୍ଲିଂ ଟିପ୍ସ:",
    scan_another: "ଅନ୍ୟ ଏକ ଆଇଟମ୍ ସ୍କାନ୍ କରନ୍ତୁ",
    join_title: "BINIFY ରେ ଯୋଗ ଦିଅନ୍ତୁ",
    join_desc: "ଆପଣଙ୍କର ଆକାଉଣ୍ଟ୍ ତିଆରି କରନ୍ତୁ |",
    username: "ୟୁଜର୍ ନେମ୍",
    email_addr: "ଇମେଲ୍ ଠିକଣା",
    secure_pass: "ପାସୱାର୍ଡ",
    create_acc: "ଆକାଉଣ୍ଟ୍ ତିଆରି କରନ୍ତୁ",
    already_acc: "ପୂର୍ବରୁ ଆକାଉଣ୍ଟ୍ ଅଛି?",
    sign_in: "ସାଇନ୍ ଇନ୍ କରନ୍ତୁ",
    welcome_back: "ସ୍ୱାଗତ",
    login_desc: "ଆପଣଙ୍କର ଡ୍ୟାସବୋର୍ଡ ବ୍ୟବହାର କରନ୍ତୁ |",
    dont_have_acc: "ଆକାଉଣ୍ଟ୍ ନାହିଁ?",
    sign_up: "ସାଇନ୍ ଅପ୍ କରନ୍ତୁ",
    hero_title: "ସହଜ ରିସାଇକ୍ଲିଂ",
    hero_desc:
      "ଆପଣଙ୍କର ବର୍ଜ୍ୟବସ୍ତୁକୁ ସ୍କାନ୍ କରି ପୃଥିବୀକୁ ସାହାଯ୍ୟ କରନ୍ତୁ | ଆମର AI ଆପଣଙ୍କୁ ଜଣାଇବ ଏହା କେଉଁଠାକୁ ଯିବ |",
    start_scanning: "ସ୍କାନ୍ ଆରମ୍ଭ କରନ୍ତୁ",
    how_it_works: "ଏହା କିପରି କାମ କରେ",
    magic_scan: "ମ୍ୟାଜିକ୍ ସ୍କାନ୍",
    magic_desc: "କ୍ୟାମେରାକୁ କହିଲେ ଆମର AI ସାଙ୍ଗେ ସାଙ୍ଗେ ଚିହ୍ନଟ କରିବ |",
    helpful_tips: "ସହାୟକ ଟିପ୍ସ",
    tips_desc: "କେଉଁ ଡବା ବ୍ୟବହାର କରିବେ ତାହାର ସୂଚନା ପାଆନ୍ତୁ |",
    track_success: "ସଫଳତା ଟ୍ରାକ୍ କରନ୍ତୁ",
    track_desc: "ଆପଣ ପରିବେଶ ପାଇଁ କରୁଥିବା ସଫଳତା ଦେଖନ୍ତୁ |",
    our_mission: "ଆମର ଲକ୍ଷ୍ୟ",
    zero_waste_title: "ଶୂନ୍ୟ ବର୍ଜ୍ୟବସ୍ତୁ ପାଇଁ ବାଟ",
    mission_desc:
      "ଆମେ ବିଶ୍ୱାସ କରୁ ଯେ ଟେକ୍ନୋଲୋଜି ବର୍ଜ୍ୟବସ୍ତୁ ସମସ୍ୟାର ସମାଧାନ କରିପାରିବ |",
    lang_changed: "ଭାଷା ଓଡ଼ିଆକୁ ପରିବର୍ତ୍ତିତ ହେଲା",
    mission_bullet_footprint: "ପରିବେଶ ପ୍ରଦୂଷଣ ହ୍ରାସ କରିବା",
    mission_bullet_communities: "ରିସାଇକ୍ଲିଂ ବିଷୟରେ ଶିକ୍ଷା ଦେବା",
    mission_bullet_collection: "ବର୍ଜ୍ୟବସ୍ତୁ ସଂଗ୍ରହକୁ ସୁଧାରିବା",
    placeholder_username: "ଉଦାହରଣ: operator_alex",
    placeholder_email: "name@binify.ai",
    placeholder_fullname: "Alexander Smith",
    placeholder_password: "••••••••",
    placeholder_username_login: "ୟୁଜର୍ ନେମ୍ ଦିଅନ୍ତୁ",
  },
  pa: {
    // Punjabi
    active: "ਸਰਗਰਮ",
    detected_type: "ਕੂੜਾ ਸ਼੍ਰੇਣੀ",
    confidence: "ਅਨੁਮਾਨ ਭਰੋਸਾ",
    detected_at: "ਸਮੇਂ ਤੇ",
    bin_status: "ਬਿਨ ਸਥਿਤੀ",
    bin_full_msg: " ਬਿਨ ਜਲਦੀ ਭਰ ਜਾਵੇਗਾ (~",
    manual_override: "ਸ਼੍ਰੇਣੀ ਸੁਧਾਰੋ",
    wrong_result: "ਗਲਤ ਨਤੀਜਾ? ਸਹੀ ਚੁਣੋ",
    heatmap_toggle: "AI ਵਿਆਖਿਆ",
    nav_dashboard: "ਡੈਸ਼ਬੋਰਡ",
    nav_history: "ਸਕੈਨ ਇਤਿਹਾਸ",
    nav_settings: "ਸੈਟਿੰਗਾਂ",
    footer_desc: "AI ਰਾਹੀਂ ਕੂੜਾ ਪ੍ਰਬੰਧਨ ਵਿੱਚ ਕ੍ਰਾਂਤੀ।",
    footer_nav: "ਨੇਵੀਗੇਸ਼ਨ",
    footer_resources: "ਸਰੋਤ",
    footer_contact: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    add_bin: "ਨਵਾਂ ਬਿਨ ਜੋੜੋ",
    total_scans: "ਕੁੱਲ ਸਕੈਨ",
    ai_accuracy: "AI ਸ਼ੁੱਧਤਾ",
    carbon_diverted: "ਕਾਰਬਨ ਬਚਤ",
    trees_saved: "ਬਚਾਏ ਗਏ ਰੁੱਖ",
    energy_saved: "ਬਚਾਈ ਗਈ ਊਰਜਾ",
    sys_status: "ਸਿਸਟਮ ਦੀ ਸਥਿਤੀ",
    sys_updates: "ਸਿਸਟਮ ਅੱਪਡੇਟ",
    hide_all: "ਸਭ ਨੂੰ ਛੁਪਾਓ",
    history_title: "ਇਤਿਹਾਸ / ਲੌਗਸ",
    recent_logs: "ਤਾਜ਼ਾ ਲੌਗਸ",
    export_logs: "ਲੌਗਸ ਡਾਊਨਲੋਡ ਕਰੋ",
    col_date: "ਮਿਤੀ",
    col_time: "ਸਮਾਂ",
    col_type: "ਕੂੜੇ ਦੀ ਕਿਸਮ",
    col_conf: "ਸ਼ੁੱਧਤਾ",
    col_bin: "ਬਿਨ ਅਸਾਈਨਮੈਂਟ",
    no_records: "ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ ਮਿਲਿਆ। ਇਤਿਹਾਸ ਦੇਖਣ ਲਈ ਸਕੈਨ ਸ਼ੁਰੂ ਕਰੋ!",
    settings_title: "ਸਿਸਟਮ ਸੈਟਿੰਗਾਂ",
    account_profile: "ਖਾਤਾ ਪ੍ਰੋਫਾਈਲ",
    quick_avatar: "ਅਵਤਾਰ ਚੋਣ:",
    full_name: "ਪੂਰਾ ਨਾਮ",
    emp_id: "ਕਰਮਚਾਰੀ ਆਈਡੀ",
    scanner_pref: "ਸਕੈਨਰ ਤਰਜੀਹਾਂ",
    ai_sens: "AI ਸੰਵੇਦਨਸ਼ੀਲਤਾ",
    video_device: "ਵੀਡੀਓ ਇਨਪੁਟ ਡਿਵਾਈਸ",
    notifications: "ਸੂਚਨਾਵਾਂ",
    sound_alerts: "ਧੁਨੀ ਚੇਤਾਵਨੀਆਂ",
    sound_desc: "ਜਦੋਂ ਬਿਨ ਭਰ ਜਾਂਦਾ ਹੈ ਤਾਂ ਬੀਪ",
    ai_speech: "AI ਨਤੀਜਾ ਭਾਸ਼ਣ",
    ai_speech_desc: "ਪਛਾਣੀਆਂ ਸਮੱਗਰੀਆਂ ਦੀ ਘੋਸ਼ਣਾ ਕਰੋ",
    save_changes: "ਸਾਰੇ ਬਦਲਾਅ ਸੁਰੱਖਿਅਤ ਕਰੋ",
    bin_full: "ਭਰਿਆ ਹੋਇਆ",
    bin_prediction_prefix: "ਅਨੁਮਾਨ: ~",
    bin_action_required: "⚠ ਕਾਰਵਾਈ ਦੀ ਲੋੜ ਹੈ",
    hours: "ਘੰਟੇ",
    add: "ਜੋੜੋ",
    clear: "ਸਾਫ਼ ਕਰੋ",
    scanner_title: "AI ਕੂੜਾ ਸਕੈਨਰ",
    scanner_desc:
      "ਕੂੜੇ ਦੀ ਸ਼੍ਰੇਣੀ ਦੀ ਪਛਾਣ ਕਰਨ ਅਤੇ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਇੱਕ ਚਿੱਤਰ ਅਪਲੋਡ ਕਰੋ।",
    drag_drop: "ਆਪਣਾ ਚਿੱਤਰ ਇੱਥੇ ਖਿੱਚੋ ਅਤੇ ਛੱਡੋ",
    or_click: "ਜਾਂ ਆਪਣੇ ਡਿਵਾਈਸ ਤੋਂ ਬ੍ਰਾਊਜ਼ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ",
    browse_files: "ਫਾਈਲਾਂ ਬ੍ਰਾਊਜ਼ ਕਰੋ",
    analyze_image: "ਚਿੱਤਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    analyzing: "AI ਰਚਨਾ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...",
    detected: "ਪਛਾਣ ਕੀਤੀ ਗਈ",
    disposal_instr: "ਨਿਪਟਾਰੇ ਦੀਆਂ ਹਦਾਇਤਾਂ:",
    recycling_tips: "ਰੀਸਾਈਕਲਿੰਗ ਸੁਝਾਅ:",
    scan_another: "ਕੋਈ ਹੋਰ ਆਈਟਮ ਸਕੈਨ ਕਰੋ",
    join_title: "BINIFY ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    join_desc:
      "ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ। ਸ਼ਾਮਲ ਹੋਣ ਤੇ ਤੁਹਾਡੀ ਕਰਮਚਾਰੀ ਆਈਡੀ ਆਪਣੇ ਆਪ ਦਿੱਤੀ ਜਾਵੇਗੀ।",
    username: "ਯੂਜ਼ਰਨਾਮ",
    email_addr: "ਈਮੇਲ ਪਤਾ",
    secure_pass: "ਸੁਰੱਖਿਅਤ ਪਾਸਵਰਡ",
    create_acc: "ਖਾਤਾ ਬਣਾਓ",
    already_acc: "ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?",
    sign_in: "ਸਾਈਨ ਇਨ ਕਰੋ",
    welcome_back: "ਜੀ ਆਇਆਂ ਨੂੰ",
    login_desc: "ਆਪਣੇ ਕੂੜਾ ਪ੍ਰਬੰਧਨ ਡੈਸ਼ਬੋਰਡ ਤੱਕ ਪਹੁੰਚ ਕਰੋ।",
    dont_have_acc: "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
    sign_up: "ਹੁਣੇ ਸਾਈਨ ਅੱਪ ਕਰੋ",
    hero_title: "ਸਮਾਰਟ ਰੀਸਾਈਕਲਿੰਗ ਹੁਣ ਆਸਾਨ",
    hero_desc:
      "ਕੂੜੇ ਨੂੰ ਸਕੈਨ ਕਰਕੇ ਸਾਡੇ ਗ੍ਰਹਿ ਦੀ ਮਦਦ ਕਰੋ। ਸਾਡਾ AI ਤੁਹਾਨੂੰ ਦੱਸਦਾ ਹੈ ਕਿ ਇਹ ਕਿੱਥੇ ਜਾਂਦਾ ਹੈ।",
    start_scanning: "ਸਕੈਨ ਸ਼ੁਰੂ ਕਰੋ",
    how_it_works: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    magic_scan: "ਮੈਜਿਕ ਸਕੈਨ",
    magic_desc:
      "ਬਸ ਆਪਣੀ ਆਈਟਮ ਕੈਮਰੇ ਨੂੰ ਦਿਖਾਓ, ਅਤੇ ਸਾਡਾ AI ਇਸਨੂੰ ਤੁਰੰਤ ਪਛਾਣ ਲਵੇਗਾ।",
    helpful_tips: "ਮਦਦਗਾਰ ਟਿਪਸ",
    tips_desc: "ਕੂੜੇ ਲਈ ਕਿਹੜਾ ਬਿਨ ਵਰਤਣਾ ਹੈ, ਇਸ ਬਾਰੇ ਸਪੱਸ਼ਟ ਨਿਰਦੇਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ।",
    track_success: "ਸਫਲਤਾ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ",
    track_desc: "ਦੇਖੋ ਕਿ ਤੁਸੀਂ ਹਰ ਰੋਜ਼ ਗ੍ਰਹਿ 'ਤੇ ਕੀ ਸਕਾਰਾਭਮਕ ਪ੍ਰਭਾਵ ਪਾ ਰਹੇ ਹੋ।",
    our_mission: "ਸਾਡਾ ਮਿਸ਼ਨ",
    zero_waste_title: "ਜ਼ੀਰੋ ਵੇਸਟ ਲਈ ਰਾਹ ਪੱਧਰਾ ਕਰਨਾ",
    mission_desc:
      "ਅਸੀਂ ਮੰਨਦੇ ਹਾਂ ਕਿ ਤਕਨਾਲੋਜੀ ਕੂੜੇ ਦੇ ਸੰਕਟ ਨੂੰ ਹੱਲ ਕਰਨ ਦੀ ਕੁੰਜੀ ਹੈ।",
    lang_changed: "ਭਾਸ਼ਾ ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲ ਦਿੱਤੀ ਗਈ ਹੈ",
    mission_bullet_footprint: "ਵਾਤਾਵਰਣ ਦੇ ਪੈਰਾਂ ਦੇ ਨਿਸ਼ਾਨ ਨੂੰ ਘਟਾਉਣਾ",
    mission_bullet_communities: "ਰੀਸਾਈਕਲਿੰਗ 'ਤੇ ਭਾਈਚਾਰਿਆਂ ਨੂੰ ਸਿੱਖਿਅਤ ਕਰਨਾ",
    mission_bullet_collection: "ਕੂੜਾ ਇਕੱਠਾ ਕਰਨ ਦੇ ਰੂਟਾਂ ਨੂੰ ਅਨੁਕੂਲ ਬਣਾਉਣਾ",
    placeholder_username: "ਉਦਾਹਰਨ: operator_alex",
    placeholder_email: "name@binify.ai",
    placeholder_fullname: "Alexander Smith",
    placeholder_password: "••••••••",
    placeholder_username_login: "ਯੂਜ਼ਰਨਾਮ ਦਰਜ ਕਰੋ",
  },
  te: {
    // Telugu
    active: "క్రియాశీల",
    detected_type: "వ్యర్థాల వర్గం",
    detected_at: "సమయంలో",
    bin_status: "బిన్ స్థితి",
    bin_full_msg: " బిన్ త్వరలో నిండిపోతుంది (~",
    manual_override: "వర్గాన్ని సవరించండి",
    wrong_result: "తప్పు ఫలితమా? సరైనది ఎంచుకోండి",
    heatmap_toggle: "AI వివరించండి",
    nav_dashboard: "డ్యాష్‌బోర్డ్",
    nav_history: "స్కాన్ చరిత్ర",
    nav_settings: "సిస్టమ్ సెట్టింగులు",
    footer_desc: "AI ద్వారా వ్యర్థాల నిర్వహణలో విప్లవం.",
    footer_nav: "నావిగేషన్",
    footer_resources: "వనరులు",
    footer_contact: "మమ్మల్ని సంప్రదించండి",
    add_bin: "కొత్త బిన్ జోడించు",
    total_scans: "మొత్తం స్కాన్‌లు",
    ai_accuracy: "AI ఖచ్చితత్వం",
    carbon_diverted: "కార్బన్ ఆదా",
    trees_saved: "కాపాడిన చెట్లు",
    energy_saved: "ఆదా చేసిన శక్తి",
    sys_status: "సిస్టమ్ స్థితి",
    sys_updates: "సిస్టమ్ అప్‌డేట్లు",
    hide_all: "అన్నీ దాచు",
    history_title: "చరిత్ర / లాగ్స్",
    recent_logs: "ఇటీవలి లాగ్స్",
    export_logs: "లాగ్స్ డౌన్‌లోడ్",
    col_date: "తేదీ",
    col_time: "సమయం",
    col_type: "వ్యర్థాల రకం",
    col_conf: "ఖచ్చితత్వం",
    col_bin: "బిన్ కేటాయింపు",
    no_records:
      "రికార్డులు ఏవీ లేవు. చరిత్రను చూడటానికి స్కాన్ చేయడం ప్రారంభించండి!",
    settings_title: "సిస్టమ్ సెట్టింగ్లు",
    account_profile: "ఖాతా ప్రొఫైల్",
    quick_avatar: "అవతార్ ఎంపిక:",
    full_name: "పూర్తి పేరు",
    emp_id: "ఎంప్లాయీ ఐడి",
    scanner_pref: "స్కానర్ ప్రాధాన్యతలు",
    ai_sens: "AI సున్నితత్వం",
    video_device: "వీడియో ఇన్‌పుట్ పరికరం",
    notifications: "నోటిఫికేషన్‌లు",
    sound_alerts: "శబ్ద హెచ్చరికలు",
    sound_desc: "బిన్ నిండినప్పుడు శబ్దం చేస్తుంది",
    ai_speech: "AI ఫలిత ప్రసంగం",
    ai_speech_desc: "గుర్తించిన పదార్థాలను ప్రకటించండి",
    save_changes: "మార్పులను సేవ్ చేయండి",
    bin_full: "నిండింది",
    bin_prediction_prefix: "అంచనా: ~",
    bin_action_required: "⚠ చర్య అవసరం",
    hours: "గంటలు",
    add: "జోడించు",
    clear: "ఖాళీ చేయి",
    scanner_title: "AI వ్యర్థాల స్కానర్",
    scanner_desc:
      "వ్యర్థాల రకాన్ని గుర్తించడానికి మరియు చిట్కాలను పొందడానికి చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    drag_drop: "చిత్రాన్ని ఇక్కడ లాగండి",
    or_click: "లేదా మీ పరికరం నుండి ఎంచుకోండి",
    browse_files: "ఫైళ్ళను బ్రౌజ్ చేయండి",
    analyze_image: "విశ్లేషించు",
    analyzing: "AI విశ్లేషిస్తోంది...",
    detected: "గుర్తించబడింది",
    disposal_instr: "విసర్జన సూచనలు:",
    recycling_tips: "రీసైక్లింగ్ చిట్కాలు:",
    scan_another: "మరో వస్తువును స్కాన్ చేయండి",
    join_title: "BINIFY లో చేరండి",
    join_desc:
      "మీ ఖాతాను సృష్టించండి. మీరు చేరినప్పుడు ఎంప్లాయీ ఐడి ఆటోమేటిక్‌గా కేటాయించబడుతుంది.",
    username: "యూజర్ నేమ్",
    email_addr: "ఈమెయిల్ చిరునామా",
    secure_pass: "పాస్వర్డ్",
    create_acc: "ఖాతాను సృష్టించండి",
    already_acc: "ఇప్పటికే ఖాతా ఉందా?",
    sign_in: "సైన్ ఇన్ చేయండి",
    welcome_back: "మళ్ళీ స్వాగతం",
    login_desc: "మీ వ్యర్థాల నిర్వహణ డ్యాష్‌బోర్డ్‌ను యాక్సెస్ చేయండి.",
    dont_have_acc: "ఖాతా లేదా?",
    sign_up: "ఇప్పుడే సైన్ అప్ చేయండి",
    hero_title: "స్మార్ట్ రీసైక్లింగ్ సులభం",
    hero_desc:
      "మీ వ్యర్థాలను స్కాన్ చేయడం ద్వారా మన భూమికి సహాయం చేయండి. అది ఎక్కడికి వెళ్లాలో మా AI మీకు చెబుతుంది.",
    start_scanning: "స్కాన్ ప్రారంభించండి",
    how_it_works: "ఇది ఎలా పని చేస్తుంది",
    magic_scan: "మ్యాజిక్ స్కాన్",
    magic_desc:
      "మీ వస్తువును కెమెరాకు చూపిస్తే, మా AI దాన్ని గుర్తించేస్తుంది.",
    helpful_tips: "ఉపయోగకరమైన చిట్కాలు",
    tips_desc: "ఏ బిన్ ఉపయోగించాలో స్పష్టమైన సూచనలను పొందండి.",
    track_success: "విజయాన్ని ట్రాక్ చేయండి",
    track_desc: "మీరు భూమిపై ప్రతిరోజూ చూపే సానుకూల ప్రభావాన్ని చూడండి.",
    our_mission: "మా లక్ష్యం",
    zero_waste_title: "జీరో వేస్ట్ వైపు అడుగులు",
    mission_desc:
      "టెక్నాలజీ ద్వారా వ్యర్థాల సమస్యను పరిష్కరించవచ్చని మేము నమ్ముతున్నాము.",
    lang_changed: "భాష తెలుగులోకి మార్చబడింది",
    mission_bullet_footprint: "పర్యావరణ ప్రభావాన్ని తగ్గించడం",
    mission_bullet_communities: "రీసైక్లింగ్ పై అవగాహన కల్పించడం",
    mission_bullet_collection: "వ్యర్థాల సేకరణ మార్గాలను మెరుగుపరచడం",
    placeholder_username: "ఉదా: operator_alex",
    placeholder_email: "name@binify.ai",
    placeholder_fullname: "Alexander Smith",
    placeholder_password: "••••••••",
    placeholder_username_login: "యూజర్ నేమ్ నమోదు చేయండి",
  },
};

let currentLang = "en";

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icon = type === "success" ? "fa-check-circle" : "fa-info-circle";
  toast.innerHTML = `<i class="fas ${icon}" style="color: ${type === "success" ? "var(--primary)" : "var(--accent)"}"></i> <span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Notification & System Intelligence Engine
const NotificationSystem = {
  items: [],

  add: function (title, message, type = "info") {
    const list = document.getElementById("notif-items-list");
    const badge = document.getElementById("notif-badge");
    if (!list) return;

    // Remove empty state if present
    const emptyState = list.querySelector(".notif-empty-state");
    if (emptyState) emptyState.remove();

    const id = Date.now();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const item = { id, title, message, type, time: timeStr };
    this.items.unshift(item);
    if (this.items.length > 15) this.items.pop(); // Keep last 15

    const itemEl = document.createElement("div");
    itemEl.className = `notif-item notif-${type}`;
    itemEl.innerHTML = `
        <div class="notif-icon"><i class="fas ${this.getIcon(type)}"></i></div>
        <div class="notif-content">
            <div class="notif-title">${title}</div>
            <div class="notif-msg">${message}</div>
            <span class="notif-time">${timeStr}</span>
        </div>
    `;

    list.prepend(itemEl);
    this.updateBadge();
    
    // If it's an error/warning, show a toast too
    if (type === "error" || type === "warning") {
        showToast(title, type);
    }
  },

  getIcon: function(type) {
    const icons = {
        info: "fa-info-circle",
        warning: "fa-exclamation-triangle",
        error: "fa-times-circle",
        success: "fa-check-circle",
        sys: "fa-microchip"
    };
    return icons[type] || icons.info;
  },

  updateBadge: function() {
    const badge = document.getElementById("notif-badge");
    if (!badge) return;
    const count = this.items.length;
    if (count > 0) {
        badge.innerText = count > 9 ? "9+" : count;
        badge.style.display = "flex";
    } else {
        badge.style.display = "none";
    }
  },

  clearAll: function() {
    this.items = [];
    const list = document.getElementById("notif-items-list");
    if (list) {
        list.innerHTML = `
            <div class="notif-empty-state">
                <i class="fas fa-bell-slash"></i>
                <p>Your system is quiet. No new alerts.</p>
            </div>
        `;
    }
    this.updateBadge();
    showToast("All notifications cleared", "info");
  },

  startSystemIntelligence: function() {
    // Only real system events now
    this.add("System Online", "BINIFY Intelligent OS initialized and ready.", "success");
    
    // Simulate Global Activity Feed
    this.startGlobalFeed();
  },

  startGlobalFeed: function() {
    const hubCities = ['London', 'Mumbai', 'New York', 'Singapore', 'Berlin', 'Tokyo', 'Dubai'];
    const materials = ['Plastic Bottle', 'Cardboard Box', 'Metal Can', 'Organic Waste', 'Glass Container', 'E-Waste Component'];
    const feed = document.getElementById('live-feed-items');
    if (!feed) return;

    setInterval(() => {
        const city = hubCities[Math.floor(Math.random() * hubCities.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        const nodeId = Math.floor(Math.random() * 99) + 1;
        const confidence = (Math.random() * 10 + 89).toFixed(1);
        
        const item = document.createElement('div');
        item.className = 'feed-item';
        item.style = 'display: flex; gap: 1rem; align-items: center; opacity: 0.5; font-size: 0.8rem; animation: slideIn 0.5s ease-out;';
        item.innerHTML = `
            <div style="width: 6px; height: 6px; background: #10b981; border-radius: 50%; box-shadow: 0 0 5px #10b981;"></div>
            <span>Global_Node_${nodeId}: ${material} identified (${confidence}%) - ${city} Hub</span>
        `;
        
        feed.prepend(item);
        if (feed.children.length > 5) feed.lastElementChild.remove();
    }, 4500); // New event every 4.5 seconds
  },

  checkBinLevels: function (bins) {
    bins.forEach((bin) => {
      // Only add if not already present to avoid spam
      const alreadyNotified = this.items.some(item => item.title.includes(bin.name));
      
      if (bin.percent >= 90 && !alreadyNotified) {
        this.add(
          `${bin.name} Critical Status`,
          `${bin.name} bin is at ${bin.percent}% capacity. Immediate clearing required.`,
          "error",
        );
        // Voice Alert
        if (window.speechSynthesis) {
           const alertMsg = new SpeechSynthesisUtterance(`Attention. The ${bin.name} bin is nearly full.`);
           window.speechSynthesis.speak(alertMsg);
        }
      } else if (bin.percent >= 75 && bin.percent < 90 && !alreadyNotified) {
        this.add(
          `${bin.name} Capacity Alert`,
          `${bin.name} bin is reaching high capacity (${bin.percent}%).`,
          "warning",
        );
      }
    });
  },
};

function dismissNotification(el) {
  el.style.opacity = "0";
  el.style.transform = "translateX(20px)";
  setTimeout(() => {
    el.remove();
    if (
      document.getElementById("alert-items-container").children.length === 0
    ) {
      // Optional: show "No new updates" message
    }
  }, 400);
}

function clearAllNotifications() {
    NotificationSystem.clearAll();
}

// Scan Portal Logic
function triggerFileUpload() {
  document.getElementById("scan-input").click();
}

// Multi-Camera Management
let availableCameras = [];
let currentCameraIndex = 0;

// Restore Webcam setup
async function setupWebcam(deviceId = null) {
  const statusText = document.getElementById("scanning-status");
  const uiCanvas = document.getElementById("ui-canvas");

  if (!window.isSecureContext) {
    showToast(
      "Camera access requires a secure connection (localhost or HTTPS).",
      "error",
    );
    if (statusText) {
      statusText.innerHTML = `<i class="fas fa-shield-alt"></i> INSECURE CONTEXT`;
      statusText.style.color = "#ef4444";
      statusText.style.borderColor = "#ef4444";
    }
    return;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showToast("Your browser does not support camera access", "error");
    return;
  }

  // Stop current stream if it exists
  if (webcamElement && webcamElement.srcObject) {
    webcamElement.srcObject.getTracks().forEach(track => track.stop());
  }

  try {
    const constraints = {
      video: deviceId ? { deviceId: { exact: deviceId } } : {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "environment",
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    if (webcamElement) {
      webcamElement.srcObject = stream;
      webcamElement.style.opacity = "1";
      webcamElement.onloadedmetadata = () => {
        webcamElement.play().catch((e) => console.error("Play error:", e));
        
        // Auto-refresh resolutions in HUD
        const resText = document.getElementById('hud-res');
        if (resText) resText.innerText = `${webcamElement.videoWidth}x${webcamElement.videoHeight}`;
      };

      if (statusText) {
        statusText.innerHTML = `<i class="fas fa-satellite-dish"></i> LIVE FEED ACTIVE`;
        statusText.style.color = "var(--primary)";
        statusText.style.borderColor = "var(--primary)";
      }

      // Refresh camera list for switching
      const devices = await navigator.mediaDevices.enumerateDevices();
      availableCameras = devices.filter(d => d.kind === 'videoinput');
      
      // Update camera switch button visibility
      const switchBtn = document.getElementById('camera-switch-btn');
      if (switchBtn) switchBtn.style.display = availableCameras.length > 1 ? 'flex' : 'none';

      // Check for Flash/Torch support
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities ? track.getCapabilities() : {};
      const flashBtn = document.getElementById('flash-btn');
      if (flashBtn) {
          flashBtn.style.display = capabilities.torch ? 'flex' : 'none';
      }
    }
  } catch (err) {
    console.error("Camera Setup Error:", err);
    let msg = "Camera error: " + err.message;
    if (
      err.name === "NotAllowedError" ||
      err.name === "PermissionDeniedError"
    ) {
      msg =
        "Access Denied. Click the Lock icon 🔒 in the URL bar to allow camera access.";
    }
    showToast(msg, "error");

    if (webcamElement) {
      webcamElement.style.opacity = "0.3";
      if (statusText) {
        statusText.innerHTML = `<i class="fas fa-video-slash"></i> CAMERA BLOCKED`;
        statusText.style.color = "#ef4444";
        statusText.style.borderColor = "#ef4444";
      }
    }
  }
}

async function cycleCamera() {
    if (availableCameras.length < 2) return;
    currentCameraIndex = (currentCameraIndex + 1) % availableCameras.length;
    const deviceId = availableCameras[currentCameraIndex].deviceId;
    showToast("System: Switching Lens...", "info");
    await setupWebcam(deviceId);
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  selectedFile = file;
  const reader = new FileReader();
  reader.onload = function (e) {
    const preview = document.getElementById("image-preview");
    preview.src = e.target.result;
    preview.style.display = "block";

    // Hide webcam feed when showing file preview
    if (webcamElement) webcamElement.style.display = "none";

    // Update button text to reflect action
    const scanBtn = document.getElementById("scan-btn");
    if (scanBtn) {
      scanBtn.innerHTML = `<i class="fas fa-search"></i> ANALYZE UPLOADED IMAGE`;
      scanBtn.style.background = "var(--accent)";
    }

    showToast("Image loaded for analysis", "info");
  };
  reader.readAsDataURL(file);
}

let isLiveScanning = false;
let scanInterval = null;

function performLiveScan() {
  // If a file is selected, prioritize analyzing that file
  if (selectedFile) {
    processClassification(selectedFile);
    return;
  }

  // Otherwise toggle live scanning
  if (isLiveScanning) {
    stopLiveScanning();
  } else {
    startLiveScanning();
  }
}

function startLiveScanning() {
  const scannerArea = document.getElementById("scanner-area");
  const statusText = document.getElementById("scanning-status");
  const scanBtn = document.getElementById("scan-btn");

  if (webcamElement) webcamElement.style.display = "block";

  isLiveScanning = true;
  scannerArea.classList.add("scanning");
  if (statusText) {
    statusText.innerHTML = `<i class="fas fa-sync fa-spin"></i> SCANNING IN PROGRESS...`;
    statusText.style.color = "#10b981";
    statusText.style.borderColor = "#10b981";
  }

  if (scanBtn) {
    scanBtn.innerHTML = `<i class="fas fa-stop"></i> STOP SCANNER`;
    scanBtn.style.background = "#ef4444";
  }

  showToast("Capturing material details...", "info");

  // One-shot scan instead of interval
  if (scanInterval) clearInterval(scanInterval);
  runBackgroundScan();

  // Stop scanning after a short delay to match animation
  setTimeout(() => {
    stopLiveScanning();
  }, 1500);
}

function stopLiveScanning() {
  const scannerArea = document.getElementById("scanner-area");
  const statusText = document.getElementById("scanning-status");
  const preview = document.getElementById("image-preview");
  const scanBtn = document.getElementById("scan-btn");

  isLiveScanning = false;
  if (scanInterval) clearInterval(scanInterval);
  if (scannerArea) scannerArea.classList.remove("scanning");
  if (preview) preview.style.display = "none";
  clearUIOverlay();

  if (statusText) {
    statusText.innerHTML = `<i class="fas fa-satellite-dish"></i> LIVE FEED ACTIVE`;
    statusText.style.color = "var(--primary)";
    statusText.style.borderColor = "var(--primary)";
  }

  if (scanBtn) {
    scanBtn.innerHTML = `<i class="fas fa-qrcode"></i> SCAN MATERIAL`;
    scanBtn.style.background = "var(--primary)";
  }

  showToast("Scanner paused", "info");
}

function runBackgroundScan() {
  if (!isLiveScanning || !webcamElement) return;

  // Ensure video stream is valid
  if (webcamElement.readyState < 2 || !webcamElement.videoWidth) return;

  // Visual feedback: brief flash
  const scannerArea = document.getElementById("scanner-area");
  if (scannerArea) {
    scannerArea.classList.add("animate-flash");
    setTimeout(() => scannerArea.classList.remove("animate-flash"), 100);
  }

  const context = canvasElement.getContext("2d");
  canvasElement.width = webcamElement.videoWidth;
  canvasElement.height = webcamElement.videoHeight;
  context.drawImage(
    webcamElement,
    0,
    0,
    canvasElement.width,
    canvasElement.height,
  );

  canvasElement.toBlob((blob) => {
    const file = new File([blob], "live_frame.jpg", { type: "image/jpeg" });
    const formData = new FormData();
    formData.append("file", file);

    fetch("/classify", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Update UI with results
        displayDashboardResult(data);

        // Draw bounding boxes on UI canvas
        if (data.detections) {
          drawDetections(data.detections);
        } else if (data.bbox) {
          drawDetections([{bbox: data.bbox, color: data.color || "var(--primary)", title: data.title}]);
        }

        saveToHistory(data);

        // NEW: Refresh bins and speak result
        renderBins();
        speakResult(data.title);
      })
      .catch((err) => {
        console.error("Classification error:", err);
        showToast("Classification failed", "error");
      });
  }, "image/jpeg");
}

function clearUIOverlay() {
  const uiCanvas = document.getElementById("ui-canvas");
  if (uiCanvas) {
    const ctx = uiCanvas.getContext("2d");
    ctx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
  }
}

function resetScanner() {
  selectedFile = null;
  const preview = document.getElementById("image-preview");
  const scanBtn = document.getElementById("scan-btn");
  const webcam = document.getElementById("webcam");

  if (preview) {
    preview.src = "";
    preview.style.display = "none";
  }

  if (webcam) webcam.style.display = "block";

  if (scanBtn) {
    scanBtn.innerHTML = `<i class="fas fa-qrcode"></i> SCAN MATERIAL`;
    scanBtn.style.background = "var(--primary)";
  }

  const scannerContent = document.querySelector(".scanner-content");
  if (scannerContent) scannerContent.style.opacity = "1";

  const scanInput = document.getElementById("scan-input");
  if (scanInput) scanInput.value = "";

  // Reset result panel
  const idleMsg = document.getElementById("idle-message");
  const resultCon = document.getElementById("result-content");
  if (idleMsg) idleMsg.style.display = "block";
  if (resultCon) resultCon.style.display = "none";

  // Reset Detector page (detect.html)
  const dropArea = document.getElementById("drop-area");
  const previewContainer = document.getElementById("preview-container");
  const resultDisplay = document.getElementById("result-display");
  const loading = document.getElementById("loading-spinner");

  if (dropArea) dropArea.style.display = "block";
  if (previewContainer) previewContainer.style.display = "none";
  if (resultDisplay) resultDisplay.style.display = "none";
  if (loading) loading.style.display = "none";

  showToast("Scanner reset", "info");
}

async function clearHistory() {
  if (
    !confirm(
      "Are you sure you want to permanently delete all scan history? This action cannot be undone.",
    )
  )
    return;

  try {
    const response = await fetch("/api/history/clear", { method: "POST" });
    if (response.ok) {
      showToast("History cleared successfully", "success");
      // Refresh table or page
      const body = document.getElementById("history-body");
      if (body) {
        body.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 3rem; color: #6b7280;">${i18n[currentLang].no_records}</td></tr>`;
      } else {
        window.location.reload();
      }
      hydrateDashboard();
    }
  } catch (err) {
    console.error("Error clearing history:", err);
    showToast("Failed to clear history", "error");
  }
}

// Load persisted settings and hydrate UI
document.addEventListener("DOMContentLoaded", () => {
  // Notification Dropdown Toggle
  const notifTrigger = document.getElementById('notification-trigger');
  const notifDropdown = document.getElementById('notif-dropdown');

  if (notifTrigger && notifDropdown) {
    notifTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && e.target !== notifTrigger) {
        notifDropdown.classList.remove('active');
      }
    });
  }

  // Theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    const icon = document.querySelector(".theme-toggle i");
    if (icon)
      icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  // Language
  const savedLang = localStorage.getItem("language") || "en";
  if (savedLang !== "en") {
    const langSelect = document.querySelector(".lang-select");
    if (langSelect) langSelect.value = savedLang;
    changeLanguage(savedLang, false); // Don't toast on initial load
  }

  // Initialize Core Elements
  canvasElement = document.getElementById("canvas");
  webcamElement = document.getElementById("webcam");

  initializeIntelligentFeatures();
  hydrateDashboard();
  renderHistory();
  updateBinPredictions();

  if (webcamElement) {
    setupWebcam();
  }
  initDropArea();
});

async function renderBins() {
  const grid = document.getElementById("bin-grid");
  if (!grid) return;

  try {
    const response = await fetch("/api/bins");
    const weights = await response.json();

    grid.innerHTML = "";
    weights.forEach((bin) => {
      const isFull = bin.percent >= 100;
      // Additional check for notifications
      if (bin.percent >= 90) {
        // We'll call this check in hydrateDashboard to avoid multiple alerts per render
      }
      const card = document.createElement("div");
      card.className = `glass bin-card ${isFull ? "full" : ""}`;
      card.style.position = "relative";
      card.innerHTML = `
                <div class="weight-badge">${bin.kg} kg</div>
                <button class="delete-bin-btn" onclick="deleteBin('${bin.id}')" title="Delete Bin">
                    <i class="fas fa-times"></i>
                </button>
                <div class="bin-header">
                    <h4>${bin.name} Bin</h4>
                    <span style="font-weight: 800; color: ${isFull ? "#ef4444" : "inherit"}">${isFull ? i18n[currentLang].bin_full : bin.percent + "%"}</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${Math.min(bin.percent, 100)}%; background: ${bin.color};"></div>
                </div>
                <div class="bin-actions" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <button class="btn-cta" style="flex: 1; padding: 0.4rem; font-size: 0.75rem; background: var(--primary);" onclick="incrementBin('${bin.id}')">
                        <i class="fas fa-plus"></i> ${i18n[currentLang].add}
                    </button>
                    <button class="btn-cta" style="flex: 1; padding: 0.4rem; font-size: 0.75rem; background: #374151;" onclick="clearBin('${bin.id}')">
                        <i class="fas fa-undo"></i> ${i18n[currentLang].clear}
                    </button>
                </div>
                <p class="bin-prediction" style="margin-top: 0.8rem; font-size: 0.75rem; color: ${isFull ? "#ef4444" : "#6b7280"}; font-weight: 600;">
                    ${isFull ? i18n[currentLang].bin_action_required : `${i18n[currentLang].bin_prediction_prefix}${Math.floor(12 - bin.percent / 10)} ${i18n[currentLang].hours}`}
                </p>
            `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching bins:", err);
  }
}

async function deleteBin(binId) {
  if (!confirm("Are you sure you want to delete this waste category?")) return;
  try {
    await fetch(`/api/bins/delete/${binId}`, { method: "DELETE" });
    showToast("Category removed", "info");
    renderBins();
  } catch (err) {
    console.error("Error deleting bin:", err);
  }
}

function initializeIntelligentFeatures() {
  // Backend takes care of initial data states now
  console.log(
    "System Initialized: All components synced with advanced backend.",
  );
}

async function hydrateDashboard() {
  try {
    const response = await fetch("/api/stats");
    const data = await response.json();

    const totalItemsEl = document.querySelector('[data-type="total-items"]');
    if (totalItemsEl) totalItemsEl.innerText = data.totalItems;

    // Environmental metrics if they exist
    if (document.getElementById("co2-counter"))
      document.getElementById("co2-counter").innerText = data.impact.co2;
    if (document.getElementById("tree-counter"))
      document.getElementById("tree-counter").innerText = data.impact.trees;
    if (document.getElementById("energy-counter"))
      document.getElementById("energy-counter").innerText = data.impact.energy;

    renderBins();

    // Check for bin alerts
    const binsResponse = await fetch("/api/bins");
    const binsData = await binsResponse.json();
    NotificationSystem.checkBinLevels(binsData);
  } catch (err) {
    console.error("Error hydrating dashboard:", err);
  }
}

async function clearBin(binId) {
  try {
    await fetch("/api/bins/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: binId, operation: "clear" }),
    });
    showToast(`Bin cleared!`, "success");
    renderBins();
  } catch (err) {
    console.error("Error clearing bin:", err);
  }
}

async function incrementBin(binId) {
  try {
    await fetch("/api/bins/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: binId, operation: "increment" }),
    });
    showToast(`Manually added item`, "info");
    renderBins();
  } catch (err) {
    console.error("Error incrementing bin:", err);
  }
}

async function addNewBin() {
  const name = prompt("Enter waste category name (e.g., Paper, Glass):");
  if (!name) return;

  const colors = [
    "#60a5fa",
    "#f87171",
    "#34d399",
    "#fbbf24",
    "#a78bfa",
    "#f472b6",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  try {
    await fetch("/api/bins/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        color: randomColor,
        operation: "add",
      }),
    });
    showToast(`New category "${name}" added!`, "success");
    renderBins();
  } catch (err) {
    console.error("Error adding new bin:", err);
  }
}

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const navBottom = document.querySelector(".nav-bottom");
  if (menuBtn && navBottom) {
    menuBtn.addEventListener("click", () => {
      navBottom.classList.toggle("active");
      const icon = menuBtn.querySelector("i");
      icon.className = navBottom.classList.contains("active")
        ? "fas fa-times"
        : "fas fa-bars";
    });
  }
});

function changeLanguage(lang, silent = true) {
  currentLang = lang;
  localStorage.setItem("language", lang);

  // Update text content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang][key]) el.innerText = i18n[lang][key];
  });

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (i18n[lang][key]) el.setAttribute("placeholder", i18n[lang][key]);
  });

  if (silent) showToast(i18n[lang].lang_changed || "Language updated");
  updateDashboardUI();
}

function toggleTheme() {
  const body = document.documentElement;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  const icon = document.querySelector(".theme-toggle i");
  icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// Preloader Handler
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("fade-out");
      // Remove from DOM after transition
      setTimeout(() => {
        preloader.style.display = "none";
      }, 600);
      // Start System Intelligence Engine
      NotificationSystem.startSystemIntelligence();
    }, 500); // Small buffer for smoothness
  }
});

// Impact Metrics are now handled by the backend /api/stats endpoint

function updateBinPredictions() {
  // This function is largely superseded by renderBins, which now generates the prediction text directly.
  // Keeping it here for compatibility if other parts of the code still call it,
  // but its effect on the UI might be minimal or incorrect if renderBins has already run.
  const predictions = {
    plastic: "4 hours",
    organic: "2 hours",
    metal: "1 day",
  };
  document.querySelectorAll(".bin-prediction").forEach((el) => {
    const bin = el.getAttribute("data-bin");
    el.innerText = i18n[currentLang].bin_full_msg + predictions[bin];
  });
}

// selectedFile is declared at the top of the file

// Core Handlers for Detector Page (detect.html)
function handleFiles(files) {
  if (!files || files.length === 0) return;
  const file = files[0];
  selectedFile = file;

  const reader = new FileReader();
  reader.onload = function (e) {
    const preview = document.getElementById("image-preview");
    const dropArea = document.getElementById("drop-area");
    const previewContainer = document.getElementById("preview-container");

    if (preview) preview.src = e.target.result;
    if (dropArea) dropArea.style.display = "none";
    if (previewContainer) previewContainer.style.display = "block";

    showToast("Image loaded successfully", "info");
  };
  reader.readAsDataURL(file);
}

function startScan() {
  if (!selectedFile) {
    showToast("Please select an image first", "warning");
    return;
  }

  const loading = document.getElementById("loading-spinner");
  const previewContainer = document.getElementById("preview-container");
  const resultDisplay = document.getElementById("result-display");

  if (loading) loading.style.display = "block";
  if (previewContainer) previewContainer.style.display = "none";
  if (resultDisplay) resultDisplay.style.display = "none";

  processClassification(selectedFile);
}

function initDropArea() {
  const dropArea = document.getElementById("drop-area");
  if (!dropArea) return;

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(
      eventName,
      () => dropArea.classList.add("dragover"),
      false,
    );
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(
      eventName,
      () => dropArea.classList.remove("dragover"),
      false,
    );
  });

  dropArea.addEventListener(
    "drop",
    (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      handleFiles(files);
    },
    false,
  );
}


function showOverride() {
  const box = document.getElementById("override-box");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

function manualFix(type) {
  const original = document.getElementById("detected-type").innerText;
  const typeLabel = document.getElementById("detected-type");
  if (typeLabel) typeLabel.innerText = type;

  const overrideBox = document.getElementById("override-box");
  if (overrideBox) overrideBox.style.display = "none";

  showToast(`Classification corrected to: ${type}`, "info");

  // Sync correction to backend
  fetch("/api/feedback/manual_override", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ original: original, corrected: type }),
  }).catch((err) => console.error("Feedback error:", err));
}

function exportCSV() {
  const rows = [
    ["Date", "Time", "Waste Type", "Confidence", "Bin"],
    ["Jan 09, 2026", "10:32 AM", "Plastic", "92%", "Bin 01"],
    ["Jan 09, 2026", "10:28 AM", "Organic", "88%", "Bin 03"],
  ];
  let csvContent =
    "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "waste_segregation_logs.csv");
  document.body.appendChild(link);
  link.click();
}

// System Heartbeat with dynamic status simulation
setInterval(() => {
  const dots = document.querySelectorAll(".status-dot");
  const statusText = document.querySelector(".status-text");

  dots.forEach((dot) => {
    dot.style.opacity = dot.style.opacity === "0.5" ? "1" : "0.5";
  });

  // Occasionally simulate a "thinking" or "verifying" state for more realism
  if (
    Math.random() > 0.95 &&
    statusText &&
    !statusText.hasAttribute("data-custom-status")
  ) {
    const originalText = statusText.innerText;
    statusText.innerText = "Analyzing Node...";
    statusText.style.color = "var(--accent)";
    statusText.setAttribute("data-custom-status", "true");
    setTimeout(() => {
      statusText.innerText = originalText;
      statusText.style.color = "";
      statusText.removeAttribute("data-custom-status");
    }, 1500);
  }

  // Rare Operational Alert Simulation
  if (Math.random() > 0.99) {
    const alertMsg = "Critical: Bin 03 Load Sensor Intermittent Connectivity";
    showToast(alertMsg, "warning");
    console.warn(alertMsg);
  }
}, 1000);

// Dynamic Settings Feedback & Real-time Listeners
function initializeDynamicSettings() {
  const thresholdInput = document.querySelector('input[name="ai_threshold"]');
  if (thresholdInput) {
    thresholdInput.addEventListener("input", (e) => {
      const output = e.target.nextElementSibling;
      if (output) output.value = e.target.value + "%";
      // Simulate instant system logic update
      console.log(`AI Threshold dynamically adjusted to: ${e.target.value}%`);
    });
  }
}

// Add to DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // ... other existing init
  initializeDynamicSettings();
});

// The captureImage logic is replaced by startScan in the new portal workflow.

function processClassification(file) {
  const aiPanel = document.getElementById("ai-result-panel");
  const scannerArea = document.getElementById("scanner-area");
  const statusText = document.getElementById("scanning-status");

  if (aiPanel) {
    document.getElementById("idle-message").style.display = "none";
    document.getElementById("result-content").style.display = "none";
    aiPanel.classList.add("glitch");
  }

  if (scannerArea) {
    scannerArea.classList.add("scanning");
    if (statusText)
      statusText.innerHTML = `<i class="fas fa-sync fa-spin"></i> CLASSIFYING...`;
  }

  const formData = new FormData();
  formData.append("file", file);

  fetch("/classify", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        if (scannerArea) scannerArea.classList.remove("scanning");
        if (aiPanel) {
          aiPanel.classList.remove("glitch");
          displayDashboardResult(data);
          
          if (data.detections) {
            drawDetections(data.detections);
          }
        }

        // Detector Page Result (detect.html)
        const loading = document.getElementById("loading-spinner");
        if (loading) loading.style.display = "none";
        displayScannerResult(data);

        // If we were analyzing an uploaded file, reset the selection
        if (selectedFile && !isLiveScanning) {
          // We don't necessarily want to call full resetScanner here
          // because we want to see the result.
          // But we should change the button back.
          const scanBtn = document.getElementById("scan-btn");
          if (scanBtn) {
            scanBtn.innerHTML = `<i class="fas fa-qrcode"></i> SCAN MATERIAL`;
            scanBtn.style.background = "var(--primary)";
          }
          selectedFile = null;
        }

        saveToHistory(data);
      }, 1000);
    })
    .catch((err) => {
      console.error("Classification error:", err);
      if (scannerArea) scannerArea.classList.remove("scanning");
      if (aiPanel) aiPanel.classList.remove("glitch");
      showToast("Scan failed. Please try again.", "error");
    });
}

function displayScannerResult(data) {
  const display = document.getElementById("result-display");
  if (!display) return;

  document.getElementById("result-title").innerText = data.title;
  document.getElementById("confidence-score").innerText =
    `${data.confidence}% Match`;
  document.getElementById("disposal-text").innerText = data.disposal;

  const tipsList = document.getElementById("tips-list");
  tipsList.innerHTML = data.tips
    .map(
      (tip) => `
        <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.8rem;">
            <i class="fas fa-check-circle" style="color: var(--primary); margin-top: 0.3rem;"></i>
            <span>${tip}</span>
        </li>
    `,
    )
    .join("");

  display.style.display = "block";
}

async function saveToHistory(data) {
  // Backend already saved the record during /classify
  // We just need to refresh the UI
  hydrateDashboard();
  renderHistory();
}

async function renderHistory() {
  const body = document.getElementById("history-body");
  if (!body) return;

  try {
    const response = await fetch("/api/history");
    const logs = await response.json();

    if (logs.length === 0) {
      body.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 3rem; color: #6b7280;">${i18n[currentLang].no_records}</td></tr>`;
      return;
    }

    body.innerHTML = logs
      .map(
        (log) => `
            <tr>
                <td>${log.date}</td>
                <td>${log.time}</td>
                <td><span class="badge" style="background: var(--primary); color: white;">${log.type}</span></td>
                <td>${log.confidence}</td>
                <td>${log.bin}</td>
            </tr>
        `,
      )
      .join("");
  } catch (err) {
    console.error("Error rendering history:", err);
  }
}

function exportCSV() {
  // Redirect to backend export endpoint
  window.location.href = "/api/history/export";
}

function drawDetections(detections) {
  const uiCanvas = document.getElementById("ui-canvas");
  if (!uiCanvas || !webcamElement) return;

  const ctx = uiCanvas.getContext("2d");

  // Sync UI canvas size with video
  uiCanvas.width = webcamElement.videoWidth;
  uiCanvas.height = webcamElement.videoHeight;

  ctx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

  detections.forEach(det => {
    const [x, y, w, h] = det.bbox;
    const color = det.color || "var(--primary)";
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 5]);
    ctx.strokeRect(x, y, w, h);

    // Label tag
    ctx.fillStyle = color;
    ctx.fillRect(x, y - 25, 120, 25);
    ctx.fillStyle = "white";
    ctx.font = "bold 12px Inter";
    ctx.fillText(det.title || "AI DETECTED", x + 5, y - 8);
    ctx.setLineDash([]);
  });
}

function displayDashboardResult(data) {
  const content = document.getElementById("result-content");
  const typeLabel = document.getElementById("detected-type");
  const confidenceVal = document.getElementById("confidence-val");
  const timeLabel = document.getElementById("detection-time");
  const iconContainer = document.getElementById("category-icon");
  const gaugeFill = document.querySelector(".gauge-fill");

  // Remove idle message
  const idleMsg = document.getElementById("idle-message");
  if (idleMsg) idleMsg.style.display = "none";

  // Icon Mapping based on category title
  const iconMap = {
    plastic: "fa-bottle-water",
    paper: "fa-newspaper",
    metal: "fa-cubes",
    glass: "fa-wine-glass",
    organic: "fa-leaf",
    electronic: "fa-plug",
  };

  // Find key by title (rough match)
  const titleLower = (data.title || "").toLowerCase();
  let iconClass = "fa-recycle";
  for (const [key, icon] of Object.entries(iconMap)) {
    if (titleLower.includes(key)) {
      iconClass = icon;
      break;
    }
  }

  if (iconContainer) {
    iconContainer.innerHTML = `<i class="fas ${iconClass}"></i>`;
    if (data.color && data.color.startsWith('#')) {
      iconContainer.style.color = data.color;
      iconContainer.style.background = data.color + "15";
    } else {
      iconContainer.style.color = "var(--primary)";
      iconContainer.style.background = "rgba(16, 185, 129, 0.1)";
    }
  }

  // Risk Level Detection
  let riskColor = data.color || "var(--primary)";
  if (data.confidence < 70) riskColor = "#ef4444";
  else if (data.confidence < 85) riskColor = "#f59e0b";

  // Typewriter effect for result
  if (typeLabel) {
    typeLabel.innerText = "";
    let i = 0;
    const text = data.title;
    const interval = setInterval(() => {
      if (text && text[i]) {
        typeLabel.innerText += text[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  }

  if (confidenceVal) {
    confidenceVal.innerText = data.confidence + "%";
    confidenceVal.style.color = riskColor;
  }

  // Confidence Gauge
  if (gaugeFill) {
    const rotation = (data.confidence / 100) * 180;
    gaugeFill.style.transform = `rotate(${rotation}deg)`;
    gaugeFill.style.background = riskColor;
  }

  if (timeLabel) {
    const now = new Date();
    timeLabel.innerHTML = `<span style="color: ${riskColor}; font-weight: 700;">[SECURE SCAN]</span> ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }

  // Update HUD Confidence
  const hudConf = document.getElementById("hud-conf");
  if (hudConf) {
    hudConf.innerText = data.confidence + "%";
    hudConf.style.color = riskColor;
  }

  if (content) content.style.display = "block";

  // Production haptic/audio feedback
  if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
  
  showToast(
    `Production Log: ${data.title} recorded`,
    data.confidence > 70 ? "success" : "warning",
  );

  // Trigger immediate refresh of stats
  hydrateDashboard();
  
  // Real Notification
  NotificationSystem.add(
    "New Item Processed",
    `Identified ${data.title} with ${data.confidence}% accuracy.`,
    data.confidence > 85 ? "success" : "info"
  );
}

document.querySelectorAll(".map-marker").forEach((marker) => {
  marker.addEventListener("click", () => {
    const title = marker.getAttribute("title");
    const isRed = marker.querySelector(".status-red");
    const status = isRed ? "CRITICAL: Bin Full" : "Normal Operation";
    showToast(`${title} - ${status}`, isRed ? "warning" : "success");
  });
});
// --- INTELLIGENT CONVERSATIONAL VOICE SYSTEM ---
function speakResult(title, categoryKey = "dry") {
  if (!window.speechSynthesis) return;

  // Professional enterprise guidance templates
  const templateMap = {
    en: {
        plastic: "Material identified as {item}. Please place it in the BLUE BIN for processing.",
        wet: "Organic waste detected as {item}. Disposal location: GREEN BIN. Thank you for your contribution.",
        dry: "Item identified as {item}. This should be placed in the GRAY DRY WASTE BIN.",
        system: "System optimized. Ready for next material scan."
    },
    hi: {
        plastic: "{item} की पहचान की गई। कृपया इसे नीले कूड़ेदान में डालें।",
        wet: "गीला कचरा {item}। कृपया हरे कूड़ेदान का उपयोग करें।",
        dry: "सूखा कचరా {item}। कृपया ग्रे कूड़ेदान में रखें।"
    },
    or: {
        plastic: "{item} ଚିହ୍ନଟ ହୋଇଛି | ଦୟାକରି ଏହାକୁ ନୀଳ ଡବାରେ ପକାନ୍ତୁ |",
        wet: "{item} ଚିହ୍ନଟ ହୋଇଛି | ଦୟାକରି ସବୁଜ ଡବାରେ ପକାନ୍ତୁ |",
        dry: "{item} ଚିହ୍ନଟ ହୋଇଛି | ଦୟାକରି ଧୂସର ଡବାରେ ପକାନ୍ତୁ |"
    }
    // Add other languages as needed
  };

  let cleanTitle = title
    .replace("Waste", "")
    .replace("(", "")
    .replace(")", "")
    .trim();
    
  const langTemplates = templateMap[currentLang] || templateMap["en"];
  const finalMsg = (langTemplates[categoryKey] || langTemplates["dry"]).replace("{item}", cleanTitle);

  const msg = new SpeechSynthesisUtterance(finalMsg);

  // Match voice to current language settings
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((v) => v.lang.startsWith(currentLang));
  if (voice) msg.voice = voice;

  msg.rate = 1.0;
  msg.pitch = 1.0;
  msg.volume = 0.8;
  
  // Cancel previous speech to avoid overlapping
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

// --- FLASH / TORCH SYSTEM ---
async function toggleFlash() {
    if (!webcamElement || !webcamElement.srcObject) return;
    const track = webcamElement.srcObject.getVideoTracks()[0];
    
    try {
        const capabilities = track.getCapabilities ? track.getCapabilities() : {};
        if (!capabilities.torch) {
            showToast("Flash not supported on this device", "warning");
            return;
        }

        isFlashOn = !isFlashOn;
        await track.applyConstraints({
            advanced: [{ torch: isFlashOn }]
        });
        
        const btn = document.getElementById('flash-btn');
        if (btn) btn.classList.toggle('active', isFlashOn);
        showToast(`Flash ${isFlashOn ? 'ON' : 'OFF'}`, "info");
    } catch (err) {
        console.error("Flash Error:", err);
        showToast("Hardware control error", "error");
    }
}

async function clearHistory() {
  if (!confirm("Are you sure you want to clear all environmental logs? This action cannot be undone.")) return;
  
  try {
    const response = await fetch("/api/history/clear", { method: "POST" });
    if (response.ok) {
      showToast("Environmental logs cleared successfully", "success");
      // If we are on the history page, refresh it
      renderHistory();
    } else {
      showToast("Error clearing logs", "error");
    }
  } catch (err) {
    console.error("Clear history error:", err);
    showToast("System connection error", "error");
  }
}

// Pre-fetch voices
window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
