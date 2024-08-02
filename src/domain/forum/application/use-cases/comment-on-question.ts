import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CommentOnQuestionUseCaseRequest {
    content: string
    authorId: string
    questionId: string
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
        private questionCommentsRepository: QuestionCommentsRepository,
    ) {}

    async execute({
        content,
        authorId,
        questionId,
    }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            throw new Error('Resource not found')
        }

        const questionComment = QuestionComment.create({
            content,
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
        })

        await this.questionCommentsRepository.create(questionComment)

        return { questionComment }
    }
}
