---
to: src/actions/<%= name %>.js
---
import { NEW_ACTION, ANOTHER_ACTION } from "../constants/<%= name %>";

export const newAction = (param1) => ({ type: NEW_ACTION, param1 });
export const anotherAction = () => ({ type: ANOTHER_ACTION });
