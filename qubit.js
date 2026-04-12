const qubit_point_names = ["|0⟩", "|+⟩", "|1⟩", "|-⟩"];
let qubit_state = [0, 1, 2, 3];

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

const image = document.querySelector(".image");

function assign_class(arr, class_name) {
        if (compare_arrays(qubit_state, arr)) {
                image.classList.remove(...image.classList);
                image.classList.add("image");
                image.classList.add(class_name);
        }
}

function sync() {
        document.getElementById("top-left-label").innerHTML =
                qubit_point_names[qubit_state[0]];
        document.getElementById("top-right-label").innerHTML =
                qubit_point_names[qubit_state[1]];
        document.getElementById("bottom-right-label").innerHTML =
                qubit_point_names[qubit_state[2]];
        document.getElementById("bottom-left-label").innerHTML =
                qubit_point_names[qubit_state[3]];

        if (compare_arrays(qubit_state, [0, 1, 2, 3])) {
                image.classList.remove(...image.classList);
                image.classList.add("image");
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
        qubit_state = [0, 1, 2, 3];

        sync();

        image.classList.remove("x", "y", "z", "h", "x_flip", "y_90", "y_270");
}

function x_gate(value) {
        return [2, 1, 0, 3][value];
}

function y_gate(value) {
        return [2, 3, 0, 1][value];
}

function z_gate(value) {
        return [0, 3, 2, 1][value];
}

function h_gate(value) {
        return [1, 0, 3, 2][value];
}

function x_180() {
        qubit_state = [
                x_gate(qubit_state[0]),
                x_gate(qubit_state[1]),
                x_gate(qubit_state[2]),
                x_gate(qubit_state[3]),
        ];

        sync();
}

function y_180() {
        qubit_state = [
                y_gate(qubit_state[0]),
                y_gate(qubit_state[1]),
                y_gate(qubit_state[2]),
                y_gate(qubit_state[3]),
        ];

        sync();
}

function z_180() {
        qubit_state = [
                z_gate(qubit_state[0]),
                z_gate(qubit_state[1]),
                z_gate(qubit_state[2]),
                z_gate(qubit_state[3]),
        ];

        sync();
}

function hadamard() {
        qubit_state = [
                h_gate(qubit_state[0]),
                h_gate(qubit_state[1]),
                h_gate(qubit_state[2]),
                h_gate(qubit_state[3]),
        ];

        sync();
}
