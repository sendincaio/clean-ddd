import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'

interface CommentOnAnswerUseCaseRequest {
    content: string
    authorId: string
    answerId: string
}

interface CommentOnAnswerUseCaseResponse {
    answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
    constructor(
        private answersRepository: AnswersRepository,
        private answerCommentsRepository: AnswerCommentsRepository,
    ) {}

    async execute({
        content,
        authorId,
        answerId,
    }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Resource not found')
        }

        const answerComment = AnswerComment.create({
            content,
            authorId: new UniqueEntityId(authorId),
            answerId: new UniqueEntityId(answerId),
        })

        await this.answerCommentsRepository.create(answerComment)

        return { answerComment }
    }
}
