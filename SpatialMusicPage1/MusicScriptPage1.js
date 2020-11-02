//Room rendering Variables

var renderer, scene, camera, controls;
var newDimension = 1;
var prevDimension = 1;
var orgDimension = 1;
var differenceInDimensions = 1;
var rawdifference = 0;
var frequencyfromdimensions;
let temperature = 1.1;
myInnerWidth = innerWidth;
myInnerHeight = (innerHeight * 75) / 100;

//Music variables
const MIN_NOTE = 48;
const MAX_NOTE = 83;

var notefromdimensions = 0;
var reverbwetvalue = 0.25;


// Step 1: Home page navigation to next page and back to home page

$(document).ready(function () {
  $("#nextpage").click(function () {
    $("#page1").hide();
    $("#controls").show();
    $("#page2").show();
  });

  $("#homedesc").click(function () {
    $("#page1").show();
    $("#controls").hide();
    $("#page2").hide();
  });
});

/* Step 2: Create Room, animation and action listeners */
createRoom();
animate();

//HELPER FUNCTIONS
// Step 2a Creates box for room and it's animation
function createRoom() {
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(0xaaaaaa);
  renderer.setSize(myInnerWidth, myInnerHeight);

  mymusiccontainer = document.querySelector(".container");
  mymusiccontainer.style.height = (innerHeight * 10) / 100;
  document.getElementById("mybox").appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, myInnerWidth / myInnerHeight, 1, 40);
  camera.position.set(2, 2, 6);

  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 5;

  /*OBJECTS*/
  
  //createGrid();
  var light = new THREE.SpotLight(0xffffff, 10, 20);
  light.position.set(-10, 10, 10);
  scene.add(light);

  //1.Create a mesh
  var object = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({
      color: 0x00aa00,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      transparent: true,
      shading: THREE.NoShading
    })
  );

  //2.create vertexHelpers
  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 0.1, 0.1, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  );
  var vertexHelpers = [];
  for (var i = 0; i < object.geometry.vertices.length; i++) {
    var vertexHelper = sphere.clone();
    var vertexPosition = object.geometry.vertices[i];
    vertexHelper.position.copy(vertexPosition);
    vertexHelper.visible = false;
    vertexHelper.data = { index: i };
    scene.add(vertexHelper);
    vertexHelpers.push(vertexHelper);
  }

  //3. create an (invisible) plane to drag the vertices on
  var plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(8, 8, 8, 1, 1, 1),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  );
  //plane.visible=false;

  scene.add(object, plane);

  /*GEOMETRY EDITION*/

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var INTERSECTED, SELECTED;

  //custom features
  var mouseDown = false;
  var mode = "resize mode";

  //listeners
  renderer.domElement.addEventListener("mousemove", onDocumentMouseMove, false);
  renderer.domElement.addEventListener("mousedown", onDocumentMouseDown, false);
  renderer.domElement.addEventListener("mouseup", onDocumentMouseUp, false);

  function onDocumentMouseMove(e) {
    e.preventDefault();
    var myboxcontainer = document.getElementById("temperaturecontainer");

    var boxheight = myInnerHeight - myboxcontainer.clientHeight;

    mouse.x =
      ((event.clientX - renderer.domElement.offsetLeft) /
        renderer.domElement.clientWidth) *
        2 -
      1;
    mouse.y =
      -(
        (event.clientY - renderer.domElement.offsetTop) /
        renderer.domElement.clientHeight
      ) *
        2 +
      1;

    raycaster.setFromCamera(mouse, camera);

    //1.MOVE SELECTED OBJECTS

    if (SELECTED) {
      plane.position.copy(SELECTED.position);
      plane.lookAt(camera.position);
      var intersects = raycaster.intersectObject(plane);

      var increaseRatio =
        intersects[0].point.sub(object.position).length() /
        SELECTED.position.sub(object.position).length();
      object.scale.set(
        object.scale.x * increaseRatio,
        object.scale.y * increaseRatio,
        object.scale.z * increaseRatio
      );
      //also update other vertexHelpers'position
      for (var i = 0; i < vertexHelpers.length; i++) {
        var vector = new THREE.Vector3().copy(
          vertexHelpers[i].position.sub(object.position)
        );
        vector.multiplyScalar(increaseRatio);
        vertexHelpers[i].position.copy(vector);
      }

      return;
      //'return' because we don't want the 'picking objects' part
      //if we were yet dragging something
    }

    //2. PICK OBJECTS
    var intersects = raycaster.intersectObjects(scene.children);
    var metObject = false,
      metVertex = undefined;

    for (var i = 0; i < intersects.length; i++) {
      var result = intersects[i].object;
      if (result == object) metObject = true;
      if (result.geometry instanceof THREE.SphereGeometry && !metVertex)
        metVertex = result;
    }
    if (metVertex) {
      if (INTERSECTED != metVertex) INTERSECTED = metVertex;
      document.getElementById("mybox").style.cursor = "move";
    } else {
      INTERSECTED = null;
      document.getElementById("mybox").style.cursor = "auto";
    }

    //little appearance changes
    if ((metVertex || metObject) && !mouseDown) {
      object.material.opacity = 0.5;
      for (var i = 0; i < vertexHelpers.length; i++) {
        vertexHelpers[i].visible = true;
      }
    } else {
      object.material.opacity = 1;
      for (var i = 0; i < vertexHelpers.length; i++) {
        vertexHelpers[i].visible = false;
      }
    }
  }

  // Help button Action Listener: Pops up instructions
  document.getElementById("helpuser").addEventListener("click", function () {
    alert(
      "1. Click on play to generate music with AI. \n2. Mouse over on box, drag corners to re-size room and click play to generate music and musical effects as per room size.\n3. Click on expand button for 3D Panning of generated music.\n4. Click anywhere in the 3D panning window, drag the white sphere around, and zoom to experience binaural sound.\n5. Resize room in the main view and click on Expand to experience 3D panning and musical effects as per the room size. \n(Tested on FireFox and Chrome Browsers)"
    );
  });
  
  // Open Panning Button Action Listener: Opens new window and passes 
  document.getElementById("openpanning").addEventListener("click", function () {
    stopMusic();
  
    var panningwindow = window.open(
     
"../../../../SpatialMusicPage2/SpatialMusicPage2.html?roomdimensions=" +
      
        differenceInDimensions +
        ";",
      "_blank",
      "toolbar=0,location=0,menubar=0"
    );
    console.log(
      " Opening new window with dimensions =" + differenceInDimensions
    );
    panningwindow.mydimensions = differenceInDimensions;
  });
 
  // Play button Action listener 
  $("#playButton").click(function () {
    
    if( $("#playButton i").hasClass("fa-play-circle-o")){
      computeDimensionsFromRoomSize();
      computeFrequenciesAndNoteAndTemperatureAndReverbFromDimensions();
      
      startMusic();
    } else{
     
      stopMusic();
    }
   
  });
 
