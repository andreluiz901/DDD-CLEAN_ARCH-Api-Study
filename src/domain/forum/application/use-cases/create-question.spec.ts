import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { CreateQuestionUseCase } from "./create-question";

const fakeQuestionRepository: QuestionsRepository = {
  create: async (question: Question) => {
    return;
  },
};

test("create an question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository);

  const answer = await createQuestion.execute({
    authorId: "1",
    title: "Nova Question",
    content: "Question content",
  });

  expect(answer.question.id).toBeTruthy();
});
