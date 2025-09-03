import { Link } from "wouter";
import { tests } from "@/data/tests";

export default function Home() {
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
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors" data-testid="nav-home">홈</Link>
              <button className="text-muted-foreground hover:text-primary transition-colors" data-testid="nav-popular">인기테스트</button>
              <button className="text-muted-foreground hover:text-primary transition-colors" data-testid="nav-new">새로운테스트</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="hero-title">
            나는 어떤 사람일까? 🤔
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="hero-description">
            재미있는 심리테스트로 나의 숨겨진 성격을 발견해보세요!
          </p>
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.map((test) => (
            <div key={test.id} className="bg-card rounded-lg shadow-md overflow-hidden card-hover border border-border" data-testid={`test-card-${test.id}`}>
              {/* Colorful header */}
              <div className={`h-48 bg-gradient-to-br ${test.gradient} p-6 flex items-center justify-center`}>
                <div className="text-center">
                  <i className={`${test.icon} text-4xl text-white mb-3`}></i>
                  <h3 className="text-white font-bold text-lg">{test.title.split(' ')[0]}</h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2" data-testid={`test-title-${test.id}`}>
                  {test.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`test-description-${test.id}`}>
                  {test.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <i className="fas fa-clock mr-1"></i>
                    <span data-testid={`test-duration-${test.id}`}>{test.duration}</span>
                  </div>
                  <Link 
                    href={`/test/${test.id}`}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium"
                    data-testid={`test-start-${test.id}`}
                  >
                    테스트 시작
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
