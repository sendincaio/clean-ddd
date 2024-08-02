import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { CommentOnQuestionUseCase } from './comment-on-question'

let questionsRepository: InMemoryQuestionsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let commentOnQuestion: CommentOnQuestionUseCase

describe('Comment On Question', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        questionCommentsRepository = new InMemoryQuestionCommentsRepository()

        commentOnQuestion = new CommentOnQuestionUseCase(questionsRepository, questionCommentsRepository)
    })

    it('should be able to comment on question', async () => {
        const newQuestion = makeQuestion()

        await questionsRepository.create(newQuestion)

        await commentOnQuestion.execute({
            content: 'Question comment',
            authorId: newQuestion.authorId.toString(),
            questionId: newQuestion.id.toString(),
        })

        expect(questionCommentsRepository.items[0].content).toEqual('Question comment')
    })
})
