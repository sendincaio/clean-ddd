import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { CommentOnAnswerUseCase } from './comment-on-answer'

let answersRepository: InMemoryAnswersRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let commentOnAnswer: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository()
        answerCommentsRepository = new InMemoryAnswerCommentsRepository()

        commentOnAnswer = new CommentOnAnswerUseCase(answersRepository, answerCommentsRepository)
    })

    it('should be able to comment on answer', async () => {
        const newAnswer = makeAnswer()

        await answersRepository.create(newAnswer)

        await commentOnAnswer.execute({
            content: 'Answer comment',
            authorId: newAnswer.authorId.toString(),
            answerId: newAnswer.id.toString(),
        })

        expect(answerCommentsRepository.items[0].content).toEqual('Answer comment')
    })
})
