import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionUseCaseRequest {
    title: string
    content: string
    authorId: string
    questionId: string
}

interface EditQuestionUseCaseResponse {
    question: Question
}

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
            throw new Error('Resource not found')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not allowed')
        }

        question.title = title
        question.content = content

        await this.questionsRepository.update(question)

        return { question }
    }
}