// Once the room has been re-sized, get dimensions of the room
  function onDocumentMouseDown(e) {
    stopMusic();

    prevDimension = object.geometry.parameters.height * object.scale.x;

    if (INTERSECTED) {
      controls.enabled = false;
      SELECTED = INTERSECTED;
    }
    mouseDown = true;
  }
  
  // Compute Dimensions from Room size
  function computeDimensionsFromRoomSize() {
    newDimension = object.geometry.parameters.height * object.scale.y;

    rawdifference = newDimension - orgDimension;

    if (rawdifference <= 0) {
      differenceInDimensions = orgDimension;
    } else {
      differenceInDimensions = newDimension - orgDimension;
    }
  }
  
  // Once the room has been re-sized, get dimensions of the room
  function onDocumentMouseUp(e) {
    e.preventDefault();
    computeDimensionsFromRoomSize();
    controls.enabled = true;
    SELECTED = null;
    document.getElementById("mybox").style.cursor = "auto";
    mouseDown = false;
  }

  animate();
}
//Render room
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

// Generate Frequencies from room size
function computeFrequenciesAndNoteAndTemperatureAndReverbFromDimensions() {
   L = W = H = differenceInDimensions;
  console.log(" IN GenerateFrequences dimenstion =" + differenceInDimensions);

  m1 = 1;
  m2 = 2;
  m3 = 3;
  m4 = 4;
  m5 = 5;
  m6 = 6;
  m7 = 7;
  m8 = 8;
  m9 = 9;

  ax1 = 565 * Math.sqrt((m1 / L) * (m1 / L));
  ax2 = 565 * Math.sqrt((m1 / W) * (m1 / W));
  ax3 = 565 * Math.sqrt((m1 / H) * (m1 / H));

  ax4 = 565 * Math.sqrt((m2 / L) * (m2 / L));
  ax5 = 565 * Math.sqrt((m2 / W) * (m2 / W));
  ax6 = 565 * Math.sqrt((m2 / H) * (m2 / H));

  ax7 = 565 * Math.sqrt((m3 / L) * (m3 / L));
  ax8 = 565 * Math.sqrt((m3 / W) * (m3 / W));
  ax9 = 565 * Math.sqrt((m3 / H) * (m3 / H));

  ax10 = 565 * Math.sqrt((m4 / L) * (m4 / L));
  ax11 = 565 * Math.sqrt((m4 / W) * (m4 / W));
  ax12 = 565 * Math.sqrt((m4 / H) * (m4 / H));

  ax13 = 565 * Math.sqrt((m5 / L) * (m5 / L));
  ax14 = 565 * Math.sqrt((m5 / W) * (m5 / W));
  ax15 = 565 * Math.sqrt((m5 / H) * (m5 / H));

  ax16 = 565 * Math.sqrt((m6 / L) * (m6 / L));
  ax17 = 565 * Math.sqrt((m6 / W) * (m6 / W));
  ax18 = 565 * Math.sqrt((m6 / H) * (m6 / H));

  ax19 = 565 * Math.sqrt((m7 / L) * (m7 / L));
  ax20 = 565 * Math.sqrt((m7 / W) * (m7 / W));
  ax21 = 565 * Math.sqrt((m7 / H) * (m7 / H));

  ax22 = 565 * Math.sqrt((m8 / L) * (m8 / L));
  ax23 = 565 * Math.sqrt((m8 / W) * (m8 / W));
  ax24 = 565 * Math.sqrt((m8 / H) * (m8 / H));

  ax25 = 565 * Math.sqrt((m9 / L) * (m9 / L));
  ax26 = 565 * Math.sqrt((m9 / W) * (m9 / W));
  ax27 = 565 * Math.sqrt((m9 / H) * (m9 / H));
  frequencyfromdimensions = ax1;
 
  computeNoteFromFrequency(frequencyfromdimensions);
  computeTemperature();
  computeReverb();
}

