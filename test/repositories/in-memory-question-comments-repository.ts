import { QuestionsCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionsCommentsRepository
{
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }

  async findById(id: string) {
    const questionComment = this.items.find(
      (item) => item.id.toString() === id
    );
    if (!questionComment) {
      return null;
    }

    return questionComment;
  }

  async delete(questionComment: QuestionComment) {
    const questionCommentIndex = this.items.findIndex(
      (item) => item.id === questionComment.id
    );

    this.items.splice(questionCommentIndex, 1);
  }
}
