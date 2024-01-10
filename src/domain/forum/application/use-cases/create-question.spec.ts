import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  it("Should be able to create an question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "Nova Question",
      content: "Question content",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id);
  });
});
