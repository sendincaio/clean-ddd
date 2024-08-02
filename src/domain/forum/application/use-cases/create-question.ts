import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
    title: string
    content: string
    authorId: string
}

interface CreateQuestionUseCaseResponse {
    question: Question
}

export class CreateQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({ title, content, authorId }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
        const question = Question.create({
            title,
            content,
            authorId: new UniqueEntityId(authorId),
        })

        await this.questionsRepository.create(question)

        return { question }
    }
}
