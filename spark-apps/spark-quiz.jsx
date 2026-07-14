export default function init({ renderTarget, onExit, activePlayers, playClickSFX, listen }) {
  const React = window.React;
  const { useState, useEffect } = React;

  function QuizApp() {
    const [stage, setStage] = useState('SPLASH');
    const [countdown, setCountdown] = useState(10);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [scores, setScores] = useState({ P1: 0, P2: 0 });

    const questions = [
      { q: 'Which planet is known as the Red Planet?', options: { A: 'Mars', B: 'Venus', X: 'Jupiter', Y: 'Saturn' }, correct: 'A' },
      { q: 'What is the color of an emerald gemstone?', options: { A: 'Red', B: 'Yellow', X: 'Green', Y: 'Blue' }, correct: 'X' }
    ];

    const currentQuestion = questions[questionIndex];

    useEffect(() => {
      if (stage === 'SPLASH') {
        const timer = setTimeout(() => setStage('GAMEPLAY'), 2200);
        return () => clearTimeout(timer);
      }
    }, [stage]);

    useEffect(() => {
      if (stage === 'GAMEPLAY') {
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              if (questionIndex < questions.length - 1) {
                setQuestionIndex(i => i + 1);
                return 10;
              } else {
                setStage('GAMEOVER');
                return 0;
              }
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [stage, questionIndex]);

    if (stage === 'SPLASH') {
      return (
        <div className="w-full h-full bg-white text-black flex flex-col items-center justify-center font-sans">
          <div className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-2">Spark Originals</div>
          <h1 className="text-5xl font-black uppercase tracking-wider">Quiz Battle</h1>
        </div>
      );
    }

    if (stage === 'GAMEOVER') {
      return (
        <div className="p-12 flex flex-col items-center justify-center h-full bg-[#020204]">
          <h1 className="text-6xl font-black text-[#00ffb3] uppercase tracking-wide mb-6">Battle Finished</h1>
          <button onClick={onExit} className="bg-white text-black font-black px-8 py-4 rounded-2xl active:scale-95 transition-all shadow-xl">
            Back to Home Channel
          </button>
        </div>
      );
    }

    return (
      <div className="p-12 flex flex-col justify-between h-full bg-[#0a0b16] text-white">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 font-mono text-sm">
            <div className="text-[#00ffb3] font-bold">P1: {scores.P1}</div>
            <div className="text-[#ffbe0b] font-bold">P2: {scores.P2}</div>
          </div>
          <div className="text-2xl font-black">⏱ {countdown}s</div>
        </div>
        <div className="text-center my-auto">
          <h2 className="text-4xl font-black">{currentQuestion.q}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(currentQuestion.options).map(([key, val]) => (
            <div key={key} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black bg-[#00ffb3]">{key}</span>
              <span className="text-lg font-bold text-gray-200">{val}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  window.ReactDOM.render(React.createElement(QuizApp), renderTarget);
}
