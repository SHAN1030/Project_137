var status_1 = ""; //Define an empty variable storing the status of the cocossd model
objects = []; //Define an empty array

function setup(){ 
    canvas = createCanvas(580,460); //Add code for creating canvas at center of screen
    canvas.center();
    video = createCapture(VIDEO); //Add code for accessing the webcam inside canvas
    video.hide(); //hides extra video feed
    synth = window.speechSynthesis;

}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: DETECTING OBJECTS";
    objectname = document.getElementById("input_1").value;
}

function modelLoaded(){
    console.log("MODEL SUCCESSFULLY IS LOADED");
    status_1 = true;
}

function draw(){
    image(video,0,0,580,460);  //This places the video inside the canvas
    r=0;
    g=random(255);
    b=0;
    if(status_1 !="") //if condition write a for-loop for reading the array
    {
    objectDetector.detect(video, gotResult);    
    for (i = 0; i < objects.length; i++){  //inside for loop fed confidence, label, xy, width, height
        document.getElementById("number_of_objects").innerHTML = "Status: " + objects.length + " OBJECTS DETECTED";
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label == objectname){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = "Status: "+ objectname + " found";
            utterThis = new SpeechSynthesisUtterance(objectname + "found");
            synth.speak(utterThis);
        }else{
            document.getElementById("status").innerHTML = "Status: "+ objectname + " not found";
        }
    }      
  }
}

function gotResult(error,results) {
    if(error){
        console.log(error);
    }else{ 
        console.log(results);
    }
    objects = results;
}