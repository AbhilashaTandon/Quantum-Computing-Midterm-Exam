const qubit_point_names = ["|0⟩", "|+⟩", "|1⟩", "|-⟩"];
let qubit_state = [0, 1, 2, 3];

function sync() {
  document.getElementById("top-label").innerHTML =
    qubit_point_names[qubit_state[0]];
  document.getElementById("bottom-label").innerHTML =
    qubit_point_names[qubit_state[1]];
  document.getElementById("right-label").innerHTML =
    qubit_point_names[qubit_state[2]];
  document.getElementById("left-label").innerHTML =
    qubit_point_names[qubit_state[3]];
}

function reset() {
  qubit_state = [0, 1, 2, 3];
}

function x_180() {
  qubit_state = [
    qubit_state[1],
    qubit_state[0],
    qubit_state[2],
    qubit_state[3],
  ];

  sync();
}

function y_180() {
  qubit_state = [
    qubit_state[1],
    qubit_state[0],
    qubit_state[3],
    qubit_state[2],
  ];
  sync();
}

function z_180() {
  qubit_state = [
    qubit_state[0],
    qubit_state[1],
    qubit_state[3],
    qubit_state[2],
  ];
  sync();
}
function hadamard() {
  qubit_state = [
    qubit_state[2],
    qubit_state[3],
    qubit_state[0],
    qubit_state[1],
  ];
  sync();
}
