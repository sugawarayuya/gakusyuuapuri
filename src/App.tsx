import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen, Brain } from 'lucide-react';

// 最初の20元素のデータ
const elements = [
  { number: 1, symbol: 'H', name: '水素', englishName: 'Hydrogen', romaji: ['suiso'], group: 'nonmetal' },
  { number: 2, symbol: 'He', name: 'ヘリウム', englishName: 'Helium', romaji: ['heriumu', 'helium'], group: 'noble-gas' },
  { number: 3, symbol: 'Li', name: 'リチウム', englishName: 'Lithium', romaji: ['richiumu', 'lithium'], group: 'alkali-metal' },
  { number: 4, symbol: 'Be', name: 'ベリリウム', englishName: 'Beryllium', romaji: ['beririumu', 'beryllium'], group: 'alkaline-earth' },
  { number: 5, symbol: 'B', name: 'ホウ素', englishName: 'Boron', romaji: ['houso', 'boron'], group: 'metalloid' },
  { number: 6, symbol: 'C', name: '炭素', englishName: 'Carbon', romaji: ['tanso', 'carbon'], group: 'nonmetal' },
  { number: 7, symbol: 'N', name: '窒素', englishName: 'Nitrogen', romaji: ['chisso', 'nitrogen'], group: 'nonmetal' },
  { number: 8, symbol: 'O', name: '酸素', englishName: 'Oxygen', romaji: ['sanso', 'oxygen'], group: 'nonmetal' },
  { number: 9, symbol: 'F', name: 'フッ素', englishName: 'Fluorine', romaji: ['fusso', 'fluorine'], group: 'halogen' },
  { number: 10, symbol: 'Ne', name: 'ネオン', englishName: 'Neon', romaji: ['neon'], group: 'noble-gas' },
  { number: 11, symbol: 'Na', name: 'ナトリウム', englishName: 'Sodium', romaji: ['natoriumu', 'sodium'], group: 'alkali-metal' },
  { number: 12, symbol: 'Mg', name: 'マグネシウム', englishName: 'Magnesium', romaji: ['maguneshiumu', 'magnesium'], group: 'alkaline-earth' },
  { number: 13, symbol: 'Al', name: 'アルミニウム', englishName: 'Aluminum', romaji: ['aruminiumu', 'aluminum'], group: 'metal' },
  { number: 14, symbol: 'Si', name: 'ケイ素', englishName: 'Silicon', romaji: ['keiso', 'silicon'], group: 'metalloid' },
  { number: 15, symbol: 'P', name: 'リン', englishName: 'Phosphorus', romaji: ['rin', 'phosphorus'], group: 'nonmetal' },
  { number: 16, symbol: 'S', name: '硫黄', englishName: 'Sulfur', romaji: ['iou', 'sulfur'], group: 'nonmetal' },
  { number: 17, symbol: 'Cl', name: '塩素', englishName: 'Chlorine', romaji: ['enso', 'chlorine'], group: 'halogen' },
  { number: 18, symbol: 'Ar', name: 'アルゴン', englishName: 'Argon', romaji: ['arugun', 'argon'], group: 'noble-gas' },
  { number: 19, symbol: 'K', name: 'カリウム', englishName: 'Potassium', romaji: ['kariumu', 'potassium'], group: 'alkali-metal' },
  { number: 20, symbol: 'Ca', name: 'カルシウム', englishName: 'Calcium', romaji: ['karushiumu', 'calcium'], group: 'alkaline-earth' },
];

const groupColors = {
  'nonmetal': 'bg-blue-500',
  'noble-gas': 'bg-purple-500',
  'alkali-metal': 'bg-red-500',
  'alkaline-earth': 'bg-orange-500',
  'metalloid': 'bg-green-500',
  'halogen': 'bg-yellow-500',
  'metal': 'bg-gray-500',
};

type AppMode = 'table' | 'flashcard' | 'quiz';
type QuizType = 'symbol-to-name' | 'name-to-symbol' | 'number-to-name';

