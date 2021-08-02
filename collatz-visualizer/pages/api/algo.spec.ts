import { CollatzAlgorithm } from "./algo";

test('Test that the collatz algorithm class runs in a known number of steps', () => {
    const algo = new CollatzAlgorithm(5);
    const output = algo.run();
    expect(output).toEqual(4);
    const steps = algo.steps;
    expect(steps).toEqual(8);
});
