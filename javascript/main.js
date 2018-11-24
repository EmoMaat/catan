
const abs = function (a) {
    return a < 0 ? -a : a
}


class Board {
    constructor(size) {
        this.size = size
        this.calculate_variables()
    }

    calculate_variables() {
        this.y_max = this.size * 2 - 1
        this.x_max = this.size * 4 - 2

        this.middle = {
            x: this.size * 2 - 2,
            y: this.size - 1
        }
    }

    generate_empty_array() {
        this.board = []
        for (let y = 0; y < this.y_max; y++) {
            let rij = []
            for (let x = 0; x < this.x_max; x++) {
                rij.push('&nbsp')
            }
            this.board.push(rij)
        }
        return true
    }

    fill_array() {
        for (let y = 0; y < this.y_max; y++) {
            for (let x = 0; x < this.x_max; x++) {
                if ((x + y) % 2 == 0) {

                    let in_corner = {
                        lt: x + y <= this.size - 2,
                        rt: (this.x_max - x) + y <= this.size,
                        rb: (this.x_max - x) + (this.y_max - y) <= this.size,
                        lb: x + (this.y_max - y) <= this.size - 2

                    }
                    if (!(in_corner.lt || in_corner.rt || in_corner.rb || in_corner.lb)) {
                        this.board[y][x] = '0'
                    }

                    let is_middle = this.middle["x"] == x && this.middle["y"] == y
                    if (is_middle) {
                        this.board[y][x] = 'c'
                    }
                }

            }

        }
    }
}


SZIE = 11
board = new Board(SZIE)
board.generate_empty_array()

board.fill_array()
console.dir(board.board)
for (y = 0; y < board.y_max; y++) {
    for (x = 0; x < board.x_max - 1; x++) {
        document.getElementsByTagName('main')[0].innerHTML += board.board[y][x]
    }
    document.getElementsByTagName('main')[0].innerHTML += '<br>'
}
