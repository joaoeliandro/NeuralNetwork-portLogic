class Matrix {
    constructor(rows, colunm) {
        this.rows = rows
        this.colunm = colunm

        this.data = [] 

        for (let i = 0; i < rows; i++) {
            let arr = []
            for (let j = 0; j < colunm; j++) {
                arr.push(0)
            }
            this.data.push(arr)
        }
    }

    static arrayToMatrix(arr) {
        let matrix = new Matrix(arr.length, 1)

        matrix.map((elm, i, j) => {
            return arr[i]
        })

        return matrix
    }

    static matrixToArray(obj) {
        let arr = []

        obj.map((elm, i, j) => {
            arr.push(elm)
        })

        return arr
    }

    randomize() {
        this.map((elm, i, j) => {
            return Math.random() * 2 - 1
        })
    }

    map(func) {
        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j)
            })
        })

        return this
    }

    static map(matrix_Reference, func) {
        let matrix = new Matrix(matrix_Reference.rows, matrix_Reference.colunm)

        matrix.data = matrix_Reference.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j)
            })
        })

        return matrix
    }

    static add(matrixA, matrixB) {
        let matrix = new Matrix(matrixA.rows, matrixA.colunm)
        
        matrix.map((num, i, j) => {
            return matrixA.data[i][j] + matrixB.data[i][j]
        })
        
        return matrix
    }
    
    static multiply(matrixA, matrixB) {
        var matrix = new Matrix(matrixA.rows, matrixB.colunm)
        
        matrix.map((num, i, j) => {
            let sum = 0
            for (let x = 0; x < matrixA.colunm; x++) {
                let elem1 = matrixA.data[i][x]
                let elem2 = matrixB.data[x][j]
                sum += elem1 * elem2
            }
            return sum
        })
        
        return matrix
    }
    
    static Hadamard(matrixA, matrixB) {
        let matrix = new Matrix(matrixA.rows, matrixA.colunm)
        
        matrix.map((num, i, j) => {
            return matrixA.data[i][j] * matrixB.data[i][j]
        })
        
        return matrix
    }
    
    static multiply_scalar(matrixA, num) {
        let matrix = new Matrix(matrixA.rows, matrixA.colunm)
        
        matrix.map((elm, i, j) => {
            return matrixA.data[i][j] * num
        })
        
        return matrix
    }
    
    static subtract(matrixA, matrixB){
        let matrix = new Matrix(matrixA.rows, matrixA.colunm)
        
        matrix.map((num, i, j) => {
            return matrixA.data[i][j] - matrixB.data[i][j]
        })

        return matrix
    }

    static transpose(matrixA) {
        let matrix = new Matrix(matrixA.colunm, matrixA.rows)
        matrix.map((num, i, j) => {
            return matrixA.data[j][i]
        })

        return matrix
    }

    print() {
        console.table(this.data)
    }
}