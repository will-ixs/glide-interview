//would expect key in some other form, either stored with kms or dotenv 
//using dotenv since this is how the password hash is setup in auth.ts
const ENCRYPTION_KEY = process.env.SSN_ENCRYPTION_KEY || '01234567'.repeat(4); 

const ALGORITHM = 'AES-GCM';
const IV_LENGTH = 12; // GCM standard IV length is 12 bytes

async function getCryptoKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    Buffer.from(ENCRYPTION_KEY, 'utf-8'),
    ALGORITHM,
    false,
    ['encrypt', 'decrypt']
  );
}

//Encrypt plaintext string into base64 using AES 256
export async function encrypt(plaintext: string): Promise<string> {
  const key = await getCryptoKey();
  const dataBuffer = new TextEncoder().encode(plaintext);
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    dataBuffer
  );

  const fullBuffer = new Uint8Array(iv.length + encryptedBuffer.byteLength);
  fullBuffer.set(iv, 0);
  fullBuffer.set(new Uint8Array(encryptedBuffer), iv.length);
  
  return Buffer.from(fullBuffer).toString('base64');
}

//Decrypt base64 string into plaintext using AES 256
export async function decrypt(base64Ciphertext: string): Promise<string> {
  const key = await getCryptoKey();
  const fullBuffer = Buffer.from(base64Ciphertext, 'base64');
  //separate initialization vector
  const iv = fullBuffer.subarray(0, IV_LENGTH);
  const encryptedBuffer = fullBuffer.subarray(IV_LENGTH);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    key,
    encryptedBuffer
  );

  return new TextDecoder().decode(decryptedBuffer);
}