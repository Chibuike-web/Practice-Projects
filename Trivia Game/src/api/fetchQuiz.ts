export async function fetchQuiz() {
	const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
	return res.json();
}
