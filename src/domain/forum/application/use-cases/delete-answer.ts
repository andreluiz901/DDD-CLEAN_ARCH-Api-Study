import { Either, left, right } from "@/core/either";
import { AnswerRepository } from "../repositories/answers-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  NotAllowedError | ResouceNotFoundError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) return left(new ResouceNotFoundError());

    if (authorId !== answer.authorId.toString())
      return left(new NotAllowedError());

    await this.answerRepository.delete(answer);

    return right({});
  }
}
