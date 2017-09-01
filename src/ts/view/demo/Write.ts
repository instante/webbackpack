export function Write(data:{message: string, color: string}, element:HTMLElement) {
    element.innerText = data.message;
    element.style.color = data.color;
}
