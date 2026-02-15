// تابع ریست کردن همه خطاها
function resetAllErrors() {
    // ریست خطاهای input
    document.querySelectorAll('.input-group').forEach(group => {
        group.classList.remove('error');
    });
    
    // ریست خطای checkbox
    document.getElementById('terms-row').classList.remove('error');
}

// تابع نمایش خطا برای فیلد خاص
function showError(elementId) {
    document.getElementById(elementId).classList.add('error');
}

// Check Password Match
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm-password').value;
    const group = document.getElementById('group-confirm');
    
    if(confirm.length > 0 && password !== confirm) {
        group.classList.add('error');
    } else {
        group.classList.remove('error');
    }
}

// Toggle Password Visibility
function togglePass(fieldId) {
    const pass = document.getElementById(fieldId);
    const showPassSpan = event.currentTarget;
    const eyeIcon = showPassSpan.querySelector('i');
    
    if(pass.type === "password") {
        pass.type = "text";
        eyeIcon.className = "far fa-eye-slash";
    } else {
        pass.type = "password";
        eyeIcon.className = "far fa-eye";
    }
}

// Check Password Strength
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    let strength = 0;
    let message = '';
    
    if(password.length === 0) {
        strength = 0;
        message = 'Enter password';
    } else if(password.length < 6) {
        strength = 20;
        message = 'Too short';
    } else {
        // Check for various criteria
        if(password.length >= 8) strength += 25;
        if(password.match(/[a-z]+/)) strength += 25;
        if(password.match(/[A-Z]+/)) strength += 25;
        if(password.match(/[0-9]+/)) strength += 25;
        if(password.match(/[$@#&!]+/)) strength += 25;
        
        // Cap at 100
        strength = Math.min(strength, 100);
        
        if(strength < 40) message = 'Weak';
        else if(strength < 70) message = 'Medium';
        else message = 'Strong';
    }
    
    strengthBar.style.width = strength + '%';
    
    // Change color based on strength
    if(strength < 40) {
        strengthBar.style.background = 'linear-gradient(90deg, #ff6b6b, #ff8e8e)';
    } else if(strength < 70) {
        strengthBar.style.background = 'linear-gradient(90deg, #feca57, #ffd48a)';
    } else {
        strengthBar.style.background = 'linear-gradient(90deg, #48dbfb, #6cffb0)';
    }
    
    strengthText.textContent = message;
    
    // بررسی تطابق پسورد در زمان تایپ
    checkPasswordMatch();
}

// Handle Sign Up - بدون الرت، فقط با رنگ قرمز
function handleSignUp() {
    const btn = document.getElementById('signup-btn');
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;
    
    // اول همه خطاها رو پاک کن
    resetAllErrors();
    
    let hasError = false;
    
    // اعتبارسنجی نام
    if(!fullname.trim()) {
        showError('group-fullname');
        hasError = true;
    }
    
    // اعتبارسنجی ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailRegex.test(email)) {
        showError('group-email');
        hasError = true;
    }
    
    // اعتبارسنجی رمز
    if(!password || password.length < 6) {
        showError('group-password');
        hasError = true;
    }
    
    // اعتبارسنجی تکرار رمز
    if(!confirmPass) {
        showError('group-confirm');
        hasError = true;
    } else if(password !== confirmPass) {
        showError('group-confirm');
        hasError = true;
    }
    
    // اعتبارسنجی قوانین
    if(!terms) {
        document.getElementById('terms-row').classList.add('error');
        hasError = true;
    }
    
    // اگه خطایی بود، همینجا تموم کن
    if(hasError) {
        return;
    }
    
    // اگه همه چی اوکی بود، برو به مرحله بعد
    btn.classList.add('loading');
    
    // شبیه سازی ثبت نام موفق
    setTimeout(() => {
        btn.classList.remove('loading');
        // اینجا می‌تونی یه پیام موفقیت کوچیک اضافه کنی یا بری به صفحه بعد
        // من الان فقط رنگ سبز میدم به همه فیلدها برای یه لحظه
        document.querySelectorAll('.input-group').forEach(group => {
            group.style.transition = 'all 0.3s ease';
            group.style.border = '2px solid #4CAF50';
            group.style.borderRadius = '14px';
            setTimeout(() => {
                group.style.border = 'none';
            }, 500);
        });
    }, 1500);
}

// اضافه کردن قابلیت اینتر برای ارسال فرم
document.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        handleSignUp();
    }
});

// وقتی کاربر روی فیلدها کلیک می‌کنه، خطاش پاک میشه
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        const parentGroup = this.closest('.input-group');
        if(parentGroup) {
            parentGroup.classList.remove('error');
        }
    });
});

// برای checkbox هم همین کار رو می‌کنیم
document.getElementById('terms').addEventListener('change', function() {
    document.getElementById('terms-row').classList.remove('error');
});

// ====== Galaxy Background (بدون تغییر) ======
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = { x: canvas.width/2, y: canvas.height/2 };
let target = { x: mouse.x, y: mouse.y };

addEventListener("mousemove", e=>{
    target.x = e.clientX;
    target.y = e.clientY;
});

function updateMouse(){
    mouse.x += (target.x - mouse.x) * 0.20;
    mouse.y += (target.y - mouse.y) * 0.20;
}

class Star{
    constructor(){
        this.baseX = Math.random()*canvas.width;
        this.baseY = Math.random()*canvas.height;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = Math.random()*1.5+0.5;
        this.color = `hsla(${210+Math.random()*40},80%,70%,0.8)`;
    }

    draw(){
        ctx.beginPath();
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx*dx+dy*dy);

        const maxDist = 180;
        const minDist = 70;

        if(dist < maxDist && dist > minDist){
            let force = (maxDist-dist)/maxDist;
            this.x += (dx/dist)*force*1.2;
            this.y += (dy/dist)*force*1.2;
            this.x += (-dy/dist)*force*0.6;
            this.y += (dx/dist)*force*0.6;
        }else if(dist <= minDist){
            this.x -= (dx/dist)*0.8;
            this.y -= (dy/dist)*0.8;
        }else{
            this.x += (this.baseX-this.x)*0.02;
            this.y += (this.baseY-this.y)*0.02;
        }

        this.draw();
    }
}

let stars=[];
for(let i=0;i<400;i++){
    stars.push(new Star());
}

function drawCursor(){
    let g = ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,80);
    g.addColorStop(0,"rgba(120,180,255,0.4)");
    g.addColorStop(1,"rgba(0,0,0,0)");
    ctx.beginPath();
    ctx.fillStyle=g;
    ctx.arc(mouse.x,mouse.y,80,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.shadowBlur=25;
    ctx.shadowColor="rgba(180,220,255,0.9)";
    ctx.fillStyle="rgba(200,230,255,1)";
    ctx.arc(mouse.x,mouse.y,6,0,Math.PI*2);
    ctx.fill();
    ctx.shadowBlur=0;
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="rgba(2,4,12,0.4)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    updateMouse();
    stars.forEach(s=>s.update());
    drawCursor();

    requestAnimationFrame(animate);
}
animate();

addEventListener("resize",()=>{
    canvas.width=innerWidth;
    canvas.height=innerHeight;
});