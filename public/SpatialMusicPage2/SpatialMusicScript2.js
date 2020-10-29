//Variables

/* Room dimension obtained from the parent window */
var roomDimensions = 1;

/* Temperature that would be computed from room dimension */
var temperature = 1.1;

/* Note that would be computed from frequency computed from room dimension */
var notefromdimension = 0;

/*URL for AI MusicRNN*/
var rnn = new mm.MusicRNN(
  "https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/chord_pitches_improv"
);

/* Sequence generation variables */
var currentSeed = [];
let stopCurrentSequenceGenerator;
var pannersynth;
var reverbsynth;
var reverb;

/*Min and Max notes supported by Majenta*/
const MIN_NOTE = 48;
const MAX_NOTE = 83;

/* Reverb computed from dimensions */
var reverbwetvalue = 1;

//STEPS
/*Step 1: Call function to get the room dimensions from the query parameters in the URL passed from parent.*/
getRoomDimensionsFromQuery();

/* Step2:Compute Frequency from provided dimensions*/
computeFrequencyAndTemperatureAndReverbFromDimensions();

/* Step 3: Create 3DPanners Spheres*/
create3DPannersAndSpheres();

/* Step 4: GenerateAIMusic and Play */
generateAIMusicFromNoteAndPlay({ add: notefromdimension });

//IMPLEMENTATION

/* Step 1: Create 3DPanners and associate them with the spheres */
function create3DPannersAndSpheres() {
  try {
    var whiteSphere = new Tone.Panner3D().toMaster();
    whiteSphere.panningModel = "HRTF";

    pannersynth = new Tone.Synth({
      oscillator: {
        type: "square"
      },
      envelope: {
        attack: 3,
        sustain: 1,
        release: 1
      }
    }).connect(whiteSphere);

    reverb = new Tone.Reverb({
      decay: 2.4,
      wet: reverbwetvalue
    }).toMaster();
    reverb.generate();
    reverb.wet.value = reverbwetvalue;

    var redSphere = new Tone.Panner3D().toMaster();
    redSphere.panningModel = "HRTF";
    // redSphere.connect(reverb);
    reverb.wet.value = reverbwetvalue;

    var x1 = new XMLHttpRequest();
    var drone;
    x1.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_sound_design_drone_atmos_cold_desolate_eerie_45183.mp3');
    // I put "XMLHttpRequest" here, but you can use anything you want.
    x1.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    x1.onload = function() {

         drone = new Tone.Player({
          url:
           //"https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_sound_design_drone_atmos_cold_desolate_eerie_45183.mp3",
          "https://cors-anywhere.herokuapp.com/https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_sound_design_drone_atmos_cold_desolate_eerie_45183.mp3",
          loop: true
        });
        drone
      .chain(reverb, redSphere, Tone.Master)
      .connect(redSphere)
      .sync()
      .start(0);
      
    };
        
    x1.send();


   /* var drone = new Tone.Player({
      url:
        //"https://raw.githubusercontent.com/Tonejs/tonejs.github.io/master/examples/audio/loop/drone.mp3",
      //"https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_sound_design_drone_atmos_cold_desolate_eerie_45183.mp3",
      "drone.mp3",
      loop: true
    }) */


    var pinkSphere = new Tone.Panner3D().toMaster();
    pinkSphere.panningModel = "HRTF";

    var repeat;
    var x = new XMLHttpRequest();
x.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_sound_design_drone_atmos_cold_desolate_eerie_45183.mp3');
// I put "XMLHttpRequest" here, but you can use anything you want.
x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
x.onload = function() {

     repeat = new Tone.Player({
      url:
       //"https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_sound_design_drone_atmos_cold_desolate_eerie_45183.mp3",
       //"bass-drone.mp3",
       "https://cors-anywhere.herokuapp.com/https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-55112/zapsplat_sound_design_cinematic_airy_drone_decaying_sub_rumble_56665.mp3",
      loop: true
    });
    repeat

   

      .chain(reverb, pinkSphere, Tone.Master)
      .connect(redSphere)
      .sync()
      .start(0);
};
x.send();


    reverb.wet.value = reverbwetvalue;

    var reverbSphere = new Tone.Panner3D().toMaster();
    reverbSphere.panningModel = "HRTF";
    reverb.generate();
    reverb.wet.value = 1;
    reverbsynth = new Tone.Synth({
      oscillator: {
        type: "square"
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0
      }
    }).connect(reverbSphere);
    reverb.generate();
    reverbsynth.connect(reverb);

    console.log(
      " Reverb synth wet value =" +
        reverb.wet.value +
        " Computed from dimensions =" +
        reverbwetvalue +
        " Note =" +
        notefromdimension
    );

   // if (Detector.webgl) {
    {
      var SCREEN_WIDTH = document.querySelector("#three").clientWidth;
      var SCREEN_HEIGHT = document.querySelector("#three").clientHeight;
      var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

      var pannerscene = new THREE.Scene();
      var pannercamera = new THREE.PerspectiveCamera(50, aspect, 1, 10000);
      pannercamera.position.z = 1;
      pannercamera.updateMatrixWorld();

      var whiteMesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(2, 16, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
      );
      pannerscene.add(whiteMesh);
      whiteMesh.position.z = -10;

      var reverbMesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 16, 8),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
      );
      pannerscene.add(reverbMesh);
      reverbMesh.position.z = -20;

      var redMesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 16, 8),
        new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
      );
      pannerscene.add(redMesh);

      var pinkMesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 16, 8),
        new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
      );
      pannerscene.add(pinkMesh);

      var renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      onWindowResize();
      renderer.domElement.style.position = "relative";
      document.querySelector("#three").appendChild(renderer.domElement);

      controls = new THREE.OrbitControls(pannercamera, renderer.domElement);
      controls.addEventListener("change", function () {
        //Temp
       Tone.Listener.setPosition(pannercamera.position.x, pannercamera.position.y, pannercamera.position.z);
        
       // console(" Tone listener position = "+ Tone.listener.positionX  + pannercamera.positionY + pannercamera.positionZ);S
        
      });
      //set the camera initially
      //Temp
     // Tone.Listener.setPosition(pannercamera);

      function onWindowResize(event) {
        SCREEN_WIDTH = document.querySelector("#three").clientWidth;
        SCREEN_HEIGHT = document.querySelector("#three").clientHeight;
        aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        pannercamera.aspect = aspect;
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        pannercamera.updateProjectionMatrix();
      }

      window.addEventListener("resize", onWindowResize);

      function animate() {
        requestAnimationFrame(animate);
        var r = Date.now() * 0.0005;
        pinkMesh.position.x = 3 * Math.cos(r);
        pinkMesh.position.z = 3 * Math.cos(r);
        pinkMesh.position.y = 3 * Math.sin(r);
        redMesh.position.x = 4 * Math.cos(2 * r);
        redMesh.position.z = 4 * Math.sin(2 * r);
        renderer.render(pannerscene, pannercamera);
        controls.update();
        
        //Temp

        //redSphere.setPosition(redMesh.positionX, redMesh.positionY, redMesh.positionZ);
       //whiteSphere.updatePosition(whiteMesh);
       // reverbSphere.updatePosition(reverbMesh);
       // pinkSphere.updatePosition(pinkMesh);
      }

      animate();

      console.log(" Step 3 Created spheres");
    }
  } catch (err) {
    console.log(
      " Exception thrown in creating spheres  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "err=" +
        err
    );
  }
}

