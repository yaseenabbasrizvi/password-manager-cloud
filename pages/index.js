import Head from 'next/head'

export default function Home() {
    return (
        <>
            <Head>
                <title>Cloud Password Manager</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div dangerouslySetInnerHTML={{
                __html: `
<!DOCTYPE html>
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
            <div class="setup-section" id="setupSection" style="display: none;">
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

    <script>
        // ====================================
        // CLOUD CONFIGURATION
        // ====================================
        
        const API_BASE_URL = '/api';
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
            console.log('Making request to:', endpoint, 'with data:', data);
            
            try {
                const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
                        deviceId: DEVICE_ID
                    })
                });

                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(\`HTTP \${response.status}\`);
                }

                const result = await response.json();
                console.log('Response data:', result);
                
                return result;
            } catch (error) {
                console.error('Cloud request failed:', error);
                updateCloudStatus(false, 'Connection failed');
                throw error;
            }
        }

        async function checkCloudStatus() {
            try {
                const result = await cloudRequest('/auth', { action: 'check' });
                
                updateCloudStatus(true, 'Connected');
                
                if (result.isFirstTime) {
                    showSetupSection();
                } else {
                    showAuthSection();
                }
            } catch (error) {
                updateCloudStatus(false, 'Offline mode');
                checkLocalAuth();
            }
        }

        function updateCloudStatus(online, message) {
            const statusDiv = document.getElementById('cloudStatus');
            const statusIcon = document.getElementById('statusIcon');
            const statusText = document.getElementById('statusText');
            
            isOnline = online;
            statusDiv.className = \`cloud-status \${online ? 'online' : 'offline'}\`;
            statusIcon.textContent = online ? '☁️' : '📱';
            statusText.textContent = message;
        }

        // ====================================
        // ENCRYPTION FUNCTIONS
        // ====================================

        async function generateKey(password) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hash = await crypto.subtle.digest('SHA-256', data);
            return await crypto.subtle.importKey(
                'raw',
                hash,
                { name: 'AES-GCM' },
                false,
                ['encrypt', 'decrypt']
            );
        }

        async function encrypt(text, password) {
            const key = await generateKey(password);
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const iv = crypto.getRandomValues(new Uint8Array(12));
            
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                data
            );
            
            const result = new Uint8Array(iv.length + encrypted.byteLength);
            result.set(iv);
            result.set(new Uint8Array(encrypted), iv.length);
            
            return Array.from(result).map(b => b.toString(16).padStart(2, '0')).join('');
        }

        async function decrypt(encryptedHex, password) {
            const key = await generateKey(password);
            const encrypted = new Uint8Array(encryptedHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            
            const iv = encrypted.slice(0, 12);
            const data = encrypted.slice(12);
            
            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                data
            );
            
            return new TextDecoder().decode(decrypted);
        }

        // ====================================
        // AUTHENTICATION FUNCTIONS
        // ====================================

        function showSetupSection() {
            document.getElementById('setupSection').style.display = 'block';
            document.getElementById('authSection').style.display = 'none';
            document.getElementById('mainApp').classList.add('hidden');
        }

        function showAuthSection() {
            document.getElementById('setupSection').style.display = 'none';
            document.getElementById('authSection').style.display = 'block';
            document.getElementById('mainApp').classList.add('hidden');
        }

        function showMainApp() {
            document.getElementById('setupSection').style.display = 'none';
            document.getElementById('authSection').style.display = 'none';
            document.getElementById('mainApp').classList.remove('hidden');
        }

        async function setupMasterPassword() {
            const password = document.getElementById('newMasterPassword').value;
            const confirmPassword = document.getElementById('confirmMasterPassword').value;
            
            if (!password || !confirmPassword) {
                showToast('Please fill in both password fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 8) {
                showToast('Master password must be at least 8 characters long', 'error');
                return;
            }

            setLoading('setupBtn', true);

            try {
                const result = await cloudRequest('/auth', {
                    action: 'setup',
                    masterPassword: password
                });

                if (result.success) {
                    masterKey = password;
                    showMainApp();
                    await loadPasswords();
                    showToast('Master password created successfully!', 'success');
                } else {
                    throw new Error(result.error || 'Setup failed');
                }
            } catch (error) {
                showToast('Failed to create master password', 'error');
                console.error(error);
            } finally {
                setLoading('setupBtn', false);
            }
        }

        async function authenticate() {
            const password = document.getElementById('masterPassword').value;
            
            if (!password) {
                showToast('Please enter your master password', 'error');
                return;
            }

            setLoading('authBtn', true);

            try {
                const result = await cloudRequest('/auth', {
                    action: 'login',
                    masterPassword: password
                });

                if (result.success) {
                    masterKey = password;
                    showMainApp();
                    await loadPasswords();
                    showToast('Successfully authenticated!', 'success');
                } else {
                    showToast('Incorrect master password', 'error');
                }
            } catch (error) {
                showToast('Authentication failed', 'error');
                console.error(error);
            } finally {
                setLoading('authBtn', false);
            }
        }

        function checkLocalAuth() {
            // For offline mode - simplified version
            showSetupSection();
        }

        // ====================================
        // PASSWORD MANAGEMENT
        // ====================================

        async function savePassword() {
            const website = document.getElementById('website').value.trim();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (!website || !username || !password) {
                showToast('Please fill in all fields', 'error');
                return;
            }

            setLoading('saveBtn', true);

            try {
                const encryptedPassword = await encrypt(password, masterKey);

                const result = await cloudRequest('/passwords', {
                    action: 'save',
                    website,
                    username,
                    encryptedPassword
                });

                if (result.success) {
                    showToast(result.message || 'Password saved successfully!', 'success');
                    
                    // Clear form
                    document.getElementById('website').value = '';
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';

                    await loadPasswords();
                } else {
                    throw new Error(result.error || 'Save failed');
                }
            } catch (error) {
                showToast('Failed to save password', 'error');
                console.error(error);
            } finally {
                setLoading('saveBtn', false);
            }
        }

        async function loadPasswords() {
            try {
                const result = await cloudRequest('/passwords', {
                    action: 'load'
                });

                if (result.success) {
                    passwords = result.data || [];
                    displayPasswords();
                } else {
                    throw new Error(result.error || 'Load failed');
                }
            } catch (error) {
                showToast('Failed to load passwords', 'error');
                console.error(error);
            }
        }

        async function deletePassword(id) {
            if (!confirm('Are you sure you want to delete this password?')) {
                return;
            }

            try {
                const result = await cloudRequest('/passwords', {
                    action: 'delete',
                    passwordId: id
                });

                if (result.success) {
                    showToast('Password deleted successfully', 'success');
                    await loadPasswords();
                } else {
                    throw new Error(result.error || 'Delete failed');
                }
            } catch (error) {
                showToast('Failed to delete password', 'error');
                console.error(error);
            }
        }

        async function syncPasswords() {
            setLoading('syncBtn', true);
            try {
                await loadPasswords();
                showToast('Passwords synced successfully!', 'success');
            } catch (error) {
                showToast('Sync failed', 'error');
                console.error(error);
            } finally {
                setLoading('syncBtn', false);
            }
        }

        // ====================================
        // DISPLAY FUNCTIONS
        // ====================================

        function displayPasswords() {
            const list = document.getElementById('passwordList');
            const count = document.getElementById('passwordCount');
            
            count.textContent = passwords.length;
            
            if (passwords.length === 0) {
                list.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No passwords saved yet</p>';
                return;
            }

            passwords.sort((a, b) => a.website.localeCompare(b.website));

            list.innerHTML = passwords.map(p => \`
                <div class="password-item">
                    <div class="password-info">
                        <h3>\${p.website}</h3>
                        <p>Username: \${p.username}</p>
                        <p>Created: \${new Date(p.created_at).toLocaleDateString()}</p>
                        \${p.updated_at ? \`<p style="color: #28a745;">Updated: \${new Date(p.updated_at).toLocaleDateString()}</p>\` : ''}
                    </div>
                    <div class="password-actions">
                        <button class="btn btn-small btn-copy" onclick="copyPassword('\${p.encrypted_password}')">Copy Password</button>
                        <button class="btn btn-small btn-copy" onclick="copyToClipboard('\${p.username}')">Copy Username</button>
                        <button class="btn btn-small btn-delete" onclick="deletePassword(\${p.id})">Delete</button>
                    </div>
                </div>
            \`).join('');
        }

        async function copyPassword(encryptedPassword) {
            try {
                const password = await decrypt(encryptedPassword, masterKey);
                await navigator.clipboard.writeText(password);
                showToast('Password copied to clipboard!', 'success');
            } catch (error) {
                showToast('Failed to copy password', 'error');
            }
        }

        // ====================================
        // PASSWORD GENERATOR
        // ====================================

        function generatePassword() {
            const length = parseInt(document.getElementById('length').value);
            const uppercase = document.getElementById('uppercase').checked;
            const lowercase = document.getElementById('lowercase').checked;
            const numbers = document.getElementById('numbers').checked;
            const symbols = document.getElementById('symbols').checked;

            let charset = '';
            if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (numbers) charset += '0123456789';
            if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

            if (!charset) {
                showToast('Please select at least one character type', 'error');
                return;
            }

            let password = '';
            for (let i = 0; i < length; i++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            }

            document.getElementById('generatedPassword').textContent = password;
            document.getElementById('password').value = password;
            updateStrengthMeter(password);
        }

        function updateLength() {
            const length = document.getElementById('length').value;
            document.getElementById('lengthValue').textContent = length;
        }

        function updateStrengthMeter(password) {
            const strength = calculateStrength(password);
            const fill = document.getElementById('strengthFill');
            
            if (strength < 3) {
                fill.className = 'strength-fill strength-weak';
                fill.style.width = '33%';
            } else if (strength < 5) {
                fill.className = 'strength-fill strength-medium';
                fill.style.width = '66%';
            } else {
                fill.className = 'strength-fill strength-strong';
                fill.style.width = '100%';
            }
        }

        function calculateStrength(password) {
            let strength = 0;
            if (password.length >= 8) strength++;
            if (password.length >= 12) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            return strength;
        }

        // ====================================
        // UTILITY FUNCTIONS
        // ====================================

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Copied to clipboard!', 'success');
            }).catch(() => {
                showToast('Failed to copy', 'error');
            });
        }

        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.style.background = type === 'error' ? '#dc3545' : '#28a745';
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        function setLoading(buttonId, loading) {
            const button = document.getElementById(buttonId);
            const textSpan = document.getElementById(buttonId + 'Text');
            const loader = document.getElementById(buttonId.replace('Btn', 'Loader'));
            
            if (loading) {
                button.disabled = true;
                textSpan.classList.add('hidden');
                loader.classList.remove('hidden');
            } else {
                button.disabled = false;
                textSpan.classList.remove('hidden');
                loader.classList.add('hidden');
            }
        }

        async function resetAllData() {
            const masterPassword = prompt('Enter your master password to confirm reset:');
            if (!masterPassword) {
                showToast('Reset cancelled', 'error');
                return;
            }
            
            if (confirm('Are you sure you want to delete ALL data? This cannot be undone!')) {
                try {
                    const result = await cloudRequest('/auth', {
                        action: 'reset',
                        masterPassword: masterPassword
                    });

                    if (result.success) {
                        localStorage.clear();
                        showToast('All data deleted successfully', 'success');
                        location.reload();
                    } else {
                        showToast(result.error || 'Invalid master password', 'error');
                    }
                } catch (error) {
                    showToast('Failed to delete data', 'error');
                }
            }
        }

        // ====================================
        // NETWORK MONITORING
        // ====================================

        window.addEventListener('online', () => {
            updateCloudStatus(true, 'Back online');
            checkCloudStatus();
        });

        window.addEventListener('offline', () => {
            updateCloudStatus(false, 'Offline mode');
        });

        // ====================================
        // INITIALIZATION
        // ====================================

        document.addEventListener('DOMContentLoaded', function() {
            // Event listeners for Enter key
            document.getElementById('masterPassword').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') authenticate();
            });
            
            document.getElementById('confirmMasterPassword').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') setupMasterPassword();
            });

            // Generate initial password
            generatePassword();
            
            // Check cloud status and authentication
            checkCloudStatus();
        });
    </script>
</body>
</html>
                `
            }} />
        </>
    )
}