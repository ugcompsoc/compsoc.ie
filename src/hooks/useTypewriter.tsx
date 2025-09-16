import { useEffect, useState } from "react";

export const useTypewriter = (words: string[], speed = 100, delay = 1000) => {
	const [text, setText] = useState("");
	const [index, setIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [charIndex, setCharIndex] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(
			() => {
				if (!isDeleting) {
					// Typing effect
					if (charIndex < words[index].length) {
						setText((prev) => prev + words[index][charIndex]);
						setCharIndex(charIndex + 1);
					} else {
						setTimeout(() => setIsDeleting(true), delay);
					}
				} else {
					// Deleting effect
					if (charIndex > 0) {
						setText(words[index].slice(0, charIndex - 1));
						setCharIndex(charIndex - 1);
					} else {
						setIsDeleting(false);
						setIndex((prev) => (prev + 1) % words.length);
					}
				}
			},
			isDeleting ? speed / 2 : speed,
		);

		return () => clearTimeout(timeout);
	}, [text, isDeleting, charIndex, index, words, speed, delay]);

	return text;
};
