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
    result: number;
}

@WithRender
@Component
export default class Welcome extends Vue {
    private max: number = 11;
    private currentOperation: Operation | null = null;
    private answer: number = 0;
    private success: Operation[] = [];
    private fails: Operation[] = [];

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
            if (operator == Operator.Add) {
                let res = Math.round(Math.random() * this.max);
                first = Math.round(Math.random() * res);
                second = res - first;
            } else {
                first = Math.round(Math.random() * this.max);
                second = Math.round(Math.random() * first);
            }
            this.currentOperation = {
                first: first,
                second: second,
                operator: operator,
                result: -1
            };
            console.log('t', this.currentOperation);
        }
    }

    private onSubmit(): void {
        let res: number;
        let op: Operation = this.currentOperation as Operation;

        if (op.operator == Operator.Add) {
            res = op.first + op.second;
        } else {
            res = op.first - op.second;
        }
        op.result = this.answer;

        this.doNext();

        console.log(op);
        if (res == op.result) {
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
        return `${operation.first} ${operation.operator} ${operation.second} = ${operation.result}`;
    }
}