// Compute Note From Frequency
function computeNoteFromFrequency(frequencyfromdimensions) {
  midi = Tone.Frequency(frequencyfromdimensions).toMidi();
  console.log ("********* MIDI = "+ midi);
  notefromdimensions = midi;
  if (midi < MIN_NOTE) {
    notefromdimensions = MIN_NOTE;
  }
  if (midi > MAX_NOTE) {
    notefromdimensions = MAX_NOTE;
  }
  console.log(
    "Generating music for DIMENSIONS = " +
      differenceInDimensions +
      "FREQ=" +
      frequencyfromdimensions +
      "\nORIGINAL MIDI NOTE=" +
      midi +
      "\n NEW MIDI NOTE" +
      notefromdimensions
  );
}

//Compute temperature from dimensions
function computeTemperature() {
  if (notefromdimensions < 53) {
    temperature = 0.4;
  } else if (notefromdimensions < 60) {
    temperature = 0.8;
  } else if (notefromdimensions < 67) {
    temperature = 1.2;
  } else if (notefromdimensions < 73) {
    temperature = 1.6;
  } else if (notefromdimensions < MAX_NOTE) {
    temperature = 2;
  }
}

//Compute Reverb from note
function computeReverb() {
  try{
  if (notefromdimensions < 53) {
    reverbwetvalue = 0;
  } else if (notefromdimensions < 60) {
    reverbwetvalue = 0.25;
  } else if (notefromdimensions < 67) {
    reverbwetvalue = 0.5;
  } else if (notefromdimensions < 73) {
    reverbwetvalue = 0.75;
  } else if (notefromdimensions < MAX_NOTE) {
    reverbwetvalue = 1;
  }
  }catch (err){
    console.log(" Exception thrown in calculateReverb  =" + " Temperature =" + temperature + " reverbwetvalue =" + reverbwetvalue + " note =" + notefromdimension + " Dimensions =" +roomDimensions + "err=" + err);
   
  }
}


// AI MUSIC GENERATOR

//Build note sequence
function buildNoteSequence(seed, isDummy) {
  mynewseed = [];

  if (isDummy) {
    mynewseed = seed;
  } else {
    mynewseed = [];
 
    mynewseed.push({ note: notefromdimensions, time: Tone.now() });
  }

  console.log("mm=" + mm);
  
 // Call Majenta API with note to generate music
  return mm.sequences.quantizeNoteSequence(
    {
      ticksPerQuarter: 220,
      totalTime: mynewseed.length * 0.5,
      quantizationInfo: {
        stepsPerQuarter: 1
      },
      timeSignatures: [
        {
          time: 0,
          numerator: 4,
          denominator: 4
        }
      ],
      tempos: [
        {
          time: 0,
          qpm: 120
        }
      ],
      notes: mynewseed.map((n, idx) => ({
        pitch: n.note,
        startTime: idx * 0.5,
        endTime: (idx + 1) * 0.5
      }))
    },
    1
  );
}

let rnn = new mm.MusicRNN(
  "https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/chord_pitches_improv"
);


let reverb = new Tone.Convolver(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/hm2_000_ortf_48k.mp3"
).toMaster();
reverb.wet.value = reverbwetvalue;
let sampler = new Tone.Sampler({
  C3:
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c3.mp3",
  "D#3":
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds3.mp3",
  "F#3":
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs3.mp3",
  A3:
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a3.mp3",
  C4:
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c4.mp3",
  "D#4":
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds4.mp3",
  "F#4":
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs4.mp3",
  A4:
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a4.mp3",
  C5:
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c5.mp3",
  "D#5":
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds5.mp3",
  "F#5":
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs5.mp3",
  A5:
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a5.mp3",
  C2:
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a5.mp3",
  D2:
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a5.mp3",
  "C#2/Db2":
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a5.mp3"
}).connect(reverb);
sampler.release.value = 2;

let builtInKeyboard = new AudioKeys({ rows: 2 });

let onScreenKeyboardContainer = document.querySelector(".keyboard");

let onScreenKeyboard = buildKeyboard(onScreenKeyboardContainer);

