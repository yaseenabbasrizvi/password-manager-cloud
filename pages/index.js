import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Cloud Password Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cloud Password Manager</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 800px;
            width: 100%;
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            padding: 30px;
            text-align: center;
            color: white;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .content {
            padding: 30px;
        }

        .cloud-status {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
        }

        .cloud-status.offline {
            background: #ffe8e8;
        }

        .cloud-status.online {
            background: #e8f5e8;
        }

        .setup-section, .auth-section {
            text-align: center;
            margin-bottom: 30px;
        }

        .master-password {
            width: 100%;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            margin-bottom: 20px;
            transition: border-color 0.3s;
        }

        .master-password:focus {
            outline: none;
            border-color: #4facfe;
        }

        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.2s;
            margin: 5px;
        }

        .btn:hover {
            transform: translateY(-2px);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .generator-section {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 15px;
        }

        .generator-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .option-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .option-group label {
            font-weight: 600;
            color: #333;
        }

        input[type="range"] {
            width: 100%;
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .generated-password {
            font-family: monospace;
            font-size: 18px;
            background: white;
            padding: 15px;
            border-radius: 10px;
            border: 2px solid #e0e0e0;
            margin-bottom: 20px;
            word-break: break-all;
            min-height: 50px;
            display: flex;
            align-items: center;
        }

        .passwords-section {
            margin-top: 30px;
        }

        .add-password {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #333;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
        }

        .form-group input:focus {
            outline: none;
            border-color: #4facfe;
        }

        .password-list {
            display: grid;
            gap: 15px;
        }

        .password-item {
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
        }

        .password-item:hover {
            border-color: #4facfe;
            box-shadow: 0 5px 15px rgba(79, 172, 254, 0.1);
        }

        .password-info {
            flex: 1;
        }

        .password-info h3 {
            color: #333;
            margin-bottom: 5px;
        }

        .password-info p {
            color: #666;
            font-size: 14px;
        }

        .password-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .btn-small {
            padding: 8px 16px;
            font-size: 14px;
        }

        .btn-copy {
            background: #28a745;
        }

        .btn-delete {
            background: #dc3545;
        }

        .btn-qr {
            background: #6f42c1;
        }

        .hidden {
            display: none;
        }

        .strength-meter {
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            margin-top: 10px;
            overflow: hidden;
        }

        .strength-fill {
            height: 100%;
            transition: width 0.3s, background-color 0.3s;
        }

        .strength-weak { background: #dc3545; }
        .strength-medium { background: #ffc107; }
        .strength-strong { background: #28a745; }

        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s;
            z-index: 1000;
        }

        .toast.show {
            transform: translateX(0);
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .sync-indicator {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 14px;
            display: none;
        }

        @media (max-width: 600px) {
            .generator-options {
                grid-template-columns: 1fr;
            }
            
            .password-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }
            
            .password-actions {
                width: 100%;
                justify-content: flex-end;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>☁️ Cloud Password Manager</h1>
            <p>Secure, encrypted, accessible anywhere</p>
        </div>

        <div class="content">
            <!-- Cloud Status -->
            <div class="cloud-status" id="cloudStatus">
                <span id="statusIcon">🔄</span> <span id="statusText">Connecting to cloud...</span>
            </div>

            <!-- Setup Master Password (First Time) -->
            <div class="setup-section" id="setupSection">
                <h2>🛡️ Setup Master Password</h2>
                <p>Create your master password to secure all your data in the cloud.</p>
                <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
                    ⚠️ This password encrypts your data before sending to cloud. Choose wisely!
                </p>
                <input type="password" id="newMasterPassword" class="master-password" placeholder="Create master password (min 8 characters)">
                <input type="password" id="confirmMasterPassword" class="master-password" placeholder="Confirm master password">
                <button class="btn" onclick="setupMasterPassword()" id="setupBtn">
                    <span id="setupBtnText">Create Master Password</span>
                    <span id="setupLoader" class="loading hidden"></span>
                </button>
            </div>

            <!-- Authentication Section -->
            <div class="auth-section" id="authSection" style="display: none;">
                <h2>🔐 Enter Master Password</h2>
                <input type="password" id="masterPassword" class="master-password" placeholder="Enter your master password">
                <button class="btn" onclick="authenticate()" id="authBtn">
                    <span id="authBtnText">Unlock</span>
                    <span id="authLoader" class="loading hidden"></span>
                </button>
                <button class="btn" onclick="resetAllData()" style="background: #dc3545; margin-top: 10px;">Reset All Data</button>
            </div>

            <!-- Main Application -->
            <div id="mainApp" class="hidden">
                <!-- Password Generator -->
                <div class="generator-section">
                    <h2>🎲 Password Generator</h2>
                    <div class="generator-options">
                        <div class="option-group">
                            <label for="length">Length: <span id="lengthValue">16</span></label>
                            <input type="range" id="length" min="8" max="50" value="16" oninput="updateLength()">
                        </div>
                        <div class="option-group">
                            <div class="checkbox-group">
                                <input type="checkbox" id="uppercase" checked>
                                <label for="uppercase">Uppercase (A-Z)</label>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" id="lowercase" checked>
                                <label for="lowercase">Lowercase (a-z)</label>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" id="numbers" checked>
                                <label for="numbers">Numbers (0-9)</label>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" id="symbols" checked>
                                <label for="symbols">Symbols (!@#$%^&*)</label>
                            </div>
                        </div>
                    </div>
                    <div class="generated-password" id="generatedPassword">Click "Generate Password" to create a new password</div>
                    <div class="strength-meter">
                        <div class="strength-fill" id="strengthFill"></div>
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        <button class="btn" onclick="generatePassword()">Generate Password</button>
                        <button class="btn" onclick="copyToClipboard(document.getElementById('generatedPassword').textContent)">Copy</button>
                    </div>
                </div>

                <!-- Add Password -->
                <div class="add-password">
                    <h2>💾 Save Password</h2>
                    <div class="form-group">
                        <label for="website">Website/Service</label>
                        <input type="text" id="website" placeholder="e.g., gmail.com, facebook.com">
                    </div>
                    <div class="form-group">
                        <label for="username">Username/Email</label>
                        <input type="text" id="username" placeholder="your username or email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="password">
                    </div>
                    <button class="btn" onclick="savePassword()" id="saveBtn">
                        <span id="saveBtnText">Save Password</span>
                        <span id="saveLoader" class="loading hidden"></span>
                    </button>
                </div>

                <!-- Saved Passwords -->
                <div class="passwords-section">
                    <h2>🔑 Saved Passwords (<span id="passwordCount">0</span>)</h2>
                    <button class="btn" onclick="syncPasswords()" style="margin-bottom: 20px;">
                        <span id="syncBtnText">🔄 Sync Now</span>
                        <span id="syncLoader" class="loading hidden"></span>
                    </button>
                    <div class="password-list" id="passwordList">
                        <!-- Passwords will be loaded here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="toast" id="toast"></div>
    <div class="sync-indicator" id="syncIndicator">Syncing...</div>

    <script>
        // ====================================
        // CLOUD CONFIGURATION
        // ====================================
        
        // CHANGE THIS to your Vercel deployment URL
        const API_BASE_URL = 'https://your-password-manager.vercel.app/api';
        
        // Device identification for multi-device support
        const DEVICE_ID = getOrCreateDeviceId();
        
        let masterKey = null;
        let passwords = [];
        let isOnline = navigator.onLine;

        function getOrCreateDeviceId() {
            let deviceId = localStorage.getItem('deviceId');
            if (!deviceId) {
                deviceId = 'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
                localStorage.setItem('deviceId', deviceId);
            }
            return deviceId;
        }

        // ====================================
        // CLOUD API FUNCTIONS
        // ====================================

        async function cloudRequest(endpoint, data = {}) {
            try {
                const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
                        deviceId: DEVICE_ID
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error('Cloud request failed:', error);
                updateCloudStatus(false, 'Connection failed');
                throw error;
            }
        }

        async function checkCloudStatus() {
            try {
                const result = await cloudRequest('/auth', { 
                    action: 'check',
                    masterPassword: 'dummy' 
                });
                
                updateCloudStatus(true, 'Connected');
                
                if (result.isFirstTime) {
                    showSetupSection();
                } else {
                    showAuthSection();
                }
            } catch (error) {
                updateCloudStatus(false, 'Offline mode');
                // Fall back to local storage in offline mode
                checkLocalAuth();
            }
        }

        function updateCloudStatus(online, message) {
            const statusDiv = document.getElementById('cloudStatus');
            const statusIcon = document.getElementById('statusIcon');
            const statusText = document.getElementById('statusText');
            
            isOnline = online;
            statusDiv.className = `cloud-status ${}
      <div dangerouslySetInnerHTML={{
        __html: `
        <!-- Your entire HTML from the cloud password manager artifact -->
        <!-- But change the JavaScript API_BASE_URL line to: -->
        <script>
          const API_BASE_URL = '/api';
          // ... rest of your JavaScript code
        </script>
        `
      }} />
    </>
  )
}