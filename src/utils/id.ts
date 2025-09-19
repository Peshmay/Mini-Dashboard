export const uid = () => crypto.getRandomValues(new Uint32Array(1))[0].toString(16)
export const nowIso = () => new Date().toISOString()
