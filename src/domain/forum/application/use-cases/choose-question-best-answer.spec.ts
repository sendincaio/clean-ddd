import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'

let questionsRepository: InMemoryQuestionsRepository
let answersRepository: InMemoryAnswersRepository
let chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        answersRepository = new InMemoryAnswersRepository()

        chooseQuestionBestAnswer = new ChooseQuestionBestAnswerUseCase(questionsRepository, answersRepository)
    })

    it('should be able to choose question best answer', async () => {
        const newQuestion = makeQuestion()

        const newAnswer = makeAnswer({
            questionId: newQuestion.id,
        })

        await questionsRepository.create(newQuestion)
        await answersRepository.create(newAnswer)

        await chooseQuestionBestAnswer.execute({
            authorId: newQuestion.authorId.toString(),
            answerId: newAnswer.id.toString(),
        })

        expect(questionsRepository.items[0].bestAnswerId).toEqual(newAnswer.id)
    })

    it('should not be able to choose question best answer from another user', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-01'),
        })

        const newAnswer = makeAnswer({
            questionId: newQuestion.id,
        })

        await questionsRepository.create(newQuestion)
        await answersRepository.create(newAnswer)

        expect(() => {
            return chooseQuestionBestAnswer.execute({
                authorId: 'author-02',
                answerId: newAnswer.id.toString(),
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
