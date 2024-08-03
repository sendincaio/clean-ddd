import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionUseCaseRequest {
    title: string
    content: string
    authorId: string
    questionId: string
}

type EditQuestionUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        question: Question
    }
>

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({
        title,
        content,
        authorId,
        questionId,
    }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        question.title = title
        question.content = content

        await this.questionsRepository.update(question)

        return right({ question })
    }
}
