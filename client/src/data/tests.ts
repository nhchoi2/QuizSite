export interface Question {
  text: string;
  options: [string, string];
}

export interface TestResult {
  type: string;
  title: string;
  description: string;
  image: string;
  characteristics: string[];
}

export interface Test {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
  gradient: string;
  questions: Question[];
  results: {
    high: TestResult;
    low: TestResult;
  };
}

export const tests: Test[] = [
  {
    id: "personality",
    title: "에겐남/테토남 테스트",
    description: "당신은 에겐남(개방적) 성향인가요? 아니면 테토남(내향적) 성향인가요? 10가지 질문으로 알아보세요!",
    duration: "3분 소요",
    icon: "fas fa-users",
    gradient: "from-primary via-secondary to-accent",
    questions: [
      {
        text: "새로운 사람들과 만나는 자리에서 당신은?",
        options: ["먼저 다가가서 대화를 시작한다", "다른 사람이 말을 걸어올 때까지 기다린다"]
      },
      {
        text: "주말에 선호하는 활동은?",
        options: ["친구들과 함께 바깥 활동", "집에서 혼자 취미생활"]
      },
      {
        text: "새로운 도전에 대한 태도는?",
        options: ["적극적으로 받아들인다", "신중하게 고민해본다"]
      },
      {
        text: "스트레스를 받을 때 당신은?",
        options: ["친구들과 이야기하며 해소한다", "혼자서 조용히 정리한다"]
      },
      {
        text: "팀 프로젝트에서 당신의 역할은?",
        options: ["적극적으로 의견을 제시한다", "다른 사람의 의견을 듣고 따른다"]
      },
      {
        text: "갈등 상황에서 당신은?",
        options: ["직접적으로 문제를 해결한다", "시간을 두고 지켜본다"]
      },
      {
        text: "새로운 환경에 적응할 때?",
        options: ["빠르게 적응하려고 노력한다", "천천히 익숙해질 때까지 기다린다"]
      },
      {
        text: "의사결정을 할 때 중요하게 생각하는 것은?",
        options: ["직감과 감정", "논리와 분석"]
      },
      {
        text: "친구들이 당신을 어떻게 생각할까요?",
        options: ["활발하고 사교적인 사람", "조용하고 신중한 사람"]
      },
      {
        text: "미래에 대한 계획을 세울 때?",
        options: ["구체적이고 현실적으로", "유연하게 상황에 맞춰"]
      }
    ],
    results: {
      high: {
        type: "에겐남",
        title: "당신은 에겐남이에요!",
        description: "당신은 사람들과 어울리는 것을 좋아하고, 새로운 환경에서도 빠르게 적응하는 타입이에요! 에너지가 넘치고 적극적인 성격으로 주변 사람들에게 긍정적인 영향을 미치는 편입니다. 하지만 가끔은 혼자만의 시간도 필요하다는 걸 잊지 마세요! ✨",
        image: "/extrovert.jpg",
        characteristics: ["사교적", "적극적", "에너지 넘침", "리더십"]
      },
      low: {
        type: "테토남",
        title: "당신은 테토남이에요!",
        description: "당신은 깊이 있는 사고를 하며, 소수의 사람들과 진솔한 관계를 맺는 것을 선호해요. 신중하고 사려 깊은 성격으로 문제를 해결할 때 다양한 관점을 고려하는 편입니다. 혼자만의 시간을 통해 에너지를 충전하는 타입이에요! 🌙",
        image: "/introvert.jpg",
        characteristics: ["신중함", "깊이 있는 사고", "진솔함", "집중력"]
      }
    }
  },
  {
    id: "mbti",
    title: "MBTI 간단 테스트",
    description: "16가지 성격 유형 중 당신의 MBTI는 무엇일까요? 빠른 테스트로 확인해보세요!",
    duration: "5분 소요",
    icon: "fas fa-chart-pie",
    gradient: "from-emerald-500 via-blue-500 to-purple-500",
    questions: [
      {
        text: "파티에서 당신은?",
        options: ["여러 사람과 대화를 나눈다", "소수의 사람과 깊은 대화를 한다"]
      },
      {
        text: "정보를 받아들일 때?",
        options: ["구체적인 사실을 중요시한다", "가능성과 의미를 찾는다"]
      },
      {
        text: "결정을 내릴 때?",
        options: ["논리적 분석을 한다", "가치와 감정을 고려한다"]
      },
      {
        text: "일상생활에서?",
        options: ["계획을 세우고 따른다", "유연하게 상황에 맞춘다"]
      },
      {
        text: "에너지를 얻는 방법은?",
        options: ["사람들과 함께 시간을 보낸다", "혼자만의 시간을 갖는다"]
      }
    ],
    results: {
      high: {
        type: "외향적 유형",
        title: "당신은 외향적 성격이에요!",
        description: "당신은 활발하고 사교적인 성격으로 사람들과의 상호작용에서 에너지를 얻어요. 새로운 경험을 즐기고 적극적으로 세상과 소통하는 타입입니다!",
        image: "/extrovert.jpg",
        characteristics: ["외향적", "활발함", "사교적", "적극적"]
      },
      low: {
        type: "내향적 유형",
        title: "당신은 내향적 성격이에요!",
        description: "당신은 깊이 있는 사고를 통해 에너지를 얻고, 의미 있는 관계를 중요시해요. 신중하고 사려 깊은 접근을 통해 문제를 해결하는 타입입니다!",
        image: "/introvert.jpg",
        characteristics: ["내향적", "신중함", "깊이 있음", "집중력"]
      }
    }
  }
];

export function getTestById(id: string): Test | undefined {
  return tests.find(test => test.id === id);
}

export function calculateResult(testId: string, answers: string[]): TestResult & { percentage: number } {
  const test = getTestById(testId);
  if (!test) {
    throw new Error("Test not found");
  }

  const aCount = answers.filter(answer => answer === 'A').length;
  const percentage = Math.round((aCount / answers.length) * 100);
  
  const result = percentage >= 60 ? test.results.high : test.results.low;
  
  return {
    ...result,
    percentage
  };
}
