import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get question by slug", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);
  });

  it("Should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "example-question",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value?.question.id).toBeTruthy();
      expect(result.value?.question.title).toEqual(newQuestion.title);
    }
  });
});