function App() {
  const [mode, setMode] = useState<AppMode>('table');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizType, setQuizType] = useState<QuizType>('symbol-to-name');
  const [quizElement, setQuizElement] = useState(elements[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [shuffledElements, setShuffledElements] = useState(elements);

  useEffect(() => {
    if (mode === 'quiz') {
      generateNewQuestion();
    }
  }, [mode, quizType]);

  const generateNewQuestion = () => {
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    setQuizElement(randomElement);
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    let correct = false;
    const answer = userAnswer.toLowerCase().trim();
    
    switch (quizType) {
      case 'symbol-to-name':
        correct = answer === quizElement.name || 
                 answer === quizElement.englishName.toLowerCase() ||
                 quizElement.romaji.some(romaji => answer === romaji);
        break;
      case 'name-to-symbol':
        correct = answer === quizElement.symbol.toLowerCase();
        break;
      case 'number-to-name':
        correct = answer === quizElement.name || 
                 answer === quizElement.englishName.toLowerCase() ||
                 quizElement.romaji.some(romaji => answer === romaji);
        break;
    }

    setTotalQuestions(prev => prev + 1);
    if (correct) {
      setScore(prev => prev + 1);
      setFeedback('正解！');
    } else {
      let correctAnswer = '';
      switch (quizType) {
        case 'symbol-to-name':
          correctAnswer = `${quizElement.name}（${quizElement.englishName}、${quizElement.romaji.join('/')}）`;
          break;
        case 'name-to-symbol':
          correctAnswer = quizElement.symbol;
          break;
        case 'number-to-name':
          correctAnswer = `${quizElement.name}（${quizElement.englishName}、${quizElement.romaji.join('/')}）`;
          break;
      }
      setFeedback(`不正解。正解は「${correctAnswer}」です。`);
    }

    setTimeout(() => {
      generateNewQuestion();
    }, 2000);
  };

  const nextCard = () => {
    if (currentCardIndex < elements.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setTotalQuestions(0);
    generateNewQuestion();
  };

  const PeriodicTable = () => (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">周期表（最初の20元素）</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2 mb-8">
        {elements.map((element) => (
          <div
            key={element.number}
            className={`${groupColors[element.group]} text-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
          >
            <div className="text-xs opacity-80">{element.number}</div>
            <div className="text-2xl font-bold">{element.symbol}</div>
            <div className="text-xs mt-1">{element.name}</div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">元素の分類</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm">アルカリ金属</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
            <span className="text-sm">アルカリ土類金属</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
            <span className="text-sm">金属</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm">半金属</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm">非金属</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span className="text-sm">ハロゲン</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
            <span className="text-sm">希ガス</span>
          </div>
        </div>
      </div>
    </div>
  );

  const Flashcard = () => {
    const element = elements[currentCardIndex];
    
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">フラッシュカード</h2>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">{currentCardIndex + 1} / {elements.length}</span>
          <div className="w-64 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / elements.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div 
          className={`${groupColors[element.group]} text-white rounded-2xl shadow-2xl p-12 cursor-pointer transform hover:scale-105 transition-all duration-300 min-h-96 flex flex-col justify-center items-center`}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {!showAnswer ? (
            <>
              <div className="text-6xl font-bold mb-4">{element.symbol}</div>
              <div className="text-xl opacity-80">原子番号: {element.number}</div>
              <div className="text-sm opacity-60 mt-4">クリックして日本語名を表示</div>
            </>
          ) : (
            <>
              <div className="text-4xl font-bold mb-2">{element.name}</div>
              <div className="text-2xl opacity-80 mb-4">{element.englishName}</div>
              <div className="text-lg opacity-60">原子番号: {element.number}</div>
              <div className="text-lg opacity-60">元素記号: {element.symbol}</div>
            </>
          )}
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevCard}
            disabled={currentCardIndex === 0}
            className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="mr-2" size={20} />
            前へ
          </button>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            {showAnswer ? '問題を表示' : '答えを表示'}
          </button>

          <button
            onClick={nextCard}
            disabled={currentCardIndex === elements.length - 1}
            className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            次へ
            <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    );
  };

  const Quiz = () => (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">クイズ</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">スコア: {score}/{totalQuestions}</span>
          <button
            onClick={resetQuiz}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
          >
            <RotateCcw className="mr-2" size={16} />
            リセット
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">クイズの種類:</label>
        <select
          value={quizType}
          onChange={(e) => setQuizType(e.target.value as QuizType)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="symbol-to-name">元素記号 → 日本語名</option>
          <option value="name-to-symbol">日本語名 → 元素記号</option>
          <option value="number-to-name">原子番号 → 日本語名</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="text-center mb-6">
          {quizType === 'symbol-to-name' && (
            <div>
              <div className="text-6xl font-bold text-blue-600 mb-2">{quizElement.symbol}</div>
              <div className="text-gray-600">この元素の日本語名は？</div>
            </div>
          )}
          {quizType === 'name-to-symbol' && (
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{quizElement.name}</div>
              <div className="text-gray-600">この元素の記号は？</div>
            </div>
          )}
          {quizType === 'number-to-name' && (
            <div>
              <div className="text-6xl font-bold text-blue-600 mb-2">{quizElement.number}</div>
              <div className="text-gray-600">原子番号{quizElement.number}の元素は？</div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={
              quizType === 'symbol-to-name' ? '日本語名またはローマ字を入力（例：水素、suiso）' :
              quizType === 'name-to-symbol' ? '元素記号を入力（例：H）' :
              '日本語名またはローマ字を入力（例：水素、suiso）'
            }
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            disabled={feedback !== ''}
            autoComplete="off"
            spellCheck="false"
            maxLength={50}
          />
        </div>

        <button
          onClick={checkAnswer}
          disabled={!userAnswer.trim() || feedback !== ''}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          回答する
        </button>

        {feedback && (
          <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
            feedback.includes('正解') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {feedback}
          </div>
        )}
      </div>

      {totalQuestions > 0 && (
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              正答率: {Math.round((score / totalQuestions) * 100)}%
            </div>
            <div className="text-gray-600">
              {score}問正解 / {totalQuestions}問中
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* ナビゲーション */}
        <nav className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setMode('table')}
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-200 ${
                mode === 'table' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="mr-2" size={20} />
              周期表
            </button>
            <button
              onClick={() => setMode('flashcard')}
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-200 ${
                mode === 'flashcard' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="mr-2" size={20} />
              フラッシュカード
            </button>
            <button
              onClick={() => setMode('quiz')}
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-200 ${
                mode === 'quiz' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Brain className="mr-2" size={20} />
              クイズ
            </button>
          </div>
        </nav>

        {/* メインコンテンツ */}
        {mode === 'table' && <PeriodicTable />}
        {mode === 'flashcard' && <Flashcard />}
        {mode === 'quiz' && <Quiz />}
      </div>
    </div>
  );
}

export default App;