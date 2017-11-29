import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './welcome.html?style=./welcome.scss';

enum Operator {
    Add = '+',
    Sub = '-'
}

interface Operation {
    first: number;
    second: number;
    operator: Operator;
    answer?: number;
    correction?: number;
}

@WithRender
@Component
export default class Welcome extends Vue {
    private weight: number[] = [1, 1, 1, 1, 2, 3, 4, 5, 6, 8, 10, 15]; // 1-12
    private distribution: number[] = [];
    private currentOperation: Operation | null = null;
    private answer: number = 0;
    private success: Operation[] = [];
    private fails: Operation[] = [];

    protected created(): void {
        this.weight.forEach((v, i) => {
            for (let w: number = 0; w < v; w++) {
                this.distribution.push(i + 1);
            }
        });
    }

    protected beforeMount(): void {
        this.doNext();
    }

    private doNext(): void {
        (this.answer as any) = '';

        if (this.fails.length > 0 && Math.random() >= 0.5) {
            this.currentOperation = this.fails.splice(Math.round(Math.random() * this.fails.length) - 1, 1)[0];
        } else {
            let operator: Operator = Math.round(Math.random()) == 0 ? Operator.Add : Operator.Sub;
            let first: number;
            let second: number;
            let max = this.distribution[Math.floor(Math.random() * this.distribution.length)];
            if (operator == Operator.Add) {
                let res = max;
                first = Math.round(Math.random() * res);
                second = res - first;
            } else {
                first = max;
                second = Math.round(Math.random() * first);
            }
            this.currentOperation = {
                first: first,
                second: second,
                operator: operator
            };
        }
    }

    private onSubmit(): void {
        let op: Operation = this.currentOperation as Operation;

        if (op.operator == Operator.Add) {
            op.correction = op.first + op.second;
        } else {
            op.correction = op.first - op.second;
        }
        op.answer = this.answer;

        this.doNext();

        if (op.correction == op.answer) {
            this.success.push(op);
        } else {
            this.fails.push(op);
        }
    }

    private get failsOutput(): Operation[] {
        return this.fails.slice().reverse();
    }

    private get successOutput(): Operation[] {
        return this.success.slice().reverse();
    }

    private getOperationToString(operation: Operation): string {
        return `${operation.first} ${operation.operator} ${operation.second} = ${operation.answer}`;
    }
}
