var train = true 

function setup() {
    createCanvas(900, 600)

    redeNeural = new NeuralNetwork(2, 3, 1) 

    // XNOR
    dataset = {
        inputs:
            [[1, 1],
            [1, 0],
            [0, 1],
            [0, 0]],
        outputs:
            [[1],
            [0],
            [0],
            [1]]
    }
    // se 0 xnor 0 = 1
    // se 0 xnor 1 = 0
    // se 1 xnor 0 = 0
    // se 1 xnor 1 = 1
}

function training() {
    for (let i = 0; i < 30000; i++) {
        let index = floor(random(4)) 
        redeNeural.train(dataset.inputs[index], dataset.outputs[index]) 
    }
}

function draw() {
    background(0)
    if (train) {
        training() // Treinando...
        if (redeNeural.predict([0, 0])[0] > 0.988 && redeNeural.predict([1, 0])[0] < 0.04 &&
            redeNeural.predict([1, 1])[0] > 0.988 && redeNeural.predict([0, 1])[0] < 0.04) {
            train = false
            console.log('Treino bem sucedido!')
        }
    }
}