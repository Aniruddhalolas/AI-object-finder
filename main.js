status = "";
objects = [];
object_to_found = "";

function setup(){
    canvas = createCanvas(250, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = " Status : Detecting objects";
    object_to_found = document.getElementById("object_to_detect").value;
}

function modelLoaded(){
    console.log("Model loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 250, 300);
    if(status!=""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML =  "Status : Objects detected";
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
    if(objects[i].label == object_to_found){
        document.getElementById("number_of_objects").innerHTML = object_to_found + "found";
    }
    if(objects[i].label!=object_to_found){
        document.getElementById("number_of_objects").innerHTML = object_to_found + "not found";
    }
}


