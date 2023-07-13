import cowsay from "cowsay";

const motherEyes = "OO";
const kid = "..";

export const hello = () => {
	console.log(
		cowsay.say({ text: "Should I get up today", e: kid }),
		cowsay.think({ text: "But I hate mondays", e: kid }),
		cowsay.say({ text: "Nah not worth it", e: kid }),
		cowsay.say({ text: "GET THE FUCK UP!!", e: motherEyes }),
	);
};