/* Step 2: Get Room Dimensions From Query */
function getRoomDimensionsFromQuery() {
  try {
    var query = location.search.substring(1);

    if (query.indexOf("roomdimensions") != -1) {
      var keyValuePairs = query.split(/roomdimensions=/);
      if (keyValuePairs.length > 1) {
        var value = keyValuePairs[1];
        if (value.indexOf(";") != -1) {
          value = value.split(";");
          roomDimensions = value[0];
        }
      }
    }
    console.log(
      " Step 1: Got room Dimensions From Query as =" + roomDimensions
    );
  } catch (err) {
    console.log(
      " Exception thrown in getDimensionsFromQuery  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "err=" +
        err
    );
  }
}

function getAllMethodNames(obj) {
  let methods = new Set();
  while (obj = Reflect.getPrototypeOf(obj)) {
    let keys = Reflect.ownKeys(obj)
    keys.forEach((k) => methods.add(k));
  }
  return methods;
}

/* 
Step 3: Generate Frequency from room dimensions
*/
function computeFrequencyAndTemperatureAndReverbFromDimensions() {
  try {
    L = roomDimensions;
    W = roomDimensions;
    H = roomDimensions;

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

    freq1 = ax1;
console.log(" FREQ1=" + freq1);
    
    console.log ("Tone.frequencey = " + Tone.Frequency);
    
    var midi = Tone.Frequency.ftom(freq1);
    //Temp
    //var midi = MIN_NOTE+65;
    notefromdimension = midi;
    if (midi < MIN_NOTE) {
      notefromdimension = MIN_NOTE;
    }
    if (midi > MAX_NOTE) {
      notefromdimension = MAX_NOTE;
    }

    calculateTemperature();

    calculateReverb();
    console.log(
      " Step 2b: Computed reverb from dimensions ax1=" +
        ax1 +
        " m1=" +
        m1 +
        " L =" +
        L +
        " Note =" +
        notefromdimension +
        " Reverb = " +
        reverbwetvalue
    );
  } catch (err) {
    console.log(
      " Exception thrown in computeFrequencyAndTemperatureAndReverbFromDimensions  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "err=" +
        err
    );
  }
}
/*
 * Step 4: Start Music Generation with computed note by calling startSequence Generator to start music from AI
 */