let machinePlayer = buildKeyboard(
  document.querySelector(".machine-bg .player")
);
let humanPlayer = buildKeyboard(document.querySelector(".human-bg .player"));

let currentSeed = [];
let stopCurrentSequenceGenerator;
let synthFilter = new Tone.Filter(300, "lowpass").connect(
  new Tone.Gain(0.4).toMaster()
);

let synthConfig = {
  oscillator: { type: "fattriangle" },
  envelope: { attack: 3, sustain: 1, release: 1 }
};
let synthsPlaying = {};

function isAccidental(note) {
  let pc = note % 12;
  return pc === 1 || pc === 3 || pc === 6 || pc === 8 || pc === 10;
}


// Build keyboard
function buildKeyboard(container) {
  let nAccidentals = _.range(MIN_NOTE, MAX_NOTE + 1).filter(isAccidental)
    .length;
  let keyWidthPercent = 100 / (MAX_NOTE - MIN_NOTE - nAccidentals + 1);
  let keyInnerWidthPercent =
    100 / (MAX_NOTE - MIN_NOTE - nAccidentals + 1) - 0.5;
  let gapPercent = keyWidthPercent - keyInnerWidthPercent;
  let accumulatedWidth = 0;

  return _.range(MIN_NOTE, MAX_NOTE + 1).map((note) => {
    let accidental = isAccidental(note);

    let key = document.createElement("div");
    key.classList.add("key");
    if (accidental) {
      key.classList.add("accidental");
      key.style.left = `${
        accumulatedWidth - gapPercent - (keyWidthPercent / 2 - gapPercent) / 2
      }%`;
      key.style.width = `${keyWidthPercent / 2}%`;
    } else {
      key.style.left = `${accumulatedWidth}%`;
      key.style.width = `${keyInnerWidthPercent}%`;
    }

    container.appendChild(key);
    if (!accidental) accumulatedWidth += keyWidthPercent;
    return key;
  });
}


// Get seed intervals to generate music with the computed note
function getSeedIntervals(seed) {
  let intervals = [];
  for (let i = 0; i < seed.length - 1; i++) {
    let rawInterval = seed[i + 1].time - seed[i].time;
    let measure = _.minBy(["8n", "4n"], (subdiv) =>
      Math.abs(rawInterval - Tone.Time(subdiv).toSeconds())
    );
    intervals.push(Tone.Time(measure).toSeconds());
  }
  return intervals;
}

// Get sequence to generate music with the computed note
function getSequenceLaunchWaitTime(seed) {
  if (seed.length <= 1) {
    return 1;
  }
  let intervals = getSeedIntervals(seed);
  let maxInterval = _.max(intervals);
  return maxInterval * 2;
}

//// Get play interval time to generate music with the computed note
function getSequencePlayIntervalTime(seed) {
  if (seed.length <= 1) {
    return Tone.Time("8n").toSeconds();
  }
  let intervals = getSeedIntervals(seed).sort();
  return _.first(intervals);
}

// Detect chord
function detectChord(notes) {
  notes = notes.map((n) => Tonal.Note.pc(Tonal.Note.fromMidi(n.note))).sort();
  return Tonal.PcSet.modes(notes)
    .map((mode, i) => {
      const tonic = Tonal.Note.name(notes[i]);
      const names = Tonal.Dictionary.chord.names(mode);
      return names.length ? tonic + names[0] : null;
    })
    .filter((x) => x);
}


// Start Sequence generator from the computed note
function startSequenceGenerator(seed) {
  let running = true,
    lastGenerationTask = Promise.resolve();
  let chords = detectChord(seed);
  let chord = _.first(chords) || "CM";
  let seedSeq = buildNoteSequence(seed, false);
  
  let generatedSequence =
    Math.random() < 0.7 ? _.clone(seedSeq.notes.map((n) => n.pitch)) : [];

  let launchWaitTime = getSequenceLaunchWaitTime(seed);
  let playIntervalTime = getSequencePlayIntervalTime(seed);
  let generationIntervalTime = playIntervalTime / 2;

  function generateNext() {
    if (!running) return;
    if (generatedSequence.length < 10) {
      lastGenerationTask = rnn
        .continueSequence(seedSeq, 20, temperature, [chord])
        .then((genSeq) => {
          generatedSequence = generatedSequence.concat(
            genSeq.notes.map((n) => n.pitch)
          );
          setTimeout(generateNext, generationIntervalTime * 1000);
        });
      console.log(" Generated Seq=" + generatedSequence);
    } else {
      setTimeout(generateNext, generationIntervalTime * 1000);
    }
  }

  function consumeNext(time) {
    if (generatedSequence.length) {
      let note = generatedSequence.shift();
      if (note > 0) {
        triggerNote(note, time);
      }
    }
  }

  setTimeout(generateNext, launchWaitTime * 1000);
  let consumerId = Tone.Transport.scheduleRepeat(
    consumeNext,
    playIntervalTime,
    Tone.Transport.seconds + launchWaitTime
  );

  return () => {
    running = false;
    Tone.Transport.clear(consumerId);
  };
}


