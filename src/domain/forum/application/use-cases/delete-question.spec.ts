import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: DeleteQuestionUseCase;

describe("Delete question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
  });

  it("Should be able to delete a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("Author-1") },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await sut.execute({
      authorId: "Author-1",
      questionId: "question-1",
    });

    expect(inMemoryQuestionRepository.items).toHaveLength(0);
  });

  it("Should not be able to delete a question from another user", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("Author-1") },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        authorId: "Author-2",
        questionId: "question-1",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
