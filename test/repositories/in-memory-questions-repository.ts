import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionsRepository {
  public items: Question[] = [];

  async save(question: Question) {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id
    );

    this.items[questionIndex] = question;
  }
  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async delete(question: Question) {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id
    );

    this.items.splice(questionIndex, 1);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }
}
