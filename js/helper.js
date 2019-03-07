function norm(val, min, max) { return (val - min) / (max - min); }


function minMaxArr(arr) {
    let max = - Infinity;
    let min = Infinity;
    arr.forEach((a) => {
        if(a instanceof Array) {
            const minMax = minMaxArr(a);
            if(minMax.min < min) min = minMax.min;
            if(minMax.max > max) max = minMax.max;
        } else {
            if(a < min) min = a;
            if(a > max) max = a;
        }
    });
    return {min: min, max: max};
}

function nomrArray(arr, min, max) {
    arr.forEach((a, ak) => {
        if(a instanceof Array) {
            arr[ak] = nomrArray(arr[ak], min, max);
        } else {
            arr[ak] = norm(arr[ak], min, max);
        }
    });
    return arr;
}


function normRecurArray(arrs) {
    const minMax = minMaxArr(arrs);
    arrs = nomrArray(arrs, minMax.min, minMax.max);
    return arrs;
}