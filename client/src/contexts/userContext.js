import { createContext } from "react";

const UserContext = createContext({user: {}}); // Create a context object

export {
  UserContext // Export it so it can be used by other Components
};
