import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './welcome.html?style=./welcome.scss';

enum Operation {
    Add = '+',
    Sub = '-'
}

@WithRender
@Component
export default class Welcome extends Vue {
    private max: number = 11;
    private max1: number = 6;
    private max2: number = 5;
    private first: number = 0;
    private second: number = 0;
    private operator: Operation = Operation.Add;
    private answer: number | undefined = 0;
    private correction: string = '';

    protected mounted(): void {
        this.doNext();
    }

    private doNext(): void {
        (this.answer as any) = '';
        this.operator = Math.round(Math.random()) == 0 ? Operation.Add : Operation.Sub;
        if (this.operator == Operation.Add) {
            this.first = Math.round(Math.random() * this.max1);
            if (this.first == this.max1) {
                this.second = Math.round(Math.random() * this.max2);
            } else {
                this.second = Math.round(Math.random() * this.max1);
            }
        } else {
            this.first = Math.round(Math.random() * this.max);
            this.second = Math.round(Math.random() * this.first);
        }
    }

    private onSubmit(): void {
        if (this.operator == Operation.Add) {
            this.correction = this.first + this.second == this.answer ? 'bravo!' : 'non: ' + (this.first + this.second);
        } else {
            this.correction = this.first - this.second == this.answer ? 'bravo!' : 'non: ' + (this.first - this.second);
        }
        this.doNext();
    }
}
