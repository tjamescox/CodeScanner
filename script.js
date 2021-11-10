let input = document.querySelector('input');
let textarea = document.querySelector('textarea');

function searchTxtLinesForRuntimeFunctions(lines, runtimeFunctions) {
    lines.forEach(txtLines => {

        runtimeFunctions.forEach(runtimeFunc => {
            if(txtLines.includes(runtimeFunc))
                console.warn('WARNING: Dynamic Runtime Function ' + runtimeFunc + ') Detected');
                
        })
    })
}

input.addEventListener('change', () => {
    let files = input.files;

    if(files.length == 0) return;

    const file = files[0];

    const runtimeFunctions = ['eval(', 'setTimeout(', 'setInterval(', 'new Function('];

    let reader = new FileReader();

    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        textarea.value = lines.join('\n');
        console.log(file);

        searchTxtLinesForRuntimeFunctions(lines, runtimeFunctions);
    };

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);
})