// Updatec chord
function updateChord({ add = null, remove = null }) {
  if (add) {
    currentSeed.push({ note: add, time: Tone.now() });
  }
  if (remove && _.some(currentSeed, { note: remove })) {
    _.remove(currentSeed, { note: remove });
  }

  if (stopCurrentSequenceGenerator) {
    stopCurrentSequenceGenerator();
    stopCurrentSequenceGenerator = null;
  }
  if (currentSeed.length && !stopCurrentSequenceGenerator) {
    resetState = true;
    stopCurrentSequenceGenerator = startSequenceGenerator(
      _.cloneDeep(currentSeed)
    );
  }
}

// Start music
function startMusic() {
  console.log(" Starting music with dimensions =" + notefromdimensions + " room size=" + differenceInDimensions + " Frequency =" + frequencyfromdimensions + " Temperature=" + temperature + " Reverb="+ reverbwetvalue)
  $("#playButton i").removeClass("fa-play-circle-o");
  $("#playButton i").addClass("fa-pause-circle-o");
  keyDown(notefromdimensions, (velocity = 0.7));
}

// Stop music
function stopMusic() {
  $("#playButton i").addClass("fa-play-circle-o");
  $("#playButton i").removeClass("fa-pause-circle-o");
  keyUp(notefromdimensions);
}

//Connect reverb
reverb.wet.value = reverbwetvalue;
const panningsynth = new Tone.Synth({
  oscillator: {
    oscillator: { type: "fattriangle" }
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0
  }
}).connect(reverb);

// Key down
function keyDown(note, velocity = 0.7) {
  note = notefromdimensions;

  if (note < MIN_NOTE || note > MAX_NOTE) return;

  let freq = Tone.Frequency(note, "midi");

  let synth = new Tone.Synth(synthConfig).connect(synthFilter);

  synthsPlaying[note] = synth;

  updateChord({ add: note });
  humanPlayer[note - MIN_NOTE].classList.add("down");
  animatePlay(onScreenKeyboard[note - MIN_NOTE], note, true);
}

// Key up
function keyUp(note) {
  note = notefromdimensions;

  if (note < MIN_NOTE || note > MAX_NOTE) return;
  if (synthsPlaying[note]) {
    let synth = synthsPlaying[note];
    panningsynth.triggerRelease();
    setTimeout(() => synth.dispose(), 2000);
    synthsPlaying[note] = null;
  }
  updateChord({ remove: note });
  humanPlayer[note - MIN_NOTE].classList.remove("down");
}

// Machine key down
function triggerNote(note, time) {
  if (note < MIN_NOTE || note > MAX_NOTE) return;

  panningsynth.triggerAttack(Tone.Frequency(note, "midi"));

  animatePlay(onScreenKeyboard[note - MIN_NOTE], note, false);
  animateMachine(machinePlayer[note - MIN_NOTE]);
}

function animatePlay(keyEl, note, isHuman) {
  let sourceColor = isHuman ? "#1E88E5" : "#E91E63";
  let targetColor = isAccidental(note) ? "black" : "white";
  keyEl.animate(
    [{ backgroundColor: sourceColor }, { backgroundColor: targetColor }],
    { duration: 700, easing: "ease-out" }
  );
}
function animateMachine(keyEl) {
  keyEl.animate([{ opacity: 0.9 }, { opacity: 0 }], {
    duration: 700,
    easing: "ease-out"
  });
}

// Startup

function generateDummySequence() {
  // Generate a throwaway sequence to get the RNN loaded so it doesn't
  // cause jank later.
  return rnn.continueSequence(
    buildNoteSequence([{ note: 65, time: Tone.now() }], true),
    20,
    temperature,
    ["Cm"]
  );
}

let bufferLoadPromise = new Promise((res) => Tone.Buffer.on("load", res));

Promise.all([bufferLoadPromise, rnn.initialize()])
  .then(generateDummySequence)
  //.then(initBuildNoteSequence)
  .then(() => {
    Tone.Transport.start();
    onScreenKeyboardContainer.classList.add("loaded");
    document.querySelector(".loading").remove();
  });

StartAudioContext(Tone.context, document.documentElement);






