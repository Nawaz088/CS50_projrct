const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
//let adjustX = 20;
//let adjustY = -20;

//handel mouse
const mouse = {
    x: null,
    y: null,
    //the below can be changed
    radius: 250
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //mouse.radius = 150;
    //console.log(mouse.x, mouse.y);
})

ctx.fillStyle = 'white';
ctxfont = "25px verdana";
ctx.fillText('A', 0, 30); //this can be modified according to what we want to display and it takes 
//one more attribute that is width of text
     //ctx.strokeStyle = 'white';
//ctx.strokeRect(0, 0, 100, 100);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);

class Particle {
    constructor(x, y){
        this.x = x + 100;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 5;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    //move the particles near the mouse
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        //using pythagoras theorem to calculate distance
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY){
                let dy = this.y = this.baseY;
                this.y -= dy / 10;
            }
        }

    }

}

function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
                let positionX = x;
                let positionY = y;
                particleArray.push(new Particle(positionX * 20, positionY * 20));
            
            }
        }
    }
}
init();
console.log(particleArray);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}
animate();

