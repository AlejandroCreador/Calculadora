const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let displayValue = '';

function updateDisplay() {
    display.textContent = displayValue || '0';
    display.scrollLeft = display.scrollWidth; // Desplaza el contenido hacia la derecha
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('operator')) {
            if (value === 'C') {
                displayValue = '';
            } else {
                const lastChar = displayValue.slice(-1);
                if ('+-×÷−'.includes(lastChar)) {
                    displayValue = displayValue.slice(0, -1);
                }
                displayValue += value;
            }
        } else if (button.classList.contains('equal')) {
            try {
                const sanitizedValue = displayValue
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/−/g, '-');
                displayValue = eval(sanitizedValue).toString();
            } catch (error) {
                displayValue = 'Error';
            }
        } else if (button.classList.contains('number')) {
            displayValue += value;
        }

        updateDisplay();
    });
});
