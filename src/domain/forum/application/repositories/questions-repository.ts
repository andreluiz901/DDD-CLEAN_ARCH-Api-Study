import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  create(questio: Question): Promise<void>;
}
