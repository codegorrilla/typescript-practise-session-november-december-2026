// HOF
setTimeout(() => {
	greet();
}, 2000);

// closures

function hello() {
	console.log("Hello world");
	let name = "Sanjib";

	function inner() {
		console.log(`Hello ${name}`);
	}

	return inner;
}

const greet = hello();

console.log(greet);

//greet();
