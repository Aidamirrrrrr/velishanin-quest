export interface Quest {
    id: string
    title: string
    description: string
    questions: Question[]
    maxPoints: number
}

export interface Question {
    id: string
    text: string
    options: string[]
    correctAnswer: number
    points: number
}

export interface Answer {
    questionId: string
    selectedOption: number
    isCorrect: boolean
    pointsEarned: number
}
