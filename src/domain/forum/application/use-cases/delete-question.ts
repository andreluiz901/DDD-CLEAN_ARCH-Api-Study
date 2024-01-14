import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/questions-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<
  NotAllowedError | ResouceNotFoundError,
  {}
>;

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResouceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.questionRepository.delete(question);

    return right({});
  }
}
