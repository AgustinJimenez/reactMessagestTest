import { render } from "@testing-library/react";
import App from "../pages/HomePage";

test("renders learn react link", () => {
  const comp = render(<App />);
  expect(comp).toBeTruthy();
});
