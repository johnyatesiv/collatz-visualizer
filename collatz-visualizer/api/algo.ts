export class CollatzAlgorithm {
    private _steps: number = 0;
    private _current: number;
    private _exitValues: number[] = [0, 1];
    private _generatedValues: [number, number][] = [];
    private readonly _safe: boolean = false;
    private _max: number = 0;

    constructor(initial: number) {
        this._current = initial;
        this._safe = typeof this._current === 'number' && this._current > 0;
    }

    get steps(): number {
        return this._steps;
    }

    get values(): [number, number][] {
        return this._generatedValues;
    }

    get max(): number {
        return this._max;
    }

    public run(): [number, number][] {
        if (this._safe) {
            return this._step()
        } else {
            throw new Error(`Cannot run algorithm, initialized with invalid value ${this._current}`);
        }
    }

    private _step(): [number, number][] {
        this._steps++;
        if (!this._checkExitCondition()) {
            if (this._currentIsEven()) {
                /** If even, divide by 2 **/
                this._current = this._current / 2;
            } else {
                /** If odd, perform 3x + 1 **/
                this._current = (this._current * 3) + 1;
            }

            if (this._current > this._max) {
                this._max = this._current;
            }

            this._generatedValues.push([this._steps, this._current]);
            return this._step();
        } else {
            return this._generatedValues;
        }
    }

    private _currentIsEven() {
        return this._current % 2 === 0;
    }

    private _checkExitCondition() {
        return (this._steps > 0 && this._exitValues.includes(this._current));
    }
}
