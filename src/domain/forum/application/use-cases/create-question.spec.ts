import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { CreateQuestionUseCase } from './create-question'

let questionsRepository: InMemoryQuestionsRepository
let createQuestion: CreateQuestionUseCase

describe('Create Question', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        createQuestion = new CreateQuestionUseCase(questionsRepository)
    })

    it('should be able to create a question', async () => {
        const result = await createQuestion.execute({
            title: 'Question Title',
            content: 'Question Content',
            authorId: 'author-01',
        })

        expect(result.isRight()).toBe(true)
        expect(questionsRepository.items[0]).toEqual(result.value?.question)
    })
})
