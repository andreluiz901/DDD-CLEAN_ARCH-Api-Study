import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = [];

  async save(answer: Answer) {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items[answerIndex] = answer;
  }
  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(answerIndex, 1);
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id);
    if (!answer) {
      return null;
    }

    return answer;
  }
}
