import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("Should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: "comentario teste",
    });
    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      "comentario teste"
    );
  });
});
