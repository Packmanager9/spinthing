
window.addEventListener('DOMContentLoaded', (event) =>{

    let meadow = document.getElementById("meadow")
    let retention = document.getElementById("retention")
let meadow_context = meadow.getContext('2d')

meadow.style.background = "blue"


class Stem{
    constructor(x, y, height, width){
        this.x = x 
        this.y = y
        this.height = height
        this.width = width

    }
    draw(){

        meadow_context.fillStyle = "green"
        meadow_context.fillRect(this.x, this.y, this.width, this.height)

    }


}

class Corrola{

    constructor(center){
        this.center = center
        this.petals = []

    }
    draw(){

        this.center.draw()

        for(let x = 0; x<this.petals.length; x++){
            this.petals[x].draw(x)
        }

    }


}

class Circle{
    constructor(x, y, radius){
        this.x = x
        this.y = y
        this.radius = radius

    }
    draw(t){

        meadow_context.lineWidth =1
        meadow_context.beginPath();
        meadow_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
        meadow_context.fillStyle = `rgb(${t%(255+spin)},${Math.abs((255+spin)-t)%(255+spin)},${(t*t)%(255+spin)})`
        meadow_context.fill()
        // meadow_context.stroke();  

    }


}



let tulip = new Stem(meadow.width/2, meadow.height/2, meadow.height, 25)



tulip.draw()

let angle_increment = 3*Math.PI


let spin = 1
let counter = 0
let globalx = 0
window.setInterval(function(){ 
    meadow_context.fillStyle = "#090909"
    meadow_context.fillRect(0, 0, meadow.width, meadow.height)

    counter++
    if(counter%100 == 0){
        spin++
    }

    let flowerhead = new Circle(tulip.x+(tulip.width/2),tulip.y, tulip.width*2)

    let bloom = new Corrola(flowerhead)
    let angle = 0
    let raidal_distance = 0
    let disc = 25
    
    for(let y = 0; y<600; y++){
    
        let petal = new Circle (0,0,disc)
    
        petal.x = raidal_distance * Math.cos(angle - Math.PI*2) +  flowerhead.x
        petal.y = raidal_distance * Math.sin(angle - Math.PI*2) + flowerhead.y
    
        bloom.petals.push(petal)
    
        angle += angle_increment
        raidal_distance += .5
    
        disc -= (20/1200)
    }
    

    // for(let x = 0; x<bloom.petals.length; x++){
    //     bloom.petals[x].radius += .01
    // }

    bloom.draw()

    angle_increment+= retention.value/1000000



    globalx++
    let img2 = new Image();
    img2.src = meadow.toDataURL("image/png");
    // document.body.appendChild(img2);
    let link = document.createElement("a");
    link.download = `bloom${globalx}.png`
    meadow.toBlob(function(blob) {
      link.href = URL.createObjectURL(blob);
        link.click();
    }, "image/png");



}, 120 )


})