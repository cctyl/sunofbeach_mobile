export default function easyCopy(text) {

    const input = document.createElement('INPUT');
    input.style.opacity = 0;
    input.style.position = 'absolute';
    input.style.left = '-100000px';
    document.body.appendChild(input);

    input.value = text;
    input.select();
    input.setSelectionRange(0, text.length);
    document.execCommand('copy');
    document.body.removeChild(input);
    return true;


}
