
// Toggle Password Visibility
function togglePass(){
    const pass = document.getElementById("password");
    const eyeIcon = document.querySelector('.show-pass i');
    
    if(pass.type === "password"){
        pass.type = "text";
        eyeIcon.className = "far fa-eye-slash";
    } else {
        pass.type = "password";
        eyeIcon.className = "far fa-eye";
    }
}

// Handle Sign In (با افکت لودینگ)
function handleSignIn() {
    const btn = document.getElementById('signin-btn');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // اعتبارسنجی ساده
    if(!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // افکت لودینگ
    btn.classList.add('loading');
    
    // شبیه سازی درخواست به سرور
    setTimeout(() => {
        btn.classList.remove('loading');
        alert('Welcome to the galaxy! 🚀 (Demo Login)');
    }, 1500);
}

// اضافه کردن قابلیت اینتر برای ارسال فرم
document.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        handleSignIn();
    }
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
