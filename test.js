function base64ToArray(base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const  a = base64ToArray('BErn70aTeOMIGKiqGrmEZRR6NDpPZh25uQK7u_GITYPWmeUoP35JwUkqwohWiLlujd30QNvAOtaQbOV3PDC8rPc')

console.log(a)