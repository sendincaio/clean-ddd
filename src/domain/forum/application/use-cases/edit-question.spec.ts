import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

import { EditQuestionUseCase } from './edit-question'

let questionsRepository: InMemoryQuestionsRepository
let editQuestion: EditQuestionUseCase

describe('Edit Question', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        editQuestion = new EditQuestionUseCase(questionsRepository)
    })

    it('should be able to edit a question', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityId('author-01'),
            },
            new UniqueEntityId('question-01'),
        )

        await questionsRepository.create(newQuestion)

        await editQuestion.execute({
            title: 'Edited Title',
            content: 'Edited Content',
            authorId: 'author-01',
            questionId: 'question-01',
        })

        expect(questionsRepository.items[0]).toMatchObject({
            title: 'Edited Title',
            content: 'Edited Content',
        })
    })

    it('should not be able to edit a question from another user', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityId('author-01'),
            },
            new UniqueEntityId('question-01'),
        )

        await questionsRepository.create(newQuestion)

        const result = await editQuestion.execute({
            title: 'Edited Title',
            content: 'Edited Content',
            authorId: 'author-02',
            questionId: 'question-01',
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
