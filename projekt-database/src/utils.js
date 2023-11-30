export function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export const handlePictureChange = (setBook) => (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
        setBook(prev => ({
            ...prev,
            [e.target.name]: arrayBufferToBase64(reader.result)
        }));
        console.log(arrayBufferToBase64(reader.result))
    };
};