status = ""; //var for storing status
objects = "";
find = "";

function preload() {}

function setup() {
    canvas = createCanvas(480, 380); //canvas created
    canvas.position(520, 280); //canvas positioned

    video = createCapture(VIDEO); //video captured
    video.hide(); //extra video component hidden
}

function start() {
    obj_detector = ml5.objectDetector("cocossd", modelLoaded); //cocossd model loaded
    document.getElementById("status").innerHTML = "Status: Detecting Objects"; //status changed in html
    find = document.getElementById("findobject").value; //user's text stored in var
    console.log(find); //var consoled
}

function modelLoaded() {
    console.log("Model loaded!");
    status = true; //status set to true
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }

}

function draw() {
    image(video, 0, 0, 480, 380); //video displayed on canvas
    if (status != "") {
        obj_detector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence * 100);
            name = objects[i].label;

            document.getElementById("objectdetect").innerHTML = "Number of objects detected = " + objects.length;

            fill("red");
            text(name + " " + percent + "%", objects[i].x, objects[i].y);

            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (name == find) {
                video.stop();
                obj_detector.detect(gotResults);

                document.getElementById("status").innerHTML = "Status: " + find + " Found";


                synth = window.SpeechSynthesis;
                speech = new SpeechSynthesisUtterance(find + " Found");
                synth.speak(speech);

            } else {
                document.getElementById("status").innerHTML = "Status: " + find + " Not found";
            }
        }
    }
}