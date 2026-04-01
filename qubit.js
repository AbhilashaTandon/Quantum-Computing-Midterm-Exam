const qubit_point_names = ["|0⟩", "|1⟩", "|+⟩", "|-⟩", "|i+⟩", "|i-⟩"];

const base_colors = [
  [1, 0, 1],
  [0, 1, 0.2],
  [0.9, 0.9, 0],
  [0.41, 0.41, 1],
  [1, 1, 1],
  [0, 0, 0],
];

// let old_qubit_state = [0, 1, 2, 3, 4, 5];
let qubit_state = [0, 1, 2, 3, 4, 5];

//INITIAL STATE

// let startTime = Date.now() / 1000;

// let current_time = Date.now() / 1000 - startTime;

// let last_update = startTime;

function sync() {
  // old_qubit_state = qubit_state;

  document.getElementById("top-label").innerHTML =
    qubit_point_names[qubit_state[0]];
  document.getElementById("bottom-label").innerHTML =
    qubit_point_names[qubit_state[1]];
  document.getElementById("right-label").innerHTML =
    qubit_point_names[qubit_state[2]];
  document.getElementById("left-label").innerHTML =
    qubit_point_names[qubit_state[3]];

  // last_update = current_time;
}

function x_90() {
  qubit_state = [
    qubit_state[4],
    qubit_state[5],
    qubit_state[2],
    qubit_state[3],
    qubit_state[1],
    qubit_state[0],
  ];

  sync();
}

function x_180() {
  qubit_state = [
    qubit_state[1],
    qubit_state[0],
    qubit_state[2],
    qubit_state[3],
    qubit_state[5],
    qubit_state[4],
  ];

  sync();
}

function x_270() {
  qubit_state = [
    qubit_state[5],
    qubit_state[4],
    qubit_state[2],
    qubit_state[3],
    qubit_state[0],
    qubit_state[1],
  ];

  sync();
}
