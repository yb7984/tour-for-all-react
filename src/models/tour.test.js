import Tour from "./tour";
import axiosMock from 'axios';
import { v4 as uuidv4 } from 'uuid';
import TourForAllAPI from "../api";
import { statusName, TOUR_STATUS_PUBLIC } from "./tourStatus";

//mock the uuid
jest.mock('uuid', () => {
    return {
        v4: () => "1"
    };
});


const data = {
    id: 1,
    slug: 'test',
    title: 'test',
    image: "",
    guaranteed: 0,
    stack: 10000,
    description: "test description",
    creator: "u1",
    price: 100,
    entryFee: 20,
    start: new Date("2021-07-30 10:30"),
    setting: "",
    clockSetting: "",
    status: TOUR_STATUS_PUBLIC,
    startTime: null,
    endTime: null,
    isActive: true,
    players: {}
};
const originConsoleError = console.error;

beforeEach(() => {
    console.error = jest.fn();
});

afterEach(() => {
    console.error = originConsoleError;
});

describe("Tour Class", function () {
    it('constructor', () => {
        const tour = new Tour(data);

        expect({ ...tour }).toEqual({
            ...data,
            setting: expect.any(String)
        });
    });


    it('imageUrl', () => {
        const tour = new Tour(data);

        expect(tour.imageUrl.length).toBeGreaterThan(0);

        tour.image = "/test.jpg";
        expect(tour.imageUrl).toEqual("http://localhost:3002/test.jpg");
    });


    it('statusName', () => {
        const tour = new Tour(data);

        expect(tour.statusName).toEqual(statusName(TOUR_STATUS_PUBLIC));
    });

    it('getSetting', () => {
        const tour = new Tour(data);

        expect(tour.getSetting("defaultDuration")).toEqual(20);
        expect(tour.getSetting("defaultBreakDuration")).toEqual(10);
        expect(tour.getSetting("levels")).toEqual(expect.any(Array));
    });

    it('generateSlug', () => {
        const tour = new Tour(data);
        const slug = Tour.generateSlug(tour);

        expect(slug.startsWith("2021-07-30-test-")).toEqual(true);
    });
});



describe("API Calls", function () {
    it('find', async () => {

        axiosMock.mockResolvedValueOnce({
            status: 200,
            data: {
                tours: [data],
                page: 1,
                perPage: 12,
                total: 1
            }
        });

        const result = await Tour.find({}, 1, 12, "upcoming");

        expect(result).toEqual({
            tours: [new Tour(data)],
            page: 1,
            perPage: 12,
            total: 1
        });
    });


    it('get', async () => {

        axiosMock.mockResolvedValueOnce({
            status: 200,
            data: {
                tour: data
            }
        });

        const result = await Tour.get(1);

        expect(result).toEqual(new Tour(data));
    });
});