function generateAIMusicFromNoteAndPlay({ add = null, remove = null }) {
  try {
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
  } catch (err) {
    console.log(
      " Exception thrown in generateAIMusicFromNoteAndPlay  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "err=" +
        err
    );
  }
}
/*
 *Start Sequence Generator to generator music from AI cleaned up function
 */

function startSequenceGenerator(seed) {
  try {
    let running = true,
      lastGenerationTask = Promise.resolve();
    let chords = detectChord(seed);
    let chord = _.first(chords) || "CM";

    let seedSeq = buildNoteSequencefromAI(seed, false);

    let generatedSequence =
      Math.random() < 0.7 ? _.clone(seedSeq.notes.map((n) => n.pitch)) : [];

    let launchWaitTime = getSequenceLaunchWaitTime(seed);
    console.log(" Launchtime =" + launchWaitTime);
    let playIntervalTime = getSequencePlayIntervalTime(seed);
    console.log(" Play Interval time =" + playIntervalTime);
    let generationIntervalTime = playIntervalTime / 2;
    console.log(" Generation Interval time =" + generationIntervalTime);

    function generateNext() {
      if (!running) {
        console.log(
          " DID NOT GENERATE NEXT NEXT RETURINING as running =" + running
        );
        return;
      }
      if (generatedSequence.length < 10) {
        lastGenerationTask = rnn
          .continueSequence(seedSeq, 20, temperature, [chord])
          .then((genSeq) => {
            generatedSequence = generatedSequence.concat(
              genSeq.notes.map((n) => n.pitch)
            );

            //console.log(" Step 4a: Generated AI Sequence =" + generatedSequence + " from note ="+ notefromdimension + " reverwetvalue=" +reverbwetvalue );
            setTimeout(generateNext, generationIntervalTime * 1000);
          });
      } else {
        setTimeout(generateNext, generationIntervalTime * 1000);
        //console.log (" Generate Seq < 10" + generatedSequence);
      }
    }
    function consumeNext(time) {
      if (generatedSequence.length) {
        let note = generatedSequence.shift();
        if (note > 0) {
          triggerNote(note, time);
        } else {
          console.log(
            " Consume next note is 0 " +
              generatedSequence +
              " Note=" +
              notefromdimension +
              " reverwetvalue=" +
              reverbwetvalue +
              " room dimension=" +
              roomDimensions +
              " seed=" +
              seed
          );
        }
      } else {
        console.log(
          " Consume next lengh is 0 " +
            generatedSequence +
            " Note=" +
            notefromdimension +
            " reverwetvalue=" +
            reverbwetvalue +
            " room dimension=" +
            roomDimensions +
            " seed=" +
            seed
        );
        console.log(
          " consumeNext Generate Seq len=0 " +
            generatedSequence +
            " time =" +
            time
        );
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
  } catch (err) {
    console.log(
      " Exception thrown in startSequenceGenerator  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        " seed =" +
        seed +
        "err=" +
        err
    );
  }
}

/* 
Helper function for Sequence Generator
*/
function getSequenceLaunchWaitTime(seed) {
  try {
    if (seed.length <= 1) {
      return 1;
    }
    let intervals = getSeedIntervals(seed);
    let maxInterval = _.max(intervals);
    return maxInterval * 2;
  } catch (err) {
    console.log(
      " Exception thrown in getSequenceLaunchWaitTime  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "seed = " +
        seed +
        "err=" +
        err
    );
  }
}

/* 
Helper function for Sequence Generator
*/
function getSequencePlayIntervalTime(seed) {
  try {
    if (seed.length <= 1) {
      return Tone.Time("8n").toSeconds();
    }
    let intervals = getSeedIntervals(seed).sort();
    return _.first(intervals);
  } catch (err) {
    console.log(
      " Exception thrown in getSequencePlayIntervalTime  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "seed =" +
        seed +
        "err=" +
        err
    );
  }
}

/* 
Helper function for Sequence Generator
*/
function getSeedIntervals(seed) {
  try {
    let intervals = [];
    for (let i = 0; i < seed.length - 1; i++) {
      let rawInterval = seed[i + 1].time - seed[i].time;
      let measure = _.minBy(["8n", "4n"], (subdiv) =>
        Math.abs(rawInterval - Tone.Time(subdiv).toSeconds())
      );
      intervals.push(Tone.Time(measure).toSeconds());
    }
    return intervals;
  } catch (err) {
    console.log(
      " Exception thrown in getSeedIntervals  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "seed=" +
        seed +
        "err=" +
        err
    );
  }
}

function detectChord(notes) {
  try {
    notes = notes.map((n) => Tonal.Note.pc(Tonal.Note.fromMidi(n.note))).sort();
    return Tonal.PcSet.modes(notes)
      .map((mode, i) => {
        const tonic = Tonal.Note.name(notes[i]);
        const names = Tonal.Dictionary.chord.names(mode);
        return names.length ? tonic + names[0] : null;
      })
      .filter((x) => x);
  } catch (err) {
    console.log(
      " Exception thrown in detectchord  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "notes =" +
        notes +
        "err=" +
        err
    );
  }
}

/*
Call Note Sequence generation using AI
*/
function buildNoteSequencefromAI(seed, isDummy) {
  try {
    mynewseed = [];

    if (isDummy) {
      // For the first time loading, a dummy note is used for generating a dummy sequence, in which case just the seed to the value passed to this function.
      mynewseed = seed;
    } else {
      //Set the seed to be the note computed from dimension
      mynewseed = [];
      mynewseed.push({ note: notefromdimension, time: Tone.now() });
    }

    // Call Majenta API quantizeNoteSequence with the computed note under notes.
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
  } catch (err) {
    console.log(
      " Exception thrown in buildNoteSequenceFromAI  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        " seed=" +
        seed +
        " dummy=" +
        dummy +
        "err=" +
        err
    );
  }
}

function triggerNote(note, time) {
  try {
    if (note < MIN_NOTE || note > MAX_NOTE) {
      return;
    }
    if (notefromdimension < 65) {
      reverbsynth.triggerAttack(Tone.Frequency(note, "midi"));
    } else {
      pannersynth.triggerAttack(Tone.Frequency(note, "midi"));
    }
  } catch (err) {
    console.log(
      " Exception thrown in triggerNote  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        " note=" +
        note +
        " time=" +
        time +
        "err=" +
        err
    );
  }
}

function generateDummySequence() {
  try {
    // Generate a throwaway sequence to get the RNN loaded so it doesn't
    // cause jank later.
    console.log(" Generting Dummy");
    return rnn.continueSequence(
      buildNoteSequencefromAI([{ note: 65, time: Tone.now() }], true),
      20,
      temperature,
      ["Cm"]
    );
  } catch (err) {
    console.log(
      " Exception thrown in generateDummySequence  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "err=" +
        err
    );
  }
}

//Helper functions

//Calculate Temperature from note
function calculateTemperature() {
  try {
    if (notefromdimension < 53) {
      temperature = 0.4;
    } else if (notefromdimension < 60) {
      temperature = 0.8;
    } else if (notefromdimension < 67) {
      temperature = 1.2;
    } else if (notefromdimension < 73) {
      temperature = 1.6;
    } else if (notefromdimension < MAX_NOTE) {
      temperature = 2;
    }
    console.log(
      " Step 2a: Temperature =" +
        temperature +
        " from note =" +
        notefromdimension +
        " Room size=" +
        roomDimensions
    );
  } catch (err) {
    console.log(
      " Exception thrown in calculateTemperature  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "err=" +
        err
    );
  }
}

//Calculate Temperature from note
function calculateReverb() {
  try {
    if (notefromdimension < 53) {
      reverbwetvalue = 0;
    } else if (notefromdimension < 60) {
      reverbwetvalue = 0.25;
    } else if (notefromdimension < 67) {
      reverbwetvalue = 0.5;
    } else if (notefromdimension < 73) {
      reverbwetvalue = 0.75;
    } else if (notefromdimension < MAX_NOTE) {
      reverbwetvalue = 1;
    }
  } catch (err) {
    console.log(
      " Exception thrown in calculateReverb  =" +
        " Temperature =" +
        temperature +
        " reverbwebvalue =" +
        reverbwetvalue +
        " note =" +
        notefromdimension +
        " Dimensions =" +
        roomDimensions +
        "err=" +
        err
    );
  }
}

let bufferLoadPromise = new Promise((res) => Tone.Buffer.on("load", res));

Promise.all([bufferLoadPromise, rnn.initialize()])
  .then(generateDummySequence)
  .then(() => {
    Tone.Transport.start();
  });

StartAudioContext(Tone.context, document.documentElement);

$(document).ready(function () {
  var btn = $(".button");
  btn.click(function () {
    btn.toggleClass("paused");
    return false;
  });
});