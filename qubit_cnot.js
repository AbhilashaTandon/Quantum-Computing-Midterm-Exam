const qubit_point_names = ["|0⟩", "|+⟩", "|1⟩", "|-⟩"];
let control_qubit_state = [0, 1, 2, 3];
let target_qubit_state = [0, 1, 2, 3];

function compare_arrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

const control_image = document.querySelector(".control_image");
const target_image = document.querySelector(".target_image");

function assign_class(arr, class_name) {
    if (compare_arrays(control_qubit_state, arr)) {
        control_image.classList.remove(...control_image.classList);
        control_image.classList.add("image");
        control_image.classList.add(class_name);
    }

    if (compare_arrays(target_qubit_state, arr)) {
        target_image.classList.remove(...target_image.classList);
        target_image.classList.add("image");
        target_image.classList.add(class_name);
    }
}

function sync() {
    document.getElementById("control-top-left-label").innerHTML =
        qubit_point_names[control_qubit_state[0]];
    document.getElementById("control-top-right-label").innerHTML =
        qubit_point_names[control_qubit_state[1]];
    document.getElementById("control-bottom-right-label").innerHTML =
        qubit_point_names[control_qubit_state[2]];
    document.getElementById("control-bottom-left-label").innerHTML =
        qubit_point_names[control_qubit_state[3]];

    document.getElementById("target-top-left-label").innerHTML =
        qubit_point_names[target_qubit_state[0]];
    document.getElementById("target-top-right-label").innerHTML =
        qubit_point_names[target_qubit_state[1]];
    document.getElementById("target-bottom-right-label").innerHTML =
        qubit_point_names[target_qubit_state[2]];
    document.getElementById("target-bottom-left-label").innerHTML =
        qubit_point_names[target_qubit_state[3]];

    if (compare_arrays(control_qubit_state, [0, 1, 2, 3])) {
        control_image.classList.remove(...control_image.classList);
        control_image.classList.add("image");
    }

    if (compare_arrays(target_qubit_state, [0, 1, 2, 3])) {
        target_image.classList.remove(...target_image.classList);
        target_image.classList.add("image");
    }

    assign_class([2, 1, 0, 3], "x");
    assign_class([0, 3, 2, 1], "z");
    assign_class([2, 3, 0, 1], "y");

    assign_class([1, 0, 3, 2], "h");
    assign_class([3, 2, 1, 0], "x_flip");
    assign_class([1, 2, 3, 0], "y_270");
    assign_class([3, 0, 1, 2], "y_90");
}

function reset() {
    control_qubit_state = [0, 1, 2, 3];
    target_qubit_state = [0, 1, 2, 3];

    sync();

    control_image.classList.remove(
        "x",
        "y",
        "z",
        "h",
        "x_flip",
        "y_90",
        "y_270",
    );
    target_image.classList.remove(
        "x",
        "y",
        "z",
        "h",
        "x_flip",
        "y_90",
        "y_270",
    );
}

function control_0() {
    control_qubit_state = [0, 1, 2, 3];
    sync();
}

function control_plus() {
    control_qubit_state = [1, 2, 3, 0];
    sync();
}

function control_1() {
    control_qubit_state = [2, 3, 0, 1];
    sync();
}

function control_minus() {
    control_qubit_state = [3, 0, 1, 2];
    sync();
}

function target_0() {
    target_qubit_state = [0, 1, 2, 3];
    sync();
}

function target_plus() {
    target_qubit_state = [1, 2, 3, 0];
    sync();
}

function target_1() {
    target_qubit_state = [2, 3, 0, 1];
    sync();
}

function target_minus() {
    target_qubit_state = [3, 0, 1, 2];
    sync();
}

function cnot() {
    if (control_qubit_state[0] == 0) {
        return;
    } else if (control_qubit_state[0] == 2) {
        target_qubit_state = [
            [2, 1, 0, 3][target_qubit_state[0]],
            [2, 1, 0, 3][target_qubit_state[1]],
            [2, 1, 0, 3][target_qubit_state[2]],
            [2, 1, 0, 3][target_qubit_state[3]],
        ];
    } else {
        alert("entangled state!");
    }

    sync();
}
