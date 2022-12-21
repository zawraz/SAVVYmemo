import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
	{ src: "/img/helmet-1.png" },
	{ src: "/img/potion-1.png" },
	{ src: "/img/ring-1.png" },
	{ src: "/img/scroll-1.png" },
	{ src: "/img/shield-1.png" },
	{ src: "/img/sword-1.png" },
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [isDisabled, setIsDisabled] = useState(false);

	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random(), matched: false }));

		setCards(shuffledCards);
		setTurns(0);
	};

	const handleChoice = (card) => {
		if (card.id === choiceOne?.id) return;
		!choiceOne ? setChoiceOne(card) : setChoiceTwo(card);
	};

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prev) => prev + 1);
		setIsDisabled(false);
		console.log("Turn reset done.");
	};

	useEffect(() => {
		shuffleCards();
	}, []);

	useEffect(() => {
		if (!choiceTwo) {
			// resetTurn();
			return;
		}

		if (choiceOne.src !== choiceTwo.src) {
			setIsDisabled(true);
			const timer = setTimeout(() => {
				resetTurn();
			}, 1000);
			return () => clearTimeout(timer);
		}

		setCards((prevCards) =>
			prevCards.map((card) =>
				card.src === choiceTwo.src ? { ...card, matched: true } : card
			)
		);
		resetTurn();
	}, [choiceTwo]);

	return (
		<div className="App">
			<h1>SAVVYmemo - the game</h1>
			<button onClick={shuffleCards}>New Game</button>
			<div className="card-grid">
				{cards.map((card) => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={
							card === choiceOne ||
							card === choiceTwo ||
							card.matched
						}
						disabled={isDisabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App;
