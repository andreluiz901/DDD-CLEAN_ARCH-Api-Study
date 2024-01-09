import { randomUUID } from "node:crypto";
import { Slug } from "./value-objects/slug";

interface questionProps {
  title: string;
  content: string;
  authorId: string;
  slug: Slug;
}

export class Question {
  public title: string;
  public content: string;
  public slug: Slug;
  public id: string;
  public authorId: string;

  constructor(props: questionProps, id?: string) {
    this.title = props.title;
    this.content = props.content;
    this.slug = props.slug;
    this.authorId = props.authorId;
    this.id = id ?? randomUUID();
  }
}
