import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Link } from "wouter";
import { getTestById } from "@/data/tests";

export default function Test() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const test = id ? getTestById(id) : null;

  useEffect(() => {
    if (!test) {
      setLocation("/");
    }
  }, [test, setLocation]);

  if (!test) {
    return null;
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const question = test.questions[currentQuestion];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      // Store answers in sessionStorage and navigate to result
      sessionStorage.setItem(`test-${id}-answers`, JSON.stringify(newAnswers));
      setLocation(`/result/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors" data-testid="logo-link">
                <i className="fas fa-brain mr-2"></i>심리테스트
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">진행률</span>
            <span className="text-sm font-medium text-primary" data-testid="progress-text">
              {currentQuestion + 1}/{test.questions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
              data-testid="progress-bar"
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2" data-testid="test-title">
              {test.title}
            </h1>
            <p className="text-muted-foreground">당신의 성격 유형을 알아보세요!</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-card-foreground mb-6 text-center" data-testid="question-text">
              Q{currentQuestion + 1}. {question.text}
            </h2>

            <div className="space-y-4">
              {question.options.map((option, index) => {
                const value = String.fromCharCode(65 + index); // A, B
                const isSelected = selectedAnswer === value;
                
                return (
                  <label 
                    key={index}
                    className={`flex items-center p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors border ${
                      isSelected ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/20'
                    }`}
                    data-testid={`answer-option-${value}`}
                  >
                    <input 
                      type="radio" 
                      name="answer" 
                      value={value}
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(value)}
                      className="radio-custom mr-4"
                    />
                    <span className="text-card-foreground">{option}</span>
                  </label>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <button 
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all transform hover:scale-105 disabled:hover:scale-100"
                data-testid="next-button"
              >
                {currentQuestion === test.questions.length - 1 ? '결과보기' : '다음 질문'}
              </button>
            </div>
          </div>
        </div>

        {/* Question Counter */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            <i className="fas fa-lightbulb mr-1"></i>
            솔직하게 답변해주세요. 정답은 없어요! 😊
          </p>
        </div>
      </div>
    </div>
  );
}
