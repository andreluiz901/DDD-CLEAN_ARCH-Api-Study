import { Either, left, right } from "@/core/either";
import { AnswersCommentsRepository } from "../repositories/answer-comments-repository";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResouceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    );

    if (!answerComment) return left(new ResouceNotFoundError());

    if (answerComment.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    await this.answerCommentsRepository.delete(answerComment);

    return right({});
  }
}
