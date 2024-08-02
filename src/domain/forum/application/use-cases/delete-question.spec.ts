import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { DeleteQuestionUseCase } from './delete-question'

let questionsRepository: InMemoryQuestionsRepository
let deleteQuestion: DeleteQuestionUseCase

describe('Delete Question', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        deleteQuestion = new DeleteQuestionUseCase(questionsRepository)
    })

    it('should be able to delete a question', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityId('author-01'),
            },
            new UniqueEntityId('question-01'),
        )

        await questionsRepository.create(newQuestion)

        await deleteQuestion.execute({
            authorId: 'author-01',
            questionId: 'question-01',
        })

        expect(questionsRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a question from another user', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityId('author-01'),
            },
            new UniqueEntityId('question-01'),
        )

        await questionsRepository.create(newQuestion)

        expect(() => {
            return deleteQuestion.execute({
                authorId: 'author-02',
                questionId: 'question-01',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
