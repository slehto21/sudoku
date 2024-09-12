export function validateInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input && input.tagName === 'INPUT' && input.type === 'text') {
        const value = input.value;

        if (!/^[1-9]$/.test(value)) {
            input.value = '';
        }
    }
}

(window as any).validateInput = validateInput;