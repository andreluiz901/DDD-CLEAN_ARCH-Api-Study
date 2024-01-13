import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswersCommentsRepository {
  create(answer: AnswerComment): Promise<void>;
}
