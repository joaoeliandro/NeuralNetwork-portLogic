function sigmoid(t) {
    //formula sigmoide => F(t) = 1 / (1 + e^-t) 
    return 1 / (1 + Math.exp(-t))
}

function dSigmoid(t) {
    // derivada da sigmoid => F'(t) = t * (1 - t)
    return t * (1 - t)
}

class NeuralNetwork {
    constructor(input_Nodes, hidden_Nodes, output_Nodes) {
        this.input_Nodes = input_Nodes
        this.hidden_Nodes = hidden_Nodes
        this.output_Nodes = output_Nodes

        this.bias_in_hid = new Matrix(this.hidden_Nodes, 1)
        this.bias_in_hid.randomize()

        this.bias_hid_out = new Matrix(this.output_Nodes, 1)
        this.bias_hid_out.randomize()

        this.weights_in_hid = new Matrix(this.hidden_Nodes, this.input_Nodes)
        this.weights_in_hid.randomize()

        this.weights_hid_out = new Matrix(this.output_Nodes, this.hidden_Nodes)
        this.weights_hid_out.randomize()

        //Learning Rate settada em 15%
        this.learning_rate = 0.15
    }

    train(arr_entrada, arr_target) {
        // INPUT TO HIDDEN
        let input = Matrix.arrayToMatrix(arr_entrada) 
        let hidden_nodes = Matrix.multiply(this.weights_in_hid, input) 

        hidden_nodes = Matrix.add(hidden_nodes, this.bias_in_hid) 

        hidden_nodes.map(sigmoid)

        // HIDDEN TO OUTPUT
        let output = Matrix.multiply(this.weights_hid_out, hidden_nodes) 

        output = Matrix.add(output, this.bias_hid_out) 

        output.map(sigmoid) 

        // resultado -> SAÍDA 

        // OUTPUT TO HIDDEN
        let realValue = Matrix.arrayToMatrix(arr_target) 
        let error_output = Matrix.subtract(realValue, output) 
        let dOutput = Matrix.map(output, dSigmoid) 
        let hidden_Transpo = Matrix.transpose(hidden_nodes) 

        let gradient = Matrix.Hadamard(error_output, dOutput)
        gradient = Matrix.multiply_scalar(gradient, this.learning_rate)

        this.bias_hid_out = Matrix.add(this.bias_hid_out, gradient) 

        let weights_hid_out_delt = Matrix.multiply(gradient, hidden_Transpo)

        this.weights_hid_out = Matrix.add(this.weights_hid_out, weights_hid_out_delt) 

        // HIDDEN TO INPUT
        let weights_hid_out_Transpo = Matrix.transpose(this.weights_hid_out) 
        let error_hidden = Matrix.multiply(weights_hid_out_Transpo, error_output) 
        let dHidden = Matrix.map(hidden_nodes, dSigmoid)
        let input_Transpo = Matrix.transpose(input) 

        let gradient_hidden = Matrix.Hadamard(error_hidden, dHidden) 
        gradient_hidden = Matrix.multiply_scalar(gradient_hidden, this.learning_rate)

        this.bias_in_hid = Matrix.add(this.bias_in_hid, gradient_hidden) 

        let weights_in_hid_delt = Matrix.multiply(gradient_hidden, input_Transpo)
        this.weights_in_hid = Matrix.add(this.weights_in_hid, weights_in_hid_delt) 

        // END TRAIN
    }

    // Predição para teste vai retornar o resultado sem ajuste para comprovar o treino
    predict(arr) {
        let input = Matrix.arrayToMatrix(arr)
        let hidden_nodes = Matrix.multiply(this.weights_in_hid, input)

        hidden_nodes = Matrix.add(hidden_nodes, this.bias_in_hid)
        hidden_nodes.map(sigmoid)

        let output = Matrix.multiply(this.weights_hid_out, hidden_nodes)

        output = Matrix.add(output, this.bias_hid_out)
        output.map(sigmoid)
        output = Matrix.matrixToArray(output)

        return output
    }
}