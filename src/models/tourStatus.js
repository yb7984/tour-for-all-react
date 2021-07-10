/**
 * Tournament status definition
 */
export const TOUR_STATUS_PRIVATE = 0;
export const TOUR_STATUS_PUBLIC = 1;
export const TOUR_STATUS_STARTED = 9;
export const TOUR_STATUS_ENDED = 10;
export const TOUR_STATUS_CANCELED = 2;


export function statusName(status) {
    switch (status) {
        case TOUR_STATUS_PRIVATE:
            return "Draft";
        case TOUR_STATUS_PUBLIC:
            return "Published";
        case TOUR_STATUS_STARTED:
            return "Running";
        case TOUR_STATUS_ENDED:
            return "Ended";
        case TOUR_STATUS_CANCELED:
            return "Canceled";
        default:
            return "";
    }
}
