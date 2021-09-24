import random from "lodash/random";
import faker from "faker";
import { Observable } from "rxjs";
import { Message, messagesPrioritiesTypes } from "./types";

const observable = new Observable<Message>((subscriber) => {
  const generate = () => {
    const message = faker.lorem.sentence();
    const priority = random(0, 2) as messagesPrioritiesTypes;
    const nextInMS = random(500, 3000);
    subscriber.next({ message, priority });
    setTimeout(generate, nextInMS);
  };
  generate();
});

const subscribe = (callback: (message: Message) => void) => {
  const subscription = observable.subscribe({
    next: callback,
  });
  return () => subscription.unsubscribe();
};

export default subscribe;
