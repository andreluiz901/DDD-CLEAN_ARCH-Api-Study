import { AnswersCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswersCommentsRepository
{
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }
}
