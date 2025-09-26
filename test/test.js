// callbackChain.test.js
const callbackChain = require("../callbackChain");

describe("callbackChain (chain-style, configurable with intermediate logging)", () => {
  beforeAll(() => {
    jest.useFakeTimers(); // control setTimeout
  });

  afterAll(() => {
    jest.useRealTimers(); // restore timers
  });

  test("executes a single callback with the initial user data", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockCallback = jest.fn((user) => ({ ...user, active: true }));

    const userId = 101;
    const initialData = { name: "Patrick", role: "Star" };

    callbackChain(userId, initialData, mockCallback);

    jest.runAllTimers(); // fast-forward setTimeout

    // Verify callback execution
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith({
      id: userId,
      name: initialData.name,
      role: initialData.role,
    });

    // Verify intermediate log
    expect(logSpy).toHaveBeenCalledWith(
      "After callback #1:",
      { id: userId, name: initialData.name, role: initialData.role, active: true }
    );

    // Verify final result log
    expect(logSpy).toHaveBeenCalledWith(
      "Final result:",
      { id: userId, name: initialData.name, role: initialData.role, active: true }
    );

    logSpy.mockRestore();
  });

  test("executes multiple callbacks in order, chaining their return values", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const firstCallback = jest.fn((user) => ({ ...user, name: user.name.toUpperCase() }));
    const secondCallback = jest.fn((user) => ({ ...user, role: user.role + " Student" }));
    const thirdCallback = jest.fn((user) => ({ ...user, status: "Active" }));

    const userId = 202;
    const initialData = { name: "Squidward", role: "Squid" };

    callbackChain(userId, initialData, firstCallback, secondCallback, thirdCallback);

    jest.runAllTimers();

    // Verify callback execution
    expect(firstCallback).toHaveBeenCalledWith({
      id: userId,
      name: initialData.name,
      role: initialData.role,
    });
    expect(secondCallback).toHaveBeenCalledWith({
      id: userId,
      name: initialData.name.toUpperCase(),
      role: initialData.role,
    });
    expect(thirdCallback).toHaveBeenCalledWith({
      id: userId,
      name: initialData.name.toUpperCase(),
      role: initialData.role + " Student",
    });

    // Verify intermediate logs
    expect(logSpy).toHaveBeenCalledWith(
      "After callback #1:",
      { id: userId, name: initialData.name.toUpperCase(), role: initialData.role }
    );
    expect(logSpy).toHaveBeenCalledWith(
      "After callback #2:",
      { id: userId, name: initialData.name.toUpperCase(), role: initialData.role + " Student" }
    );
    expect(logSpy).toHaveBeenCalledWith(
      "After callback #3:",
      { id: userId, name: initialData.name.toUpperCase(), role: initialData.role + " Student", status: "Active" }
    );

    // Verify final result log
    expect(logSpy).toHaveBeenCalledWith(
      "Final result:",
      { id: userId, name: initialData.name.toUpperCase(), role: initialData.role + " Student", status: "Active" }
    );

    logSpy.mockRestore();
  });
});
