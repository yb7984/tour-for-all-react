

/** Data model for tours_templates. */
class TourTemplate {
    id;
    title;
    image = "";
    guaranteed = 0;
    description = "";
    creator;
    price = 0;
    entryFee = 0;
    setting = "";
    isPublic = false;

    get imageUrl() {
        return this.image;
    }

    constructor(obj) {
        obj && Object.assign(this, obj);
    }

}

export default TourTemplate;