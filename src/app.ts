import { createApp } from "@/lib/create-app.js";
import configureOpenAPI from "./lib/openAPI";
import indextRoute from '@/routes/index.route'

const app = createApp();

const routes = [
    indextRoute
]

configureOpenAPI(app);

routes.forEach(route => {
    app.route("/", route)
})

export default app;