import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

import { EditAnswerUseCase } from './edit-answer'

let answersRepository: InMemoryAnswersRepository
let editAnswer: EditAnswerUseCase

describe('Edit Answer', () => {
    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository()
        editAnswer = new EditAnswerUseCase(answersRepository)
    })

    it('should be able to edit a answer', async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityId('author-01'),
            },
            new UniqueEntityId('answer-01'),
        )

        await answersRepository.create(newAnswer)

        await editAnswer.execute({
            content: 'Edited Content',
            authorId: 'author-01',
            answerId: 'answer-01',
        })

        expect(answersRepository.items[0]).toMatchObject({
            content: 'Edited Content',
        })
    })

    it('should not be able to edit a answer from another user', async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityId('author-01'),
            },
            new UniqueEntityId('answer-01'),
        )

        await answersRepository.create(newAnswer)

        const result = await editAnswer.execute({
            content: 'Edited Content',
            authorId: 'author-02',
            answerId: 'answer-01',
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
