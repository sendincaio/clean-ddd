import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
    authorId: string
    questionId: string
}

type DeleteQuestionUseCaseResponse = null

export class DeleteQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({ authorId, questionId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            throw new Error('Resource not found')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not allowed')
        }

        await this.questionsRepository.delete(question)

        return null
    }
}
