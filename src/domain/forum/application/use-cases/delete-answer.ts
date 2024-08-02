import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
    authorId: string
    answerId: string
}

type DeleteAnswerUseCaseResponse = null

export class DeleteAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({ authorId, answerId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Resource not found')
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error('Not allowed')
        }

        await this.answersRepository.delete(answer)

        return null
    }
}
