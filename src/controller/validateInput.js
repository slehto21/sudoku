export function validateInput(event) {
    const input = event.target;
    if (input && input.tagName === 'INPUT' && input.type === 'text') {
        const value = input.value;
        if (!/^[1-9]$/.test(value)) {
            input.value = '';
        }
    }
}
window.validateInput = validateInput;
