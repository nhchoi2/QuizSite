import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Link } from "wouter";
import { getTestById, calculateResult } from "@/data/tests";
import { useShare } from "@/hooks/use-share";

export default function Result() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [result, setResult] = useState<ReturnType<typeof calculateResult> | null>(null);
  const { shareResult, copyToClipboard, isSharing, shareSuccess } = useShare();

  const test = id ? getTestById(id) : null;

  useEffect(() => {
    if (!test || !id) {
      setLocation("/");
      return;
    }

    // Get answers from sessionStorage
    const answersJson = sessionStorage.getItem(`test-${id}-answers`);
    if (!answersJson) {
      setLocation(`/test/${id}`);
      return;
    }

    try {
      const answers = JSON.parse(answersJson);
      const calculatedResult = calculateResult(id, answers);
      setResult(calculatedResult);
    } catch (error) {
      console.error("Error calculating result:", error);
      setLocation(`/test/${id}`);
    }
  }, [test, id, setLocation]);

  if (!test || !result) {
    return null;
  }

  const handleShare = () => {
    shareResult(
      "심리테스트 결과",
      result.title,
      window.location.href
    );
  };

  const handleCopyLink = () => {
    copyToClipboard(window.location.href);
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="result-header">
            테스트 완료! 🎉
          </h1>
          <p className="text-lg text-muted-foreground">당신의 결과를 확인해보세요</p>
        </div>

        {/* Result Card */}
        <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden mb-8">
          {/* Result Header with Gradient */}
          <div className="result-card p-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="result-title">
              {result.title}
            </h2>
            <p className="text-xl opacity-90" data-testid="result-percentage">
              {result.percentage}%
            </p>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Result Image */}
              <div className="flex-shrink-0">
                <img 
                  src={result.image}
                  alt={`${result.type} 성향을 나타내는 이미지`}
                  className="w-64 h-64 object-cover rounded-xl shadow-lg"
                  data-testid="result-image"
                />
              </div>

              {/* Result Description */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid="result-type">
                  {result.type}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6" data-testid="result-description">
                  {result.description}
                </p>

                {/* Result Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary" data-testid="result-score-high">
                      {result.percentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {result.percentage >= 60 ? '외향성' : '내향성'}
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary" data-testid="result-score-low">
                      {100 - result.percentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {result.percentage >= 60 ? '내향성' : '외향성'}
                    </div>
                  </div>
                </div>

                {/* Characteristics */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-card-foreground mb-3">주요 특징:</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.characteristics.map((trait, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        data-testid={`trait-${index}`}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-8 text-center">
          <h3 className="text-xl font-bold text-card-foreground mb-4">결과 공유하기</h3>
          <p className="text-muted-foreground mb-6">친구들과 함께 테스트해보세요!</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Mobile Share Button */}
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className="share-button bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-all flex items-center justify-center disabled:opacity-50"
              data-testid="share-button"
            >
              <i className="fas fa-share-alt mr-2"></i>
              {isSharing ? '공유 중...' : '공유하기'}
            </button>
            
            {/* Copy Link Button */}
            <button 
              onClick={handleCopyLink}
              className="share-button bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-all flex items-center justify-center"
              data-testid="copy-link-button"
            >
              <i className="fas fa-link mr-2"></i>
              링크 복사하기
            </button>
            
            {/* Restart Test Button */}
            <Link 
              href="/"
              className="share-button bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center justify-center"
              data-testid="restart-button"
            >
              <i className="fas fa-redo mr-2"></i>
              다른 테스트 하기
            </Link>
          </div>

          {/* Share Success Message */}
          {shareSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg" data-testid="share-success">
              <i className="fas fa-check-circle mr-2"></i>
              링크가 클립보드에 복사되었습니다!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
