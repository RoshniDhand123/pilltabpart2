import CALIFORNIA from "./images/california.jpeg";
import TEMPLES from "./images/temples.jpeg";
import WONDER from "./images/7wonder.jpeg";
import WATERFALL from "./images/waterfall.jpeg";
import HOTELS from "./images/hotels.jpeg";
import BEACH from "./images/beach.jpg";
import HILLSTATION from "./images/hill_station.jpeg";

const getImages = (name: string) => {
    switch (name) {
        case "temples":
            return TEMPLES;
        case "california":
            return CALIFORNIA;
        case "7wonder":
            return WONDER;
        case "hillstation":
            return HILLSTATION;
        case "beach":
            return BEACH;
        case "temple":
            return TEMPLES;
        case "hotel":
            return HOTELS;
        case "waterfall":
            return WATERFALL;
        default:
            return CALIFORNIA;
    }
}

export {
    getImages
}