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
    const result = await sut.execute({
      authorId: "1",
      title: "Nova Question",
      content: "Question content",
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question);
  });
});
