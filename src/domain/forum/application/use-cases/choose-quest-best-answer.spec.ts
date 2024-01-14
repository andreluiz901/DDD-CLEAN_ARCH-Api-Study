import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose question Best answer", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswerRepository
    );
  });

  it("Should be able to choose the question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    });
    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id);
  });

  it("Should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId("author-1"),
    });
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    expect(() => {
      return sut.execute({
        authorId: "Author-2",
        answerId: answer.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
