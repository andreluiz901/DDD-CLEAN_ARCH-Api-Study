import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersrepository: AnswerRepository) {}

  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
    });

    this.answersrepository.create(answer);

    return answer;
  }
}