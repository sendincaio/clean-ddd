import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { AnswerQuestionUseCase } from './answer-question'

let answersRepository: InMemoryAnswersRepository
let answerQuestion: AnswerQuestionUseCase

describe('Create Answer', () => {
    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository()
        answerQuestion = new AnswerQuestionUseCase(answersRepository)
    })

    it('should be able to create a answer', async () => {
        const result = await answerQuestion.execute({
            content: 'Answer Content',
            instructorId: 'instructor-01',
            questionId: 'question-01',
        })

        expect(result.isRight()).toBe(true)
        expect(answersRepository.items[0]).toEqual(result.value?.answer)
    })
})
