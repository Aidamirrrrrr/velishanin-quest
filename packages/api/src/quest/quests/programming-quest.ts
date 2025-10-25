import type { Quest } from '../types/quest.types'

export const PROGRAMMING_QUEST: Quest = {
    id: 'programming',
    title: 'Программистский квест',
    description: 'Проверь свои знания в программировании!',
    maxPoints: 30,
    questions: [
        {
            id: 'q1',
            text: 'Что такое TypeScript?',
            options: ['Язык программирования от Microsoft', 'Фреймворк для React', 'База данных', 'CSS препроцессор'],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'q2',
            text: 'Какой метод используется для добавления элемента в конец массива в JavaScript?',
            options: ['push()', 'pop()', 'shift()', 'unshift()'],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'q3',
            text: 'Что делает оператор "spread" (...) в JavaScript?',
            options: ['Разворачивает массив или объект', 'Умножает числа', 'Создает копию функции', 'Удаляет элементы'],
            correctAnswer: 0,
            points: 10,
        },
    ],
}
