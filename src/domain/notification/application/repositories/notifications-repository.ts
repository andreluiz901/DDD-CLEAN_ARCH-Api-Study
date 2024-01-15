import { Notification } from "../../enterprise/entities/notification";

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>;
  findById(id: String): Promise<Notification | null>;
  save(notification: Notification): Promise<void>;
}
