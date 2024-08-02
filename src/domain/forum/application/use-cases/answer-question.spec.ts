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
        const { answer } = await answerQuestion.execute({
            content: 'Answer Content',
            instructorId: 'instructor-01',
            questionId: 'question-01',
        })

        expect(answer.id).toBeTruthy()
        expect(answersRepository.items[0].id).toEqual(answer.id)
    })
})
