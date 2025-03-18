import { NativeModules } from "react-native";
import sjcl from "sjcl";

declare global {
  interface Global {
    Buffer: typeof Buffer;
  }
}

if (typeof Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

const RNRandomBytes = NativeModules.RNRandomBytes;

function noop(): void {}

function toBuffer(nativeStr: string): Buffer {
  return Buffer.from(nativeStr, "base64");
}

function init(): void {
  if (RNRandomBytes.seed) {
    let seedBuffer = toBuffer(RNRandomBytes.seed);
    addEntropy(seedBuffer);
  } else {
    seedSJCL();
  }
}

function addEntropy(entropyBuf: Buffer): void {
  let hexString = entropyBuf.toString("hex");
  let stanfordSeed = sjcl.codec.hex.toBits(hexString);
  sjcl.random.addEntropy(stanfordSeed);
}

export function seedSJCL(cb: (err?: Error) => void = noop): void {
  randomBytes(4096, (err, buffer) => {
    if (err) return cb(err);
    addEntropy(buffer!);
  });
}

export function randomBytes(
  length: number,
  cb?: (err: Error | null, buffer?: Buffer) => void
): Buffer | void {
  if (!cb) {
    let size = length;
    let wordCount = Math.ceil(size * 0.25);
    let randomBytes = sjcl.random.randomWords(wordCount, 10);
    let hexString = sjcl.codec.hex.fromBits(randomBytes);
    hexString = hexString.substr(0, size * 2);
    return Buffer.from(hexString, "hex");
  }

  RNRandomBytes.randomBytes(length, (err: Error, base64String: string) => {
    if (err) {
      cb(err);
    } else {
      cb(null, toBuffer(base64String));
    }
  });
}

init();
