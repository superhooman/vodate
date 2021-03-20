const secretKey = process.env.APIKEY

const isValidSign = (fullBridgeResponse) => {
    if (
        typeof fullBridgeResponse !== 'string' && typeof fullBridgeResponse !== 'object'
        || typeof secretKey !== 'string'
    ) {
        throw new Error('Can accept string or object as first argument and string as second argument only');
    }

    const { sign: inputSign, ...bridgeResponse } = typeof fullBridgeResponse === 'object'
        ? fullBridgeResponse
        : JSON.parse(fullBridgeResponse);

    const hmac = require('crypto').createHmac('sha256', secretKey);
    const base64URLUnsafeHash = hmac.update(makeStringToHash(bridgeResponse)).digest('base64');
    const calculatedSign = base64URLUnsafeHash.replace(/\+/g, '-').replace(/\//g, '_');

    return inputSign === calculatedSign;

    function makeStringToHash(input) {
        if (Array.isArray(input)) {
            return input.map(makeStringToHash).join('');
        } else if (typeof input === 'object') {
            return Object.keys(input)
                .filter((key) => input[key] && (!Array.isArray(input[key]) || input[key].length > 0) && (typeof input[key] !== 'object' || Object.keys(input[key]).length > 0))
                .sort()
                .map((key) => `${key}:${makeStringToHash(input[key])}`)
                .join('');
        } else {
            return String(input);
        }
    }
}

module.exports = isValidSign;