import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswerRepository);
  });

  it("Should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("Author-1") },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: "Author-1",
      content: "conteudo test",
    });

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: "conteudo test",
    });
  });

  it("Should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("Author-1") },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        authorId: "Author-2",
        answerId: "answer-1",
        content: "conteudo test",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
