class ValuesToSort {
    constructor(numberOfValues, canvas) {
        this.values = [];
        this.horizonLine = canvas.height;
        this.canvas = canvas;
        this.numberOfValues = numberOfValues;
        this.generateValues(this.numberOfValues);
        
    }
    reset() {
        this.values = [];
        this.generateValues(this.numberOfValues);
    }
    isSorted() {
        for (let i = 0; i < this.values.length - 1; i++) {
            if (this.values[i].value > this.values[i + 1].value) {
                return false;
            }
        }
        return true;
    }
    generateValues(numberOfValues) {
        for (let i = 0; i < numberOfValues; i++) {
            const value = {value: getRandomInt(20, this.canvas.height - 100), color: 'white'};
            this.values.push(value);
        };
    }
    async sortItself(list, start = 0, end = list.length - 1) {
        if (list.length < 2 || start >= end) {
            return;
        }
        const pivotIndex =  await this.partition(list, start, end);
        await Promise.all([this.sortItself(list, start, pivotIndex - 1), this.sortItself(list, pivotIndex + 1, end)]);
    }
    async partition(list, start, end) {
        //loop to change color of values inside the group being partitioned;
        for (let i = start; i < end; i++) {
            list[i].color = 'rgb(252, 186, 3)'; //orange-like color
        }

        /*this function is the core of the algorithm, it basically moves numbers smaller than the
        pivot to the left of the pivot, and the bigger ones to the right*/
        const pivotValue = list[end].value;
        let pivotIndex = start;
        for (let i = start; i < end; i++) {
            if (list[i].value < pivotValue) {
                await swap(i, pivotIndex, list);
                pivotIndex++;
            }
        }
        await swap(pivotIndex, end, list);
        return pivotIndex;
    }
    render() {
        const width = this.canvas.width / (this.values.length);
        for (let i = 0; i < this.values.length; i++) {
            const value = this.values[i];
            const xPos = width * i; 
            this.canvas.ctx.strokeStyle = 'white';
            this.canvas.ctx.strokeRect(xPos, this.horizonLine - value.value, width, value.value);
            this.canvas.ctx.fillStyle = value.color;
            this.canvas.ctx.fillRect(xPos, this.horizonLine - value.value, width, value.value);
        }
    }
}

async function swap(index1, index2, list) {
    await sleep(0);
    const temp = list[index1];
    list[index1] = list[index2];
    list[index2] = temp;
    list[index2].color = 'white';//resets color from what was swapped to white
}

function sleep(time) {
    return new Promise(resolve=>setTimeout(resolve, time));
}

const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
const canvasSize = viewportWidth / 2.4; //arbitrary denominator to make the canvas adjust its own size depending on the viewport
const canvas = new Canvas('canvas1', canvasSize, canvasSize, 'black');
const valuesToSort = new ValuesToSort(500, canvas);
canvas.loop(true, ()=>{
    if (valuesToSort.isSorted()) {
        running = false;
    }
    valuesToSort.render();

})


//session about the 'UI' buttons

let running = false; //boolean to tell if the algorithm is running
const newValuesButton = document.getElementById('newValues');
const runAlgoButton = document.getElementById('Run');
runAlgoButton.addEventListener('click', e=>{
    if (!valuesToSort.isSorted() && !running) {
        valuesToSort.sortItself(valuesToSort.values);
        running = true;
    }
})
newValuesButton.addEventListener('click', e=>{valuesToSort.reset()});