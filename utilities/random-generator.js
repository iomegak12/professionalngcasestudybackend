const MINIMUM = 1;
const MAXIUMUM = 1000000;

class RandomGenerator {
    static generate(minimum = MINIMUM, maximum = MAXIUMUM) {
        let genreatedNumber = Math.floor(
            Math.random() * (MAXIUMUM - MINIMUM) + MINIMUM);

        return genreatedNumber;
    }
}

module.exports = RandomGenerator;