// TRACKBALL CONTROLS 
/*
THREE.TrackballControls = function ( object, domElement ) {

	if ( domElement === undefined ) console.warn( 'THREE.TrackballControls: The second parameter "domElement" is now mandatory.' );
	if ( domElement === document ) console.error( 'THREE.TrackballControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.' );

	var scope = this;
	var STATE = { NONE: - 1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

	this.object = object;
	this.domElement = domElement;

	// API

	this.enabled = true;

	this.screen = { left: 0, top: 0, width: 0, height: 0 };

	this.rotateSpeed = 1.0;
	this.zoomSpeed = 1.2;
	this.panSpeed = 0.3;

	this.noRotate = false;
	this.noZoom = false;
	this.noPan = false;

	this.staticMoving = false;
	this.dynamicDampingFactor = 0.2;

	this.minDistance = 0;
	this.maxDistance = Infinity;

	this.keys = [ 65 /, 83 , 68  ];

	this.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.ZOOM, RIGHT: THREE.MOUSE.PAN };

	// internals

	this.target = new THREE.Vector3();

	var EPS = 0.000001;

	var lastPosition = new THREE.Vector3();
	var lastZoom = 1;

	var _state = STATE.NONE,
		_keyState = STATE.NONE,

		_eye = new THREE.Vector3(),

		_movePrev = new THREE.Vector2(),
		_moveCurr = new THREE.Vector2(),

		_lastAxis = new THREE.Vector3(),
		_lastAngle = 0,

		_zoomStart = new THREE.Vector2(),
		_zoomEnd = new THREE.Vector2(),

		_touchZoomDistanceStart = 0,
		_touchZoomDistanceEnd = 0,

		_panStart = new THREE.Vector2(),
		_panEnd = new THREE.Vector2();

	// for reset

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.up0 = this.object.up.clone();
	this.zoom0 = this.object.zoom;

	// events

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };


	// methods

	this.handleResize = function () {

		var box = scope.domElement.getBoundingClientRect();
		// adjustments come from similar code in the jquery offset() function
		var d = scope.domElement.ownerDocument.documentElement;
		scope.screen.left = box.left + window.pageXOffset - d.clientLeft;
		scope.screen.top = box.top + window.pageYOffset - d.clientTop;
		scope.screen.width = box.width;
		scope.screen.height = box.height;

	};

	var getMouseOnScreen = ( function () {

		var vector = new THREE.Vector2();

		return function getMouseOnScreen( pageX, pageY ) {

			vector.set(
				( pageX - scope.screen.left ) / scope.screen.width,
				( pageY - scope.screen.top ) / scope.screen.height
			);

			return vector;

		};

	}() );

	var getMouseOnCircle = ( function () {

		var vector = new THREE.Vector2();

		return function getMouseOnCircle( pageX, pageY ) {

			vector.set(
				( ( pageX - scope.screen.width * 0.5 - scope.screen.left ) / ( scope.screen.width * 0.5 ) ),
				( ( scope.screen.height + 2 * ( scope.screen.top - pageY ) ) / scope.screen.width ) // screen.width intentional
			);

			return vector;

		};

	}() );

	this.rotateCamera = ( function () {

		var axis = new THREE.Vector3(),
			quaternion = new THREE.Quaternion(),
			eyeDirection = new THREE.Vector3(),
			objectUpDirection = new THREE.Vector3(),
			objectSidewaysDirection = new THREE.Vector3(),
			moveDirection = new THREE.Vector3(),
			angle;

		return function rotateCamera() {

			moveDirection.set( _moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0 );
			angle = moveDirection.length();

			if ( angle ) {

				_eye.copy( scope.object.position ).sub( scope.target );

				eyeDirection.copy( _eye ).normalize();
				objectUpDirection.copy( scope.object.up ).normalize();
				objectSidewaysDirection.crossVectors( objectUpDirection, eyeDirection ).normalize();

				objectUpDirection.setLength( _moveCurr.y - _movePrev.y );
				objectSidewaysDirection.setLength( _moveCurr.x - _movePrev.x );

				moveDirection.copy( objectUpDirection.add( objectSidewaysDirection ) );

				axis.crossVectors( moveDirection, _eye ).normalize();

				angle *= scope.rotateSpeed;
				quaternion.setFromAxisAngle( axis, angle );

				_eye.applyQuaternion( quaternion );
				scope.object.up.applyQuaternion( quaternion );

				_lastAxis.copy( axis );
				_lastAngle = angle;

			} else if ( ! scope.staticMoving && _lastAngle ) {

				_lastAngle *= Math.sqrt( 1.0 - scope.dynamicDampingFactor );
				_eye.copy( scope.object.position ).sub( scope.target );
				quaternion.setFromAxisAngle( _lastAxis, _lastAngle );
				_eye.applyQuaternion( quaternion );
				scope.object.up.applyQuaternion( quaternion );

			}

			_movePrev.copy( _moveCurr );

		};

	}() );


	this.zoomCamera = function () {

		var factor;

		if ( _state === STATE.TOUCH_ZOOM_PAN ) {

			factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
			_touchZoomDistanceStart = _touchZoomDistanceEnd;

			if ( scope.object.isPerspectiveCamera ) {

				_eye.multiplyScalar( factor );

			} else if ( scope.object.isOrthographicCamera ) {

				scope.object.zoom *= factor;
				scope.object.updateProjectionMatrix();

			} else {

				console.warn( 'THREE.TrackballControls: Unsupported camera type' );

			}

		} else {

			factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * scope.zoomSpeed;

			if ( factor !== 1.0 && factor > 0.0 ) {

				if ( scope.object.isPerspectiveCamera ) {

					_eye.multiplyScalar( factor );

				} else if ( scope.object.isOrthographicCamera ) {

					scope.object.zoom /= factor;
					scope.object.updateProjectionMatrix();

				} else {

					console.warn( 'THREE.TrackballControls: Unsupported camera type' );

				}

			}

			if ( scope.staticMoving ) {

				_zoomStart.copy( _zoomEnd );

			} else {

				_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;

			}

		}

	};

	this.panCamera = ( function () {

		var mouseChange = new THREE.Vector2(),
			objectUp = new THREE.Vector3(),
			pan = new THREE.Vector3();

		return function panCamera() {

			mouseChange.copy( _panEnd ).sub( _panStart );

			if ( mouseChange.lengthSq() ) {

				if ( scope.object.isOrthographicCamera ) {

					var scale_x = ( scope.object.right - scope.object.left ) / scope.object.zoom / scope.domElement.clientWidth;
					var scale_y = ( scope.object.top - scope.object.bottom ) / scope.object.zoom / scope.domElement.clientWidth;

					mouseChange.x *= scale_x;
					mouseChange.y *= scale_y;

				}

				mouseChange.multiplyScalar( _eye.length() * scope.panSpeed );

				pan.copy( _eye ).cross( scope.object.up ).setLength( mouseChange.x );
				pan.add( objectUp.copy( scope.object.up ).setLength( mouseChange.y ) );

				scope.object.position.add( pan );
				scope.target.add( pan );

				if ( scope.staticMoving ) {

					_panStart.copy( _panEnd );

				} else {

					_panStart.add( mouseChange.subVectors( _panEnd, _panStart ).multiplyScalar( scope.dynamicDampingFactor ) );

				}

			}

		};

	}() );

	this.checkDistances = function () {

		if ( ! scope.noZoom || ! scope.noPan ) {

			if ( _eye.lengthSq() > scope.maxDistance * scope.maxDistance ) {

				scope.object.position.addVectors( scope.target, _eye.setLength( scope.maxDistance ) );
				_zoomStart.copy( _zoomEnd );

			}

			if ( _eye.lengthSq() < scope.minDistance * scope.minDistance ) {

				scope.object.position.addVectors( scope.target, _eye.setLength( scope.minDistance ) );
				_zoomStart.copy( _zoomEnd );

			}

		}

	};

	this.update = function () {

		_eye.subVectors( scope.object.position, scope.target );

		if ( ! scope.noRotate ) {

			scope.rotateCamera();

		}

		if ( ! scope.noZoom ) {

			scope.zoomCamera();

		}

		if ( ! scope.noPan ) {

			scope.panCamera();

		}

		scope.object.position.addVectors( scope.target, _eye );

		if ( scope.object.isPerspectiveCamera ) {

			scope.checkDistances();

			scope.object.lookAt( scope.target );

			if ( lastPosition.distanceToSquared( scope.object.position ) > EPS ) {

				scope.dispatchEvent( changeEvent );

				lastPosition.copy( scope.object.position );

			}

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.lookAt( scope.target );

			if ( lastPosition.distanceToSquared( scope.object.position ) > EPS || lastZoom !== scope.object.zoom ) {

				scope.dispatchEvent( changeEvent );

				lastPosition.copy( scope.object.position );
				lastZoom = scope.object.zoom;

			}

		} else {

			console.warn( 'THREE.TrackballControls: Unsupported camera type' );

		}

	};

	this.reset = function () {

		_state = STATE.NONE;
		_keyState = STATE.NONE;

		scope.target.copy( scope.target0 );
		scope.object.position.copy( scope.position0 );
		scope.object.up.copy( scope.up0 );
		scope.object.zoom = scope.zoom0;

		scope.object.updateProjectionMatrix();

		_eye.subVectors( scope.object.position, scope.target );

		scope.object.lookAt( scope.target );

		scope.dispatchEvent( changeEvent );

		lastPosition.copy( scope.object.position );
		lastZoom = scope.object.zoom;

	};

	// listeners

	function onPointerDown( event ) {

		if ( scope.enabled === false ) return;

		switch ( event.pointerType ) {

			case 'mouse':
			case 'pen':
				onMouseDown( event );
				break;

			// TODO touch

		}

	}

	function onPointerMove( event ) {

		if ( scope.enabled === false ) return;

		switch ( event.pointerType ) {

			case 'mouse':
			case 'pen':
				onMouseMove( event );
				break;

			// TODO touch

		}

	}

	function onPointerUp( event ) {

		if ( scope.enabled === false ) return;

		switch ( event.pointerType ) {

			case 'mouse':
			case 'pen':
				onMouseUp( event );
				break;

			// TODO touch

		}

	}

	function keydown( event ) {

		if ( scope.enabled === false ) return;

		window.removeEventListener( 'keydown', keydown );

		if ( _keyState !== STATE.NONE ) {

			return;

		} else if ( event.keyCode === scope.keys[ STATE.ROTATE ] && ! scope.noRotate ) {

			_keyState = STATE.ROTATE;

		} else if ( event.keyCode === scope.keys[ STATE.ZOOM ] && ! scope.noZoom ) {

			_keyState = STATE.ZOOM;

		} else if ( event.keyCode === scope.keys[ STATE.PAN ] && ! scope.noPan ) {

			_keyState = STATE.PAN;

		}

	}

	function keyup() {

		if ( scope.enabled === false ) return;

		_keyState = STATE.NONE;

		window.addEventListener( 'keydown', keydown, false );

	}

	function onMouseDown( event ) {

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.NONE ) {

			switch ( event.button ) {

				case scope.mouseButtons.LEFT:
					_state = STATE.ROTATE;
					break;

				case scope.mouseButtons.MIDDLE:
					_state = STATE.ZOOM;
					break;

				case scope.mouseButtons.RIGHT:
					_state = STATE.PAN;
					break;

				default:
					_state = STATE.NONE;

			}

		}

		var state = ( _keyState !== STATE.NONE ) ? _keyState : _state;

		if ( state === STATE.ROTATE && ! scope.noRotate ) {

			_moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );
			_movePrev.copy( _moveCurr );

		} else if ( state === STATE.ZOOM && ! scope.noZoom ) {

			_zoomStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_zoomEnd.copy( _zoomStart );

		} else if ( state === STATE.PAN && ! scope.noPan ) {

			_panStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_panEnd.copy( _panStart );

		}

		scope.domElement.ownerDocument.addEventListener( 'pointermove', onPointerMove, false );
		scope.domElement.ownerDocument.addEventListener( 'pointerup', onPointerUp, false );

		scope.dispatchEvent( startEvent );

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		var state = ( _keyState !== STATE.NONE ) ? _keyState : _state;

		if ( state === STATE.ROTATE && ! scope.noRotate ) {

			_movePrev.copy( _moveCurr );
			_moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );

		} else if ( state === STATE.ZOOM && ! scope.noZoom ) {

			_zoomEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		} else if ( state === STATE.PAN && ! scope.noPan ) {

			_panEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		}

	}

	function onMouseUp( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		_state = STATE.NONE;

		scope.domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove );
		scope.domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp );

		scope.dispatchEvent( endEvent );

	}

	function mousewheel( event ) {

		if ( scope.enabled === false ) return;

		if ( scope.noZoom === true ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.deltaMode ) {

			case 2:
				// Zoom in pages
				_zoomStart.y -= event.deltaY * 0.025;
				break;

			case 1:
				// Zoom in lines
				_zoomStart.y -= event.deltaY * 0.01;
				break;

			default:
				// undefined, 0, assume pixels
				_zoomStart.y -= event.deltaY * 0.00025;
				break;

		}

		scope.dispatchEvent( startEvent );
		scope.dispatchEvent( endEvent );

	}

	function touchstart( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( event.touches.length ) {

			case 1:
				_state = STATE.TOUCH_ROTATE;
				_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_movePrev.copy( _moveCurr );
				break;

			default: // 2 or more
				_state = STATE.TOUCH_ZOOM_PAN;
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panStart.copy( getMouseOnScreen( x, y ) );
				_panEnd.copy( _panStart );
				break;

		}

		scope.dispatchEvent( startEvent );

	}

	function touchmove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1:
				_movePrev.copy( _moveCurr );
				_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				break;

			default: // 2 or more
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panEnd.copy( getMouseOnScreen( x, y ) );
				break;

		}

	}

	function touchend( event ) {

		if ( scope.enabled === false ) return;

		switch ( event.touches.length ) {

			case 0:
				_state = STATE.NONE;
				break;

			case 1:
				_state = STATE.TOUCH_ROTATE;
				_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_movePrev.copy( _moveCurr );
				break;

		}

		scope.dispatchEvent( endEvent );

	}

	function contextmenu( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

	}

	this.dispose = function () {

		scope.domElement.removeEventListener( 'contextmenu', contextmenu, false );

		scope.domElement.removeEventListener( 'pointerdown', onPointerDown, false );
		scope.domElement.removeEventListener( 'wheel', mousewheel, false );

		scope.domElement.removeEventListener( 'touchstart', touchstart, false );
		scope.domElement.removeEventListener( 'touchend', touchend, false );
		scope.domElement.removeEventListener( 'touchmove', touchmove, false );

		scope.domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove, false );
		scope.domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp, false );

		window.removeEventListener( 'keydown', keydown, false );
		window.removeEventListener( 'keyup', keyup, false );

	};

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );

	this.domElement.addEventListener( 'pointerdown', onPointerDown, false );
	this.domElement.addEventListener( 'wheel', mousewheel, false );

	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );

	this.domElement.ownerDocument.addEventListener( 'pointermove', onPointerMove, false );
	this.domElement.ownerDocument.addEventListener( 'pointerup', onPointerUp, false );

	window.addEventListener( 'keydown', keydown, false );
	window.addEventListener( 'keyup', keyup, false );

	this.handleResize();

	// force an update at start
	this.update();

};

THREE.TrackballControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;
*/