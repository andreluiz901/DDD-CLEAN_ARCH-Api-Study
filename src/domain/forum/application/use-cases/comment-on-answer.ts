import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswersCommentsRepository } from "../repositories/answer-comments-repository";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentsrepository: AnswersCommentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) throw new Error("Answer not found");

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });
    const abc = await this.answerCommentsrepository.create(answerComment);

    return {
      answerComment,
    };
  }
}
