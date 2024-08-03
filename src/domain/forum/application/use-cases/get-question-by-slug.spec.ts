import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let questionsRepository: InMemoryQuestionsRepository
let getQuestionBySlug: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        getQuestionBySlug = new GetQuestionBySlugUseCase(questionsRepository)
    })

    it('should be able to get question by slug', async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create('question-title'),
        })

        await questionsRepository.create(newQuestion)

        const result = await getQuestionBySlug.execute({
            slug: 'question-title',
        })

        expect(result.isRight()).toBe(true)
        expect(questionsRepository.items[0].title).toEqual(newQuestion.title)
    })
})
