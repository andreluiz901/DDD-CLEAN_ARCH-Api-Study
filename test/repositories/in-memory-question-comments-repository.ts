import { QuestionsCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionsCommentsRepository
{
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }
}
