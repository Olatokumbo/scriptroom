import * as functions from "firebase-functions";

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const STRIPE_SECRET_KEY = functions.config().stripe.secret_key;

export { ALGOLIA_ID, ALGOLIA_ADMIN_KEY, STRIPE_SECRET_KEY };
