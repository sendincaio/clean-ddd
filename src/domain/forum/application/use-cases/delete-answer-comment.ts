import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
    authorId: string
    answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = null

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

    async execute({
        authorId,
        answerCommentId,
    }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

        if (!answerComment) {
            throw new Error('Resource not found')
        }

        if (answerComment.authorId.toString() !== authorId) {
            throw new Error('Not allowed')
        }

        await this.answerCommentsRepository.delete(answerComment)

        return null
    }
}
