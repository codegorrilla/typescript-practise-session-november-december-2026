const textBuffer = Buffer.from("node");
console.log(textBuffer);
console.log(textBuffer.toString("utf-8"));
console.log(textBuffer.length);

const fixedBuffer = Buffer.alloc(6);
console.log(fixedBuffer);
fixedBuffer.write("Sanjib");
console.log(fixedBuffer);
console.log(fixedBuffer.toString("utf-8"));
console.log(fixedBuffer.toJSON());
const fixedBufferJson = fixedBuffer.toJSON();
console.log(Buffer.from(fixedBufferJson.data).toString("utf-8"));

// chunks
const chunks = [
	Buffer.from("Hello"),
	Buffer.from("Rishaan"),
	Buffer.from("Sanjib"),
];
const combineBuffer = Buffer.concat(chunks);
console.log(combineBuffer.toString("utf-8").split(""));
