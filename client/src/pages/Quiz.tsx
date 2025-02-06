import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Quiz } from "@shared/schema";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Check, X } from "lucide-react";

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const { data: quizzes, isLoading } = useQuery<Quiz[]>({
    queryKey: ["/api/quizzes"],
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-8">Solar System Quiz</h1>
        <Card>
          <CardContent className="pt-6">
            <p>No quiz questions available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuiz = quizzes[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizzes.length - 1;
  const hasAnswered = selectedAnswer !== null;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === currentQuiz.correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Solar System Quiz
        </h1>
        <div className="text-lg">
          Score: {score}/{quizzes.length}
        </div>
      </div>

      <Card className="bg-black/50">
        <CardHeader>
          <h2 className="text-2xl font-semibold">
            Question {currentQuestionIndex + 1} of {quizzes.length}
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">{currentQuiz.question}</p>
          
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            className="space-y-4"
            disabled={showExplanation}
          >
            {currentQuiz.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-lg">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showExplanation && (
            <Alert className={`mt-6 ${selectedAnswer === currentQuiz.correctAnswer ? 'border-green-500' : 'border-red-500'}`}>
              <div className="flex items-center gap-2">
                {selectedAnswer === currentQuiz.correctAnswer ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
                <AlertTitle>
                  {selectedAnswer === currentQuiz.correctAnswer ? 'Correct!' : 'Incorrect'}
                </AlertTitle>
              </div>
              <AlertDescription className="mt-2">
                {currentQuiz.explanation}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          {!showExplanation ? (
            <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {isLastQuestion ? 'See Results' : 'Next Question'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
