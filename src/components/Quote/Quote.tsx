import { useState, useEffect } from "react";
import quotesData from "./db.json";

type Mood = "inspirational" | "motivational" | "happy" | "sad";

type Quote = {
  quote: string;
  author: string;
};

const getRandomQuote = (mood: Mood): Quote => {
  const quotes = quotesData[mood];
  if (!quotes || quotes.length === 0) {
    return { quote: "No quotes available.", author: "" };
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const Quote = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [quote, setQuote] = useState<Quote>({ quote: "", author: "" });

  useEffect(() => {
    if (selectedMood) {
      const newQuote = getRandomQuote(selectedMood);
      setQuote(newQuote);
    }
  }, [selectedMood]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Mood</h1>
      {!selectedMood && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setSelectedMood("inspirational")}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Inspirational
          </button>
          <button
            onClick={() => setSelectedMood("motivational")}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Motivational
          </button>
          <button
            onClick={() => setSelectedMood("happy")}
            className="bg-yellow-500 text-white py-2 px-4 rounded"
          >
            Happy
          </button>
          <button
            onClick={() => setSelectedMood("sad")}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Sad
          </button>
        </div>
      )}
      {selectedMood && (
        <div className="p-6 bg-white rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Quote for You
          </h2>
          <p className="text-gray-700 italic">{quote.quote}</p>
          <p className="text-gray-600 text-right">— {quote.author}</p>
        </div>
      )}
    </div>
  );
};

export default Quote